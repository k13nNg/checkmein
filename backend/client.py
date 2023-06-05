from connect_database import get_database

db = get_database()

student_ids = db["student_ids"]

item_details = student_ids.find()

for i in item_details:
    print(i)