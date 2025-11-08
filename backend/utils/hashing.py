# hashing.py

import bcrypt

def hash_password(password):
    password_bytes = password.encode('utf-8')
    hashed_bytes = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


#my_pass = "AnaAreMere"
#print(hash_password(my_pass))