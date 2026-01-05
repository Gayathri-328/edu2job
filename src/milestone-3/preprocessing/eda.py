import pandas as pd

# read dataset
df = pd.read_csv(
    r"C:/Users/satya/OneDrive/Desktop/App/my-app/src/milestone-3/preprocessing/datasets/career_recommender.csv",
    encoding="latin1"
)

# show full column list
print("Available Columns:")
for i, col in enumerate(df.columns):
    print(i, "→", col)

# Select useful columns by index (update later after you choose)
# Right now we will select the first 5 non-empty columns
selected_cols = df.columns[:5]

print("\nSelected columns for ML:")
print(selected_cols)

# Create ML dataset
ml_df = df[selected_cols]

# Save to new file
ml_df.to_csv("datasets/ml_dataset.csv", index=False)

print("\nCreated → datasets/ml_dataset.csv")
