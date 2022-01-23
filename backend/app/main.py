from flask import Flask

from api import api
from config import Config
from models import db

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)
app.app_context().push()

db.create_all()

api.init_app(app)


@app.route('/', methods=['GET'])
def index():
    return 'Hello world!'


if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT)