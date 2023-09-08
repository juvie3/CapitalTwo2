from flask_wtf import FlaskForm
from wtforms import FloatField, SelectField
from wtforms.validators import DataRequired

class AccountsForm(FlaskForm):
      account_type = SelectField("Type", choices=["checking", "savings"])
      funds = FloatField("Funding Amount")
