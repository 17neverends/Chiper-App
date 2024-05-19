from pydantic import BaseModel
from typing import List

class ChessResponse(BaseModel):
    message: str
    square: List[List[str]]
    decrypt: str