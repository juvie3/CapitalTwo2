from flask_wtf import FlaskForm
from wtforms import FloatField, DateTimeField, StringField
from wtforms.validators import DataRequired

class TransfersForm (FlaskForm):
      payee = StringField("Payee")
      amount = FloatField("Amount")
      date_paid = StringField("Date Paid")
