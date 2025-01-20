from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.before_request
def basic_authentication():
    if request.method.lower() == "options":
        return Response()


@app.route("/")
def home():
    return {"message": "Welcome to the Best Before Tracker!"}, 200


@app.route("/search", methods=["POST"])
def submit_barcode():
    data = request.get_json()
    barcode = data.get("barcode") if data else None
    if barcode:
        API_URL = "https://productsearch.gs1.se/foodservice/tradeItem/search"
        opts = {"query": barcode, "sortDirection": 1, "sortby": 0}
        response = requests.post(API_URL, json=opts)
        if response.status_code == 200:
            return response.json(), 200
        else:
            return {
                "message": "Error fetching data from external API"
            }, response.status_code
    else:
        return {"message": "No barcode provided"}, 400


if __name__ == "__main__":
    app.run()
