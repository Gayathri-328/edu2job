import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle
import os

# dataset path
dataset_path = os.path.join("src", "milestone-3", "preprocessing", "ml_dataset.csv")

# load dataset
df = pd.read_csv(dataset_path)

# encode target column
target_encoder = LabelEncoder()
df["job_role"] = target_encoder.fit_transform(df["job_role"])

# separate inputs/outputs
X = df.drop("job_role", axis=1)
y = df["job_role"]

# encode input text columns
for col in X.columns:
    X[col] = LabelEncoder().fit_transform(X[col].astype(str))

# split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# evaluate
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# save model
model_path = os.path.join("src", "milestone-3", "model", "job_model.pkl")
pickle.dump(model, open(model_path, "wb"))

print("Model saved at:", model_path)
