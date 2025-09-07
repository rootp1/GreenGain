from flask import Flask, request, jsonify
from flask_cors import CORS
from model import load_model, predict_species, get_label_names

app = Flask(__name__)

CORS(app, origins=["https://greengain.onrender.com", "http://localhost:3000"])

model = load_model()
label_names = get_label_names()

@app.route('/predict', methods=['GET'])
def predict():
    image_url = request.args.get('url')
    if not image_url:
        return jsonify({'error': 'URL parameter is missing'}), 400
    try:
        predicted_species = predict_species(model, image_url, label_names)
        return jsonify({'species': predicted_species})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run only on localhost (loopback) at port 5000
    app.run(host='127.0.0.1', port=5000, debug=True)
