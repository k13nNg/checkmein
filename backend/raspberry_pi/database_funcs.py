from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import datetime
import bcrypt
import os

load_dotenv()

def get_database():

    client = MongoClient(os.getenv("CHECKMEIN_DB_URI"), server_api=ServerApi('1'))

    return client[os.getenv("CHECKMEIN_COL_NAME")]

# get_student_by_id(id, collection) returns a Cursor object that points to specific document in 
# the MongoDB database, returns -1 if the student is not found
# (str, collection) -> Cursor
def get_student_by_id(student_id, collection):
    students = collection.find()
    student_id = student_id.encode("utf-8")

    for i in students:
        if bcrypt.checkpw(student_id, i["student_id"]):
            return i

    return False

# reg_student(student_name, student_id, collection) insert a student into the database
# (str, binary, collection) -> void
def reg_student(student_name, student_id, collection):
    query = {"student_id": student_id, "student_name": student_name}

    collection.insert_one(query)

def check_in(student_id, collection):
    query = {"student": student_id, "check_in_time": datetime.datetime.now()}

    collection.insert_one(query)
