from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -------------------------------
# MongoDB Connection
# -------------------------------
client = MongoClient("mongodb://localhost:27017/")
db = client.career_ai
predictions = db.predictions


# -------------------------------
# Test Route
# -------------------------------
@app.route("/")
def home():
    return "Milestone 4 Backend Running"


# -------------------------------
# Degree → Job Role (Bar Chart)
# -------------------------------
@app.route("/api/charts/degree-role")
def degree_role():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "degree": "$degree",
                    "role": "$predicted_role"
                },
                "count": {"$sum": 1}
            }
        }
    ]

    data = list(predictions.aggregate(pipeline))

    result = []
    for d in data:
        result.append({
            "degree": d["_id"]["degree"],
            "role": d["_id"]["role"],
            "count": d["count"]
        })

    return jsonify(result)


# -------------------------------
# Job Domain Distribution (Pie Chart)
# -------------------------------
@app.route("/api/charts/domain")
def domain_chart():
    pipeline = [
        {
            "$group": {
                "_id": "$domain",
                "count": {"$sum": 1}
            }
        }
    ]

    data = list(predictions.aggregate(pipeline))

    result = []
    for d in data:
        result.append({
            "domain": d["_id"],
            "count": d["count"]
        })

    return jsonify(result)


# -------------------------------
# Similar Profile Career Insight
# -------------------------------
@app.route("/api/insights/<int:user_id>")
def career_insights(user_id):
    user = predictions.find_one({"user_id": user_id})

    if not user:
        return jsonify({"error": "User not found"})

    degree = user["degree"]
    specialization = user["specialization"]
    cgpa = user["cgpa"]

    pipeline = [
        {
            "$match": {
                "degree": degree,
                "specialization": specialization,
                "cgpa": {"$gte": cgpa - 1, "$lte": cgpa + 1}
            }
        },
        {
            "$group": {
                "_id": "$predicted_role",
                "count": {"$sum": 1}
            }
        }
    ]

    data = list(predictions.aggregate(pipeline))

    total = sum(d["count"] for d in data)

    insights = []
    for d in data:
        percent = round((d["count"] / total) * 100, 2)
        insights.append({
            "role": d["_id"],
            "percentage": percent
        })

    return jsonify({
        "degree": degree,
        "specialization": specialization,
        "cgpa": cgpa,
        "insights": insights
    })


# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)

