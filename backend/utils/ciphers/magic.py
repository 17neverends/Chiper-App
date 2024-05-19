import math
from typing import List

class MagicSquareCipher:
    def __init__(self, message: str):
        self.message: str = message
        self.encrypted_message: str = ''
        self.magic_square: List[List[int]] = []

    @staticmethod
    def create_magic_square(n: int) -> List[List[int]]:
        magic_square: List[List[int]] = [[0] * n for _ in range(n)]
        num: int = 1
        i, j = 0, n // 2
        while num <= n**2:
            magic_square[i][j] = num
            num += 1
            new_i, new_j = (i - 1) % n, (j + 1) % n
            if magic_square[new_i][new_j] != 0:
                i = (i + 1) % n
            else:
                i, j = new_i, new_j

        return magic_square

    def encrypt(self) -> None:
        length: int = len(self.message)
        n: int = math.ceil(math.sqrt(length))
        padded_length = n**2
        padded_message = self.message.ljust(padded_length)
        encrypted_message: List[str] = [''] * (n**2)
        magic_square = self.create_magic_square(n)
        for i in range(n):
            for j in range(n):
                index: int = magic_square[i][j] - 1
                encrypted_message[index] = padded_message[i * n + j]
        self.encrypted_message = ''.join(encrypted_message)
        self.magic_square = magic_square

    def decrypt(self) -> str:
        length: int = len(self.encrypted_message)
        n: int = int(math.sqrt(length))
        decrypted_message: List[str] = [''] * (n**2)
        for i in range(n):
            for j in range(n):
                index: int = self.magic_square[i][j] - 1
                decrypted_message[i * n + j] = self.encrypted_message[index]
        return ''.join(decrypted_message).strip()

