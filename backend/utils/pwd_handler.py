# pwd_handler.py

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHash

def hash_password(password):
    ph = PasswordHasher()
    password_hash = ph.hash(password)
    return password_hash

def verify_password(plain_password, hashed_password):
    try:
        ph = PasswordHasher()
        return ph.verify(hashed_password, plain_password)
    except (VerifyMismatchError, VerificationError, InvalidHash):
        return False

# Testing
# my_pass = "AnaAreMere"
# print(hash_password(my_pass))
# #print(verify_password("as", hash_password(my_pass)))
# print(verify_password(my_pass, hash_password(my_pass)))