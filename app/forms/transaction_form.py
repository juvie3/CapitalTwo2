from flask_wtf import FlaskForm
from wtforms import FloatField, DateTimeField, StringField, IntegerField
from wtforms.validators import DataRequired

class TransactionForm (FlaskForm):
      payee = StringField("Payee")
      amount = FloatField("Amount")
      date_paid = StringField("Date Paid")
      product = StringField("Product")
      id = IntegerField("Id")
