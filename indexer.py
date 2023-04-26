
import flask
from flask_cors import CORS
import pysolr
import re
from flask import request, jsonify
import json
from query_expansion.Association_Cluster import association_main
from query_expansion.Metric_Clusters import metric_cluster_main
# from spellchecker import SpellChecker
from textblob import TextBlob

# spell = SpellChecker()
# Create a client instance. The timeout and authentication options are not required.
solr = pysolr.Solr('http://localhost:8983/solr/nutch/', always_commit=True, timeout=10)

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/api/indexer', methods=['GET'])
def get_query():
    original_query = str(request.args['query'])
    type =  str(request.args['type'])

    total_results = 20
    expanded_query = original_query
    solr_query = convert_to_solr(original_query)
    solr_results = get_results_from_solr(solr_query, total_results)
    api_resp = parse_solr_results(solr_results)

    if type == "page_rank":
        result = api_resp
    elif type == "hits":
        result = get_hits_results(api_resp)
    elif type == "flat":
        result = get_clustering_results(api_resp, 'flat')
    elif type == "heirarchical":
        result = get_clustering_results(api_resp, 'heirarchical')
    elif 'qe' in type:
        # query = spell.correction(query)
        textBlb = TextBlob(original_query)            
        query = str(textBlb.correct())
        if type == 'association_qe':
            expanded_query = association_main(query, solr_results)
        elif type == 'metric_qe':
            expanded_query = metric_cluster_main(query, solr_results)
        else:
            expanded_query = association_main(query, solr_results)        
        solr_res_after_qe = get_results_from_solr(expanded_query, total_results)
        api_resp = parse_solr_results(solr_res_after_qe)
        result = api_resp
 
    payload = { "query": expanded_query, "results": result }
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    return response    

def convert_to_solr(query):
    return "content:" + query

def get_results_from_solr(query, no_of_results):
    print(query)
    results = solr.search(query, search_handler="/select", **{
        #"fl":"score",
        "wt": "json",
        "rows": no_of_results
    })
    return results


def parse_solr_results(solr_results):
    if solr_results.hits == 0:
        return jsonify("query out of scope")
    else:
        api_resp = list()
        rank = 0
        print(solr_results)
        for result in solr_results:
            rank += 1
            title = ""
            url = ""
            content = ""
            #score = ""
            meta_info = ""
            if 'title' in result:
                title = result['title']
            if 'url' in result:
                url = result['url']
            if 'content' in result:
                content = result['content'][0]
                meta_info = content.split(".")[0]+"."
                meta_info = meta_info.replace("\n", " ")
                meta_info = " ".join(re.findall("[a-zA-Z]+", meta_info))
            # if 'score' in result:
            #     score = result['score']    
            
            link_json = {
                "title": title,
                "url": url,
                "meta_info": meta_info,
                "rank": rank,
                #"score": score
            }
            api_resp.append(link_json)
            #print('*********************************************************************************')
            #print(api_resp)
    return api_resp


def get_clustering_results(clust_inp, param_type):
    if param_type == "flat_clustering":
        f = open('clustering/precomputed_clusters/clustering_f.txt')
        lines = f.readlines()
        f.close()
    elif param_type == "hierarchical_clustering":
        f = open('clustering/precomputed_clusters/clustering_h.txt')
        lines = f.readlines()
        f.close()

    cluster_map = {}
    for line in lines:
        line_split = line.split(",")
        if line_split[1] == "":
            line_split[1] = "99"
        cluster_map.update({line_split[0]: line_split[1]})

    for curr_resp in clust_inp:
        curr_url = curr_resp["url"][0]
        curr_cluster = cluster_map.get(curr_url, "99")
        curr_resp.update({"cluster": curr_cluster})
        curr_resp.update({"done": "False"})

    clust_resp = []
    curr_rank = 1
    for curr_resp in clust_inp:
        if curr_resp["done"] == "False":
            curr_cluster = curr_resp["cluster"]
            curr_resp.update({"done": "True"})
            curr_resp.update({"rank": str(curr_rank)})
            curr_rank += 1
            clust_resp.append({"title": curr_resp["title"], "url": curr_resp["url"],
                               "meta_info": curr_resp["meta_info"], "rank": curr_resp["rank"]})
            for remaining_resp in clust_inp:
                if remaining_resp["done"] == "False":
                    if remaining_resp["cluster"] == curr_cluster:
                        remaining_resp.update({"done": "True"})
                        remaining_resp.update({"rank": str(curr_rank)})
                        curr_rank += 1
                        clust_resp.append({"title": remaining_resp["title"], "url": remaining_resp["url"],
                                           "meta_info": curr_resp["meta_info"], "rank": remaining_resp["rank"]})

    return clust_resp


def get_hits_results(clust_inp):
    authority_score_file = open("HITS/precomputed_scores/authority_score_1", 'r').read()
    authority_score_dict = json.loads(authority_score_file)
    clust_inp = sorted(clust_inp, key=lambda x: authority_score_dict.get(x['url'][0], 0.0), reverse=True)
    return clust_inp


app.run(port='5000')

