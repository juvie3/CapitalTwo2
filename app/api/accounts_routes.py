from flask import Blueprint, request, redirect
from ..models import db
from ..models.account import Account
from flask_login import login_required, current_user #current_user.id

accounts = Blueprint('accounts', __name__)


@accounts.route("/")
@login_required
def get_accounts():
      """
      Get all accounts for current user
      """

      print('========================hello')
      res = Account.query.filter(Account.user_id == current_user.id)
      # res = Account.query.all()
      # print(res.to_dict())
      # return res.to_dict()
      # response = 'hello'
      # return response.to_dict()
      response = [prod.to_dict() for prod in res]

      print(response)
      return response
