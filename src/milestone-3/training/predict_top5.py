import os
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# =================== PATH SETTINGS =================== #

# this file: .../src/milestone-3/training/predict_top5.py
training_folder = os.path.dirname(os.path.abspath(__file__))

# milestone-3 folder path
milestone_folder = os.path.dirname(training_folder)

# MODEL path:
model_path = os.path.join(milestone_folder, "model", "job_model.pkl")

# DATASET path:
dataset_path = os.path.join(milestone_folder, "preprocessing", "ml_dataset.csv")


print("Model used path:", model_path)
print("Dataset used path:", dataset_path)


# ==================== LOAD MODEL ===================== #

model = pickle.load(open(model_path, "rb"))

# ==================== LOAD DATASET ==================== #

df = pd.read_csv(dataset_path)

# Encode job_role for reverse mapping
job_encoder = LabelEncoder()
job_encoder.fit(df["job_role"].astype(str))


# ==================== PREDICTOR FUNCTION ============= #

def predict_top5(input_data):

    encoded_input = []

    # encode inputs same way as training
    for col in df.drop("job_role", axis=1).columns:
        le = LabelEncoder()
        le.fit(df[col].astype(str))
        encoded_input.append(le.transform([str(input_data[col])])[0])

    encoded_df = pd.DataFrame([encoded_input],
                              columns=df.drop("job_role", axis=1).columns)

    proba = model.predict_proba(encoded_df)[0]

    top_indexes = proba.argsort()[-5:][::-1]

    result = []

    for i in top_indexes:
        result.append({
            "job_role": job_encoder.inverse_transform([i])[0],
            "confidence": round(float(proba[i]) * 100, 2)
        })

    return result


# ============== TEST THE FUNCTION ==================== #

sample = {
    "degree": "B.Tech",
    "specialization": "Computer Science Engineering",
    "skills": "Python",
    "cgpa": "75",
    "certificate": "Yes"
}

output = predict_top5(sample)

print("\nTOP 5 JOB ROLE RECOMMENDATIONS:\n")
for i, row in enumerate(output, 1):
    print(f"{i}. {row['job_role']} ({row['confidence']}%)")
