"""create analysis results table

Revision ID: 668cabe480a1
Revises: 8c2b602f67d7
Create Date: 2026-09-25 13:49:20.350734

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "668cabe480a1"
down_revision: Union[str, Sequence[str], None] = "8c2b602f67d7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create analysis_results table."""

    op.create_table(
        "analysis_results",
        sa.Column(
            "id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "dataset_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "result",
            sa.JSON(),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["dataset_id"],
            ["datasets.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_analysis_results_id"),
        "analysis_results",
        ["id"],
        unique=False,
    )

    op.create_index(
        op.f("ix_analysis_results_dataset_id"),
        "analysis_results",
        ["dataset_id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop analysis_results table."""

    op.drop_table("analysis_results", if_exists=True)