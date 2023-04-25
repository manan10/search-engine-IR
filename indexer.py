import flask
from flask_cors import CORS
import pysolr
import re
from flask import request, jsonify
import json
from query_expansion.expansion import expand_query
from spellchecker import SpellChecker

solr = pysolr.Solr('http://localhost:8983/solr/nutch/', always_commit=True)

spell = SpellChecker()
app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/api/indexer', methods=['GET'])
def get_query():
    original_query = str(request.args['query'])
    relevance_model = str(request.args['relevance_model'])
    clustering_method = str(request.args['clustering_method'])
    expansion_method = str(request.args['expansion_method'])
    
    total_results = 200
    solr_query = convert_to_solr_query(original_query)
    solr_results = get_results_from_solr(solr_query, total_results)
    api_resp = parse_solr_results(solr_results)

    if relevance_model == "pagerank":
        result = api_resp
    else: 
        result = get_hits_results(api_resp)
        
    if clustering_method != 'none':
        result = get_clustering_results(result, clustering_method)
    
    if expansion_method != 'none':
        query = spell.correction(original_query)
        expanded_query = expand_query(query, solr_results, expansion_method)    
        solr_res_after_qe = get_results_from_solr(convert_to_solr_query(expanded_query), total_results)
        api_resp = parse_solr_results(solr_res_after_qe)
        result = api_resp
    else:
        expanded_query = query

    payload = { "query": expanded_query, "results": result }
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    return response

def convert_to_solr_query(query):
    return 'title:' + query #+ 'OR url:' + query + 

def get_results_from_solr(query, no_of_results):
    results = solr.search(query, search_handler="/select", **{
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
        for result in solr_results:
            rank += 1
            title = ""
            url = ""
            content = ""
            if 'title' in result:
                title = result['title']
            if 'url' in result:
                url = result['url']
            if 'content' in result:
                content = result['content']
                meta_info = content[:200]
                meta_info = meta_info.replace("\n", " ")
                meta_info = " ".join(re.findall("[a-zA-Z]+", meta_info))
            link_json = {
                "title": title,
                "url": url,
                "meta_info": meta_info,
                "rank": rank
            }
            api_resp.append(link_json)
    return api_resp

def get_clustering_results(clust_inp, param_type):
    if param_type == "flat":
        f = open('clustering/precomputed_clusters/clustering_f.txt')
        lines = f.readlines()
        f.close()
    elif param_type == "hierarchical":
        f = open('clustering/precomputed_clusters/clustering_h8.txt')
        lines = f.readlines()
        f.close()

    cluster_map = {}
    for line in lines:
        line_split = line.split(",")
        if line_split[1] == "":
            line_split[1] = "99"
        cluster_map.update({line_split[0]: line_split[1]})

    for curr_resp in clust_inp:
        curr_url = curr_resp["url"]
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
                                           "meta_info": remaining_resp["meta_info"], "rank": remaining_resp["rank"]})

    return clust_resp

def get_hits_results(clust_inp):
    authority_score_file = open("HITS/precomputed_scores/authority_score_1", 'r').read()
    authority_score_dict = json.loads(authority_score_file)

    clust_inp = sorted(clust_inp, key=lambda x: authority_score_dict.get(x['url'], 0.0), reverse=True)
    return clust_inp

app.run(port='5000')

