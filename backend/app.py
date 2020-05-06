from flask import Flask
from flask_dynrbac import DynRBAC
from flask_dynrbac.api import generate_rbac_api
from flask_dynrbac.domain_model_generator import DomainModelGenerator
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
db = SQLAlchemy(app)

# Init domain model
models = DomainModelGenerator(db.Model)
db.create_all()

# Init RBAC
rbac = DynRBAC(app, role_class=models.Role, user_class=models.User, permission_class=models.Permission,
               session=db.session, user_id_provider=lambda: 1, unit_class=models.Unit)

# Init RBAC API
rbac_api = generate_rbac_api(app)


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
