from flask import Flask, request
from flask_dynrbac import DynRBAC
from flask_dynrbac.api import generate_rbac_api
from flask_dynrbac.domain_model_generator import DomainModelGenerator
from flask_sqlalchemy import SQLAlchemy

current_user_id = 1

app = Flask(__name__)
db = SQLAlchemy(app)

# Init domain model
models = DomainModelGenerator(db.Model)
db.create_all()

# Init RBAC
rbac = DynRBAC(app, role_class=models.Role, user_class=models.User, permission_class=models.Permission,
               session=db.session, user_id_provider=lambda: current_user_id, unit_class=models.Unit)

# Init RBAC API
rbac_api = generate_rbac_api(app)


@app.route('/api/set_user_id')
def set_cid():
    global current_user_id
    current_user_id = int(request.args.get('id', 1))
    return 'ok'


@app.route('/')
@rbac.rbac(unit_name='test1')
def hello_world():
    return 'Hello World!'


@app.route('/test')
@rbac.rbac(unit_name='test2')
def x():
    return 'x'


if __name__ == '__main__':
    app.run()
