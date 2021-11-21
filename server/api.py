import flask
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request
from flask_cors import CORS, cross_origin
from tensorflow import keras
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

def translate(x):
    return {
        0: 'ripe',
        1: 'medium',
        2: 'unripe',
        3: 'error'
    }.get(x, 3)

@app.route('/api', methods=['GET'])
@cross_origin()
def test():
    return {'test' : 'success'}


# A route to return all of the available entries in our catalog.
@app.route('/api/uploadFile', methods=['POST'])
@cross_origin()
def upload_file():
    # data = request.files['file'].stream.read()
    data = request.files['file']
    data.save('./static/temp.png')
    result = predict()
    return {'payload' : result}

def predict():
    model = tf.keras.models.load_model('papayaV5.h5')
    img = image.load_img('./static/temp.png', target_size=(128, 128, 3))
    x = image.img_to_array(img) / 255.0
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    classes = model.predict(images)
    cl = str (float(np.max(classes[0]))*100)[:5]
    return {'status' : translate(np.argmax(classes[0])), 'confident_level': cl}
app.run()