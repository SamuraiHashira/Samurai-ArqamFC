from flask import Flask, request, jsonify
import string
import random

app = Flask(__name__)

@app.route('/generate_password', methods=['POST'])
def generate_password():
    data = request.get_json()
    characters_number = data.get('length', 12)  # Default length is 12 if not provided in the request
    
    while characters_number < 6:
        characters_number = int(input("You need at least 6 characters. Please enter the number again: "))
    
    x1 = list(string.ascii_lowercase)
    x2 = list(string.ascii_uppercase)
    x3 = list(string.digits)
    x4 = list(string.punctuation)

    random.shuffle(x1)
    random.shuffle(x4)
    random.shuffle(x3)
    random.shuffle(x2)

    part1 = round(characters_number * (30/100))
    part2 = round(characters_number * (20/100))
    part3 = round(characters_number * (30/100))
    part4 = round(characters_number * (20/100))

    password = []
    for i in range(part1):
        password.append(x1[i])
        password.append(x2[i])

    for i in range(part2):
        password.append(x3[i])
        password.append(x4[i])

    random.shuffle(password)
    password = "".join(password[0:])
    
    response = {'password': password}
    return jsonify(response)

if __name__ == '__main__':
    app.run()
