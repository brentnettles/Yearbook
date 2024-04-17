"""Adding Author Name to Signatures db

Revision ID: c51b290dbf8f
Revises: 4882a9ecf11a
Create Date: 2024-04-17 15:40:52.111528

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c51b290dbf8f'
down_revision = '4882a9ecf11a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('signatures', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_signatures_author_id_students'), 'students', ['author_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('signatures', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_signatures_author_id_students'), type_='foreignkey')
        batch_op.drop_column('author_id')

    # ### end Alembic commands ###
