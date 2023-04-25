import glob
import xml.etree.ElementTree as ET
import json
from tqdm import tqdm
import numpy as np
from collections import Counter
from nltk.tokenize import wordpunct_tokenize
from nltk.corpus import stopwords
from string import punctuation
from nltk.stem.porter import PorterStemmer

punct_set = set(punctuation)
english_stopwords = set(stopwords.words("english"))
stemmer = PorterStemmer()

def tokenize_preprocess(text):
    # handle blank inputs
    if not text:
        return []
    # input is a string, which we convert to lowercase
    lower = text.lower()
    # next step is tokenization
    tokens = wordpunct_tokenize(lower)
    # remove punctuation
    tokens = [token for token in tokens if token not in punct_set]
    # remove stopwords
    tokens = [token for token in tokens if token not in english_stopwords]
    # return tokenized and pre-processed text as a list
    return tokens

def get_st_dicts(tokens):
    """
    input parameter is a list of tokens
    returns two dictionaries {stem:set(tokens)}, {token:stem}
    """
    # initialize empty dictionaries
    stem_dict, tok_dict = {}, {}
    # loop through each token
    for token in tokens:
        # get corresponding stem for token
        stem = stemmer.stem(token)
        # update token-stem dictionary
        tok_dict[token] = stem
        # handle unseen stem and update stem-tokens dictionary
        tok_set = stem_dict.get(stem, set())
        tok_set.add(token)
        stem_dict[stem] = tok_set
    # Return the two dictionaries
    return stem_dict, tok_dict

def get_association(doc_matrix, tok_dict, inv_idx, query_tokens):
    # Calculate frequency of stems in each document
    doc_freq = np.zeros((len(doc_matrix), len(inv_idx)), dtype=np.int)
    for i, tkns in enumerate(doc_matrix):
        for tkn in tkns:
            if tkn in tok_dict:
                stem = tok_dict[tkn]
                stem_idx = inv_idx[stem]
                doc_freq[i, stem_idx] += 1
    # Calculate correlation matrix
    cor_matrix = np.dot(doc_freq.T, doc_freq)
    # Extract all c_{u,u}
    diag = np.diag(cor_matrix)
    # Normalize correlation matrix and pick the top 3 expansion tokens
    cluster_idx = []
    for token in query_tokens:
        stm_idx = inv_idx[tok_dict[token]]
        # Normalize correlation matrix for the query token
        token_scores = cor_matrix[stm_idx, :]
        normalized_scores = token_scores / (token_scores[stm_idx] + diag + token_scores)
        # Sort decreasing by score
        sorted_indices = np.argsort(normalized_scores)[::-1]
        # Pick the top 3 stems for each query token
        top_indices = sorted_indices[:3]
        # Add selected indices to cluster_idx
        cluster_idx.extend(top_indices.tolist())
    # Return Association cluster
    return cluster_idx

def get_metric(doc_matrix, tok_dict, inv_idx, query_tokens, variants):
    # Convert variants to numpy array 
    variants = np.array(variants)
    # Calculate correlation matrix
    l = len(inv_idx)
    cor_matrix = np.zeros((l, l), dtype=np.int)
    for i, tkns in enumerate(doc_matrix):
        cntr = Counter(tkns)
        # For each document, add pairwise differences in counts of tokens to corresponding stems
        for t1,c1 in cntr.items():
            s1 = inv_idx[tok_dict[t1]]
            for t2,c2 in cntr.items():
                s2 = inv_idx[tok_dict[t2]]
                diff = abs(c2-c1)
                if diff>0:
                    cor_matrix[s1,s2] += 1.0/diff
    # Normalize correlation matrix and pick the top 3 expansion tokens
    cluster_idx = []
    for token in query_tokens:
        stm_idx = inv_idx[tok_dict[token]]
        # Normalize correlation matrix for the query token
        token_scores = cor_matrix[stm_idx, :]
        normalized_scores = token_scores / (variants[stm_idx] * variants)
        # Sort decreasing by score
        sorted_indices = np.argsort(normalized_scores)[::-1]
        # Pick the top 3 stems for each query token
        top_indices = sorted_indices[:3]
        # Add selected indices to cluster_idx
        cluster_idx.extend(top_indices.tolist())
    # Return Association cluster
    return cluster_idx

