import math
from typing import List, Tuple

class PolybiusSquareCipher:
    def __init__(self, input_text: str):
        self.input_text = input_text
        self.alphabet = self.extract_alphabet(input_text)
        self.size = math.ceil(math.sqrt(len(self.alphabet)))
        self.square = self.generate_polybius_square()

    def extract_alphabet(self, input_text: str) -> str:
        unique_chars = set(input_text)
        alphabet = ''.join(filter(str.isalnum, unique_chars))
        return alphabet

    def generate_polybius_square(self) -> List[List[str]]:
        size = self.size
        square = [['' for _ in range(size)] for _ in range(size)]
        chars = iter(self.alphabet)
        for i in range(size):
            for j in range(size):
                try:
                    square[i][j] = next(chars)
                except StopIteration:
                    square[i][j] = 'X'
        return square

    def find_position(self, char: str) -> Tuple[int, int]:
        for i in range(self.size):
            for j in range(self.size):
                if self.square[i][j].lower() == char.lower():
                    return i, j
        return -1, -1

    def encrypt_case_sensitive(self) -> str:
        ciphertext = ''
        for char in self.input_text:
            if char == ' ':
                ciphertext += ' '
                continue
            row, col = self.find_position(char)
            if row != -1 and col != -1:
                encrypted_char = str(row + 1) + str(col + 1)
                ciphertext += encrypted_char
        return ciphertext

    def decrypt_case_sensitive(self, ciphertext: str) -> str:
        plaintext = ''
        i = 0
        while i < len(ciphertext):
            if ciphertext[i] == ' ':
                plaintext += ' '
                i += 1
                continue
            row = int(ciphertext[i]) - 1
            col = int(ciphertext[i + 1]) - 1
            if row < self.size and col < self.size:
                char = self.square[row][col]
                if self.input_text[len(plaintext)].isupper():
                    char = char.upper()
                plaintext += char
            i += 2
        return plaintext