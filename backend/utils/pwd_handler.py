# pwd_handler.py

from argon2 import PasswordHasher

def hash_password(password):
    ph = PasswordHasher()
    password_hash = ph.hash(password)
    return password_hash
    # password_bytes = password.encode('utf-8')
    # hashed_bytes = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    # return hashed_bytes.decode('utf-8')

def verify_password(plain_password, hashed_password):
    try:
        ph = PasswordHasher()
        return ph.verify(hashed_password, plain_password)
    except:
        raise Exception("Invalid Password")

# Testing
# my_pass = "AnaAreMere"
# print(hash_password(my_pass))
# #print(verify_password("as", hash_password(my_pass)))
# print(verify_password(my_pass, hash_password(my_pass)))