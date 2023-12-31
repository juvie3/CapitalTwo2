"""empty message

Revision ID: 697248abed35
Revises: ffdc0a98111c
Create Date: 2023-09-07 22:31:28.100364

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '697248abed35'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('account_type', sa.String(length=100), nullable=True),
    sa.Column('funds', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('account_id', sa.Integer(), nullable=True),
    sa.Column('payee', sa.String(length=255), nullable=True),
    sa.Column('product', sa.String(length=255), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('date_paid', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['account_id'], ['accounts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transfers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('account_id', sa.Integer(), nullable=True),
    sa.Column('payee', sa.String(length=255), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('date_paid', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['account_id'], ['accounts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('street', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('city', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('state', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('zip_code', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('phone', sa.String(length=40), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('phone')
        batch_op.drop_column('zip_code')
        batch_op.drop_column('state')
        batch_op.drop_column('city')
        batch_op.drop_column('street')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.drop_table('transfers')
    op.drop_table('transactions')
    op.drop_table('accounts')
    # ### end Alembic commands ###