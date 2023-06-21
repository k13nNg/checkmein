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
def get_student_by_card_id(card_id, collection):
    students = collection.find()
    card_id = card_id.encode("utf-8")

    for i in students:
        if bcrypt.checkpw(card_id, i["fob_id"].encode("utf-8")):
            return i

    return False

# reg_student(student_name, student_id, collection) insert a student into the database
# (str, binary, collection) -> void
def reg_student(student_name, student_id, card_id, collection):
    query = {"student_id": student_id, "card_id": card_id, "student_name": student_name}

    collection.insert_one(query)

def check_in(card_id, collection):
    query = {"student": card_id, "check_in_time": datetime.datetime.utcnow()}

    collection.insert_one(query)
