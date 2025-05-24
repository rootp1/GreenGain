from flask import Flask, request, jsonify
from flask_cors import CORS
from model import load_model, predict_species, get_label_names

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and labels once at startup
model = load_model()
label_names = get_label_names()

@app.route('/predict', methods=['GET'])
def predict():
    """API endpoint to predict species from image URL."""
    image_url = request.args.get('url')
    if not image_url:
        return jsonify({'error': 'URL parameter is missing'}), 400

    try:
        predicted_species = predict_species(model, image_url, label_names)
        return jsonify({'species': predicted_species})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
