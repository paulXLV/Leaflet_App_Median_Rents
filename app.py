# import necessary libraries
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
import pymongo
import pandas as pd
import os
import csv
from bson.json_util import dumps

# create instance of Flask app

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
# conn = "mongodb://localhost:27017/"
client = pymongo.MongoClient("mongodb://heroku_7t9dkd05:kt8li5obnhhria0qf5vvtbh1cm@ds155097.mlab.com:55097/heroku_7t9dkd05")

#"mongodb://heroku_7t9dkd05:kt8li5obnhhria0qf5vvtbh1cm@ds155097.mlab.com:55097/heroku_7t9dkd05/"
db = client["heroku_7t9dkd05"]
# ****** ALREADY LOADED FILES TOTAL OF 4128 Docs at 1.09MB ********
#db.zipColl.drop()
#all_data = "Yearly_Top3_Tech_Loc_ZRI_Hist.csv"
#all_data = "NY_Projection_2019_2025.csv"
#all_data_pd = pd.read_csv(all_data)
#zipData = json.loads(all_data_pd.to_json(orient='records'))
#db.zipColl.insert_many(zipData)



@app.route("/")
def home():
    #return "ENTER /YEAR"
    return render_template("index.html")
    
@app.route("/<year>")
def samples(year):
    filterData = db.zipColl.find({"Year": int(year)})
    return dumps(filterData)
                                
if __name__ == "__main__":
    app.run()