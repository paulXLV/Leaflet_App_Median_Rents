# import necessary libraries
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import json
import pymongo
import jsonify

# create instance of Flask app

app = Flask(__name__)





# Use flask_pymongo to set up mongo connection
conn = "mongodb://localhost:27017/tech_app"
client = pymongo.MongoClient(conn)
db = client.zipDB
db.drop()
all_data = "zipcode_sf_zri_2018.csv"
all_data_pd = pd.read_csv(all_data)
zipData = json.loads(all_data_pd.to_json(orient='records'))
db.zipDB.insert_many(zipData)



@app.route("/")
def home():
    return render_template("index.html")
    
@app.route("/<year>")
def samples(year):
    filterData = db.zipDB.find({"year": year)
    return(jsonify(filterData))
                                
if __name__ == "__main__":
    app.run()
