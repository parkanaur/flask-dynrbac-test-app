from flask import Flask, request, jsonify
from flask_dynrbac import DynRBAC
from flask_dynrbac.api import generate_rbac_api
from flask_dynrbac.domain_model_generator import DomainModelGenerator
from flask_sqlalchemy import SQLAlchemy

import sys


def create_mock_db(db, dmg):
    db.drop_all()
    db.create_all()

    roles = [
        dmg.Role(name='role1'),
        dmg.Role(name='role2'),
        dmg.Role(name='role3'),
        dmg.Role(name='role4'),
        dmg.Role(name='admin')
    ]
    users = [
        dmg.User(name='user1_role1'),
        dmg.User(name='user2_role1'),
        dmg.User(name='user1_role2'),
        dmg.User(name='user1_roles12'),
        dmg.User(name='user1_role3'),
        dmg.User(name='user2_role3'),
        dmg.User(name='user3_role3'),
        dmg.User(name='user1_roles123'),
        dmg.User(name='user1_role4'),
        dmg.User(name='user_admin')
    ]
    permissions = [
        dmg.Permission(name='can_r1'),
        dmg.Permission(name='can_r2'),
        dmg.Permission(name='can_r3'),
        dmg.Permission(name='can_r4'),
        dmg.Permission(name='can_admin')
    ]
    units = [
        dmg.Unit(name='unit1'),
        dmg.Unit(name='unit2'),
        dmg.Unit(name='unit3'),
        dmg.Unit(name='unit4'),
        dmg.Unit(name='unit_admin'),
    ]

    permissions[0].units.append(units[0])
    permissions[1].units.append(units[1])
    permissions[2].units.append(units[2])
    permissions[3].units.append(units[3])
    permissions[4].units.append(units[4])

    roles[0].users.extend((users[0], users[1], users[3], users[-3]))
    roles[0].permissions.append(permissions[0])
    roles[1].users.extend((users[2], users[3], users[-3]))
    roles[1].permissions.append(permissions[1])
    roles[2].users.extend(users[4:8])
    roles[2].permissions.append(permissions[2])
    roles[3].users.append(users[-2])
    roles[3].permissions.append(permissions[3])
    roles[4].users.append(users[-1])
    roles[4].permissions.append(permissions[4])
    roles[4].children.extend(roles[0:4])

    db.session.add(roles[0])
    db.session.add(roles[1])
    db.session.add(roles[2])
    db.session.add(roles[3])
    db.session.add(roles[4])

    db.session.commit()


current_user_id = 1

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Init domain model
models = DomainModelGenerator(db.Model)
db.create_all()

# Init RBAC
rbac = DynRBAC(app, role_class=models.Role, user_class=models.User, permission_class=models.Permission,
               session=db.session, user_id_provider=lambda: current_user_id, unit_class=models.Unit)
rbac.create_missing_units = True

# Init RBAC API
rbac_api = generate_rbac_api(app)


@app.route('/api/rbac/set_user_id')
def set_cid():
    global current_user_id
    current_user_id = int(request.args.get('id', 1))
    return 'ok'


@app.route('/api/rbac/get_user_id')
def get_cid():
    global current_user_id
    return jsonify({"id": current_user_id})


@app.route('/')
@rbac.rbac(unit_name='test1')
def hello_world():
    return 'Hello World!'


@app.route('/test')
@rbac.rbac(unit_name='test2')
def x():
    return 'x'


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--recreate':
        create_mock_db(db, models)
    app.run()
