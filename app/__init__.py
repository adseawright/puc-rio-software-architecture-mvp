from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    with app.app_context():
        db.create_all()

    from app.api.register import register_bp
    from app.api.store import store_bp
    from app.api.product import product_bp
    from app.api.sale import sale_bp
    from app.api.login import login_bp
    from app.api.profile import profile_bp

    app.register_blueprint(register_bp)
    app.register_blueprint(store_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(sale_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(profile_bp)

    return app
