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

@app.route('/o-nama')
def about():
    return render_template('about.html')

@app.route('/galerija')
def gallery():
    return render_template('gallery.html')

@app.route('/usluge')
def services():
    return render_template('services.html')

@app.route('/kontakt')
def contact():
    return render_template('contact.html')

@app.route('/gym-1')
def gym1():
    return render_template('gym-1.html')

@app.route('/gym-2')
def gym2():
    return render_template('gym-2.html')

@app.route('/gym-3')
def gym3():
    return render_template('gym-3.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/blog/kako-izabrati-odgovarajuci-plan-treninga')
def blog_post1():
    return render_template('posts/kako-izabrati-odgovarajuci-plan-treninga.html')

if __name__ == "__main__":
    app.run(debug=True, port=8000)