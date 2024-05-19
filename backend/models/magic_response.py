from pydantic import BaseModel
from typing import List

class MagicResponse(BaseModel):
    message: str
    square: List[List[int]]
    decrypt: str