def get_scalar(doc_matrix, tok_dict, inv_idx, query_tokens):
    # Calculate frequency of stems in each document
    doc_freq = np.zeros((len(doc_matrix), len(inv_idx)), dtype=np.int)
    for i, tkns in enumerate(doc_matrix):
        for tkn in tkns:
            if tkn in tok_dict:
                stem = tok_dict[tkn]
                stem_idx = inv_idx[stem]
                doc_freq[i, stem_idx] += 1
    # Calculate correlation matrix 
    cor_matrix = np.dot(doc_freq.T, doc_freq)
    # Extract all c_{u,u}
    diag = np.expand_dims(np.diag(cor_matrix),axis=0)
    # Normalize correlation matrix 
    norm_cor = cor_matrix / (cor_matrix + diag + diag.T)
    all_stems = np.linalg.norm(norm_cor, axis=1)
    # Find cosine similarity and pick the top 3 expansion tokens
    cluster_idx = []
    for token in query_tokens:
        stm_idx = inv_idx[tok_dict[token]]
        # Calculate cosine simialrity for the token with all other stems
        vector = np.expand_dims(norm_cor[stm_idx, :], axis=0)
        target = np.linalg.norm(vector)
        cos_sim = np.dot(vector, norm_cor.T) / (target * all_stems)
        # Sort decreasing by score 
        sorted_indices = np.argsort(cos_sim)[::-1]
        # Pick the top 3 stems for each query token
        top_indices = sorted_indices[:3]
        # Add selected indices to cluster_idx
        cluster_idx.extend(top_indices.tolist())
    # Return Association cluster
    return cluster_idx

def expand_query(query, solr, clustering='null'):
    # initialize variables
    tokens = set()
    doc_matrix = []
    # preserve the original query
    original_query = query
    # remove prefix
    if query.startswith('content:'):
        query = query.replace('content:', '', 1)
    # Display original query
    print('Original query:', query)
    # tokenize and preprocess the query
    query_tokens = tokenize_preprocess(query)
    tokens.update(query_tokens)
    # tokenize and preprocess the solr results
    for res in tqdm(solr, desc='Preprocessing results'):
        # res_tokens = tokenize_preprocess(res.get('content', ''))
        text = res['content'] if 'content' in res else ''
        res_tokens = tokenize_preprocess(text)
        doc_matrix.append(res_tokens)
        tokens.update(res_tokens)
    # get stem, token and index dictionaries
    stem_dict, tok_dict = get_st_dicts(list(tokens))
    # get sorted list of stems
    stems = list(sorted(stem_dict.keys()))
    # create inverted index dictionary
    inv_idx = {stem:idx for idx,stem in enumerate(stems)}
    # get clusters
    if clustering=='association':
        cluster_idx = get_association(doc_matrix, tok_dict, inv_idx, query_tokens)
    elif clustering=='metric':
        variants = [(stem_dict[stm]) for stm in stems]
        cluster_idx = get_metric(doc_matrix, tok_dict, inv_idx, query_tokens, variants)
    elif clustering=='scalar':
        cluster_idx = get_scalar(doc_matrix, tok_dict, inv_idx, query_tokens)
    else:
        print('No expansion performed')
        return original_query
    # Get stems corresponding to index values in cluster_idx
    cluster = [stems[idx] for idx in cluster_idx]
    # Expand the query with all tokens with the stems in the cluster
    expansion = set()
    for stem in cluster:
        expansion |= stem_dict.get(stem, set())
    # Only add the tokens not already present in query
    query_tokens.extend(expansion.difference(query_tokens))
    query = ' '.join(query_tokens)
    # Display expanded query
    print('Expanded query:', query)
    # Return expanded query
    return 'content:'+query
