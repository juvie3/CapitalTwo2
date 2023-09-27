from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo-1', email='demo@aa.io', password='password', first_name='Demo1', last_name='User', street='941 Summer Drive', city='Logansport', state='IN', zip_code='46947', phone='2063428631'
        )
    marnie = User(
        username='Demo-2', email='demo2@aa.io', password='password', first_name='Demo2', last_name='User', street='9072 West Nichols Street', city='Carollton', state='GA', zip_code='30117', phone='7175501675'
        )
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Smith', street='77 Wrangler Drive', city='Lake Jackson', state='TX', zip_code='77566', phone='1111111111'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
