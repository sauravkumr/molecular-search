from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
from flask_cors import CORS, cross_origin
from supabase import create_client, Client

url: str = "https://rlzfclzpdwwdledpqrur.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsemZjbHpwZHd3ZGxlZHBxcnVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzIxMDA1OCwiZXhwIjoyMDMyNzg2MDU4fQ.VE9QyzyeJlV5YM9M8XLPV2bEnrMZCibg6t4d5i7R9Bo"
supabase: Client = create_client(url, key)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

pc = Pinecone(api_key="29fe2d25-0edc-4a22-9791-b5d775f8847c")
index = pc.Index("molecule-lookup")

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

def vectorize(text):
    return model.encode(text)

@app.route('/search', methods=['POST'])
@cross_origin()  
def search():
    data = request.json
    query = "What molecule carries the following properties or characteristics? " + data['query']
    query_vec = vectorize(query)
    matches = index.query(
        vector=query_vec.tolist(),
        top_k=10,
        includeValues= True
    )


    data_to_send = {}
    sent_matches = []
    appended = 0
    for match in matches["matches"]:
        base,count = supabase.table('molecule-data').select('*').eq('cmpdname', match["id"]).execute()
        if len(base[1]) == 0:
            continue
        to_add = {}
        to_add["id"] = match["id"]
        to_add["score"] = match["score"]
        to_add["pubchem_link"] = "https://pubchem.ncbi.nlm.nih.gov/compound/" + str(base[1][0]["cid"])
        to_add["description"] = base[1][0]["description"]
        #to_add["embedding"] = match["values"]
        sent_matches.append(to_add)
        appended+=1
        if appended >= 5:
            break
    data_to_send["matches"] = sent_matches

    return jsonify(data_to_send)  # Use jsonify to return JSON

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
