import csv

input_file = r"C:\Users\satya\OneDrive\Desktop\App\my-app\datsets\cs_students.csv"
output_file = r"C:\Users\satya\OneDrive\Desktop\App\my-app\datsets\cs_students_processed.csv"

skill_map = {"Weak": 0, "Average": 1, "Strong": 2}
gender_map = {"Male": 1, "Female": 0}

original_preview = []
processed_rows = []

with open(input_file, newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    print("✅ Original Dataset Loaded Successfully")

    # ✅ Show first 5 rows of original dataset
    for i, row in enumerate(reader):
        if i < 5:
            original_preview.append(row)

        processed = {}

        processed["Gender"] = gender_map.get(row.get("Gender", ""), 0)

        try:
            processed["Age"] = int(row.get("Age", 0))
        except:
            processed["Age"] = 0

        try:
            gpa = float(row.get("GPA", 0))
            processed["GPA"] = round(gpa / 4, 2)
        except:
            processed["GPA"] = 0

        major = row.get("Major", "")
        domain = row.get("Interested Domain", "")
        project = row.get("Projects", "")
        career = row.get("Future Career", "")

        processed["Major"] = hash(major) % 1000
        processed["Interested Domain"] = hash(domain) % 1000
        processed["Projects"] = hash(project) % 1000
        processed["Future Career"] = hash(career) % 1000

        processed["Python"] = skill_map.get(row.get("Python", ""), 0)
        processed["SQL"] = skill_map.get(row.get("SQL", ""), 0)
        processed["Java"] = skill_map.get(row.get("Java", ""), 0)

        processed_rows.append(processed)

# ✅ PRINT FIRST 5 ROWS OF ORIGINAL DATA
print("\n(first 5 rows of dataset)\n")
for row in original_preview:
    print(row)

# ✅ SAVE PROCESSED DATA
with open(output_file, mode="w", newline="", encoding="utf-8") as file:
    fieldnames = [
        "Gender", "Age", "GPA", "Major",
        "Interested Domain", "Projects", "Future Career",
        "Python", "SQL", "Java"
    ]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(processed_rows)

# ✅ PREVIEW FIRST 5 ROWS OF PROCESSED DATA
print("\n✅ Processed Dataset Preview:\n")
for row in processed_rows[:5]:
    print(row)

# ✅ FINAL SUCCESS MESSAGE
print("\n✅ Processed dataset saved successfully at:")
print(output_file)
