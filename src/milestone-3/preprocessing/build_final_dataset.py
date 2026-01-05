import pandas as pd

df = pd.read_csv(
    r"C:/Users/satya/OneDrive/Desktop/App/my-app/src/milestone-3/preprocessing/datasets/career_recommender.csv",
    encoding="latin1",
    engine="python"
)

# select useful columns using index numbers
ml_df = df.iloc[:, [2, 3, 5, 6, 7, 10]]

# rename columns
ml_df.columns = ["degree", "specialization", "skills", "cgpa", "certificate", "job_role"]

# drop missing
ml_df = ml_df.dropna()

# save dataset next to file
ml_df.to_csv("ml_dataset.csv", index=False)

print("ML dataset created successfully!")
print("Rows & columns:", ml_df.shape)
print(ml_df.head())
