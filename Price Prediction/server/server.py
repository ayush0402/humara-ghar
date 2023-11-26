from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_name',methods=['GET'])
def get_location_name():
    try:
        print("Before calling util.get_location_name()")
        locations = util.get_location_name()
        print("After calling util.get_location_name()")
        response = jsonify({'locations': locations})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_rent_price', methods=['POST'])
def predict_rent_price():
    try:
        sqft = float(request.form['sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])

        response = jsonify({
            'estimated_price': util.get_estimated_price(location, sqft, bath, bhk)
        })

        response.headers.add("Access-control-allow-origin", "*")
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Starting Python Flask Server for Rent Price Prediction Model")
    util.load_saved_artifacts()
    app.run()
