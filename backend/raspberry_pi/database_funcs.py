from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import time
import bcrypt
import os

load_dotenv()

# CONSTANTS
client = MongoClient(os.getenv("CHECKMEIN_DB_URI"), server_api=ServerApi('1'))
db = client[os.getenv("CHECKMEIN_COL_NAME")]

MS_PER_SECOND = 1000
S_PER_MINUTE = 60
MS_PER_MINUTE = S_PER_MINUTE * MS_PER_SECOND
student_ids_col = db["student_ids"]
check_in_col = db["student_check_in_time"]

# get_student_by_id(id, collection) returns a Cursor object that points to specific document in 
# the MongoDB database, returns -1 if the student is not found
# (str, collection) -> Cursor
def get_student_by_card_id(card_id):
    students = student_ids_col.find()
    card_id = card_id.encode("utf-8")

    for i in students:
        if bcrypt.checkpw(card_id, i["fob_id"].encode("utf-8")):
            return i

    return False

def already_checked_in(student_id):
    cur_time = time.time() * MS_PER_SECOND
    ref_time = cur_time - 30 * MS_PER_MINUTE
    query = {"check_in_time": {"$gte": ref_time}}

    results = check_in_col.find(query)

    for i in results:
        if (student_id == i['student']['$studentID']):
            return True
    
    return False

def check_in(student):
    already_checked_in(student["student_id"])
    query = {"student": {"$ref": "student_ids",
                         "$studentID": student["student_id"]}, 
             "check_in_time": time.time() * MS_PER_SECOND}

    check_in_col.insert_one(query)
