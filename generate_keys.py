import secrets
import base64

# Generate a 32-byte secret key and encode it in base64
secret_key = base64.b64encode(secrets.token_bytes(32)).decode('utf-8')

# Generate a 64-byte JWT secret key and encode it in base64
jwt_secret_key = base64.b64encode(secrets.token_bytes(64)).decode('utf-8')

print("Generated Keys:")
print("-" * 50)
print(f"SECRET_KEY = '{secret_key}'")
print("-" * 50)
print(f"JWT_SECRET_KEY = '{jwt_secret_key}'")
print("-" * 50) 