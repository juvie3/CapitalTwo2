from app.models import db, Transfer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transfers():

      db.session.commit()

def undo_transfers():
      if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transfers RESTART IDENTITY CASCADE;")
      else:
            db.session.execute(text("DELETE FROM transfers"))

      db.session.commit()
