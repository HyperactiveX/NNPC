from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api', methods=['GET'])
@cross_origin()
def test():
    return {'test' : 'success'}


# A route to return all of the available entries in our catalog.
@app.route('/api/uploadFile', methods=['GET'])
@cross_origin()
def upload_file():
    print('Hello')
    return {'status' : 'true'}
app.run()