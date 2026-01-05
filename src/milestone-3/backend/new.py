from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client.career_ai
predictions = db.predictions
@app.route("/api/charts/degree-role")
def degree_role():
    data = list(predictions.aggregate([
        {"$group":{"_id":{"degree":"$degree","role":"$predicted_role"},"count":{"$sum":1}}}
    ]))

    return jsonify([
        {"degree":d["_id"]["degree"],"role":d["_id"]["role"],"count":d["count"]}
        for d in data
    ])
@app.route("/api/charts/domain")
def domain():
    data=list(predictions.aggregate([
        {"$group":{"_id":"$domain","count":{"$sum":1}}}
    ]))
    return jsonify([
        {"domain":d["_id"],"count":d["count"]}
        for d in data
    ])

