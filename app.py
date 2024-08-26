from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

@login_manager.user_loader
def load_user(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return User(id=user[0], username=user[1], password=user[2])
    return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()
    if user and check_password_hash(user[2], password):
        user_obj = User(id=user[0], username=user[1], password=user[2])
        login_user(user_obj)
        return redirect(url_for('index'))
    else:
        flash('Login Unsuccessful. Please check username and password', 'danger')
        return redirect(url_for('index'))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    confirm_email = request.form['confirm_email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']
    
    if email != confirm_email:
        return jsonify({'success': False, 'message': 'Emails do not match.'})
    if password != confirm_password:
        return jsonify({'success': False, 'message': 'Passwords do not match.'})
    
    hashed_password = generate_password_hash(password)
    
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'success': False, 'message': 'Username already exists.'})
    conn.close()

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, hashed_password))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'User registered successfully!'})

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    # Create the database and users table if it doesn't exist
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.close()
    app.run(debug=True)