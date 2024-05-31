from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

pc = Pinecone(api_key="29fe2d25-0edc-4a22-9791-b5d775f8847c")
index = pc.Index("molecule-lookup")

model = SentenceTransformer('all-MiniLM-L6-v2')

def vectorize(text):
    return model.encode(text)

@app.route('/search', methods=['POST'])
@cross_origin()
def search():
    data = request.json
    query = data['query']
    query_vec = vectorize(query)
    matches = index.query(
        vector=query_vec.tolist(),
        top_k=3,
    )
    results = [{
        "id": match["id"],
        "score": match["score"]
    } for match in matches["matches"]]
    
    return jsonify(results)

@app.route('/notsearch', methods=['GET'])
@cross_origin()
def notsearch():
    # data = request.json
    # query = data['query']
    # query_vec = vectorize(query)
    # matches = index.query(
    #     vector=query_vec.tolist(),
    #     top_k=3,
    # )
    # results = [{
    #     "id": match["id"],
    #     "score": match["score"]
    # } for match in matches["matches"]]
    
    return jsonify("{'poopoo':'peepee'}")

if __name__ == '__main__':
    app.run(debug=True)