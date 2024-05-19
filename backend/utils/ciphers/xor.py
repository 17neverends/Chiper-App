class XORCipher:
    def __init__(self, key: str):
        self.key = key

    def encrypt(self, message: str) -> str:
        encrypt_hex = ""
        key_itr = 0
        for i in range(len(message)):
            temp = ord(message[i]) ^ ord(self.key[key_itr])
            encrypt_hex += hex(temp)[2:].zfill(4) 
            key_itr = (key_itr + 1) % len(self.key)
        return format(encrypt_hex)

    def decrypt(self, encrypted_message: str) -> str:
        hex_to_uni = ""
        for i in range(0, len(encrypted_message), 4):
            hex_to_uni += chr(int(encrypted_message[i:i+4], 16))

        decryp_text = ""
        key_itr = 0
        for i in range(len(hex_to_uni)):
            temp = ord(hex_to_uni[i]) ^ ord(self.key[key_itr])
            decryp_text += chr(temp)
            key_itr = (key_itr + 1) % len(self.key)

        return format(decryp_text)
