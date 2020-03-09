from flask import Flask
from flask_dynrbac import DynRBAC

app = Flask(__name__)
rbac = DynRBAC(app)


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
