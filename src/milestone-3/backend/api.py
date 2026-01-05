from flask import Flask, request, jsonify
import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
import os

app = Flask(__name__)

# find folder paths
base = os.path.dirname(os.path.abspath(__file__))              # backend folder
milestone = os.path.dirname(base)                              # milestone-3 folder

model_path = os.path.join(milestone, "model", "job_model.pkl")
dataset_path = os.path.join(milestone, "preprocessing", "ml_dataset.csv")

# load model and dataset
model = pickle.load(open(model_path, "rb"))
df = pd.read_csv(dataset_path)

# encode labels
job_encoder = LabelEncoder()
job_encoder.fit(df["job_role"].astype(str))

@app.post("/predict")
def predict():
    data = request.json

    encoded_input = []

    for col in df.drop("job_role", axis=1).columns:
        le = LabelEncoder()
        le.fit(df[col].astype(str))
        encoded_input.append(le.transform([str(data[col])])[0])

    input_df = pd.DataFrame([encoded_input],
                            columns=df.drop("job_role", axis=1).columns)

    proba = model.predict_proba(input_df)[0]

    top_indexes = proba.argsort()[-5:][::-1]

    results = []

    for i in top_indexes:
        results.append({
            "job_role": job_encoder.inverse_transform([i])[0],
            "confidence": round(float(proba[i]) * 100, 2)
        })

    return jsonify({"top_5": results})


if __name__ == "__main__":
    app.run(port=5001, debug=True)
