from abc import ABC, abstractmethod
from typing import Any

import pandas as pd


class AITool(ABC):
    name: str
    description: str

    @abstractmethod
    def execute(self, df: pd.DataFrame) -> dict[str, Any]:
        """Execute the AI tool."""
        raise NotImplementedError