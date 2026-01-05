import pandas as pd

df = pd.read_csv("C:/Users/satya/OneDrive/Desktop/App/my-app/dataset/clean_job_dataset.csv", encoding="latin1")

print("Dataset rows, columns:", df.shape)
print("\nColumns:")
print(df.columns)
print("\nFirst 5 rows:")
print(df.head())
