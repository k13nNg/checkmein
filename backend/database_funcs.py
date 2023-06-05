from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

def get_database():

    client = MongoClient(os.getenv("CHECKMEIN_DB_URI"), server_api=ServerApi('1'))
    return client[os.getenv("CHECKMEIN_COL_NAME")]
