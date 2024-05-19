from fastapi import APIRouter, HTTPException, Query
from backend.models.magic_response import MagicResponse
from backend.models.chess_response import ChessResponse
from backend.models.xor_response import String
from backend.utils import MagicSquareCipher, XORCipher, PolybiusSquareCipher

router = APIRouter(prefix="/enc")

@router.get("/magic", response_model=MagicResponse)
async def check_magic(data: str = Query(...)) -> MagicResponse:
    try:
        encryptor = MagicSquareCipher(data)
        encryptor.encrypt()
        response_content = MagicResponse(
            message=encryptor.encrypted_message,
            square=encryptor.magic_square,
            decrypt=encryptor.decrypt(),
        )
        return response_content
    except Exception as e:
        raise HTTPException(status_code=400, detail="Неверные входные данные")
    
@router.get("/chess", response_model=ChessResponse)
async def check_magic(data: str = Query(...)) -> ChessResponse:
    try:
        cipher = PolybiusSquareCipher(data)
        encrypted_message = cipher.encrypt_case_sensitive()
        response_content = ChessResponse(
            message=encrypted_message,
            square=cipher.square,
            decrypt=cipher.decrypt_case_sensitive(encrypted_message)
        )
        return response_content
    except Exception as e:
        raise HTTPException(status_code=400, detail="Неверные входные данные")
    

@router.get("/xor", response_model=String)
async def check_magic(data: str, key: str) -> String:
    try:
        cipher = XORCipher(key)
        message = cipher.encrypt(data)
        response_content = String(
            message=cipher.encrypt(message),
            decrypt=cipher.decrypt(message)
        )
        return response_content
    except Exception as e:
        raise HTTPException(status_code=400, detail="Неверные входные данные")

    
