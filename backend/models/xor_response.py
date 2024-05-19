from pydantic import BaseModel

class String(BaseModel):
    message: str
    decrypt: str
