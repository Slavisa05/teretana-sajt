from flask import Flask, request, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route('/')
def root():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True, port=8000)