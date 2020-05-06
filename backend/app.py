from flask import Flask
from flask_dynrbac import DynRBAC
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy(app)

m = MixinGenerator(db.Model)


class Role(m.get_role_class()):
    pass


class User(m.get_user_class()):
    pass


class Permission(m.get_permission_class()):
    pass


rbac = DynRBAC(app, role_class=Role, user_class=User, permission_class=Permission)
print(Role.users)


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
