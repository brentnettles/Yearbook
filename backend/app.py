from flask import Flask, session, request, send_from_directory, redirect, url_for
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Student, Cohort, Signature, Instructor
from flask_bcrypt import Bcrypt
import os

# Setup Flask app and specify the absolute path to the static folder dynamically
app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'assets'))
bcrypt = Bcrypt(app)

app.secret_key = '123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
Migrate(app, db)

# Correct CORS setup to allow credentials
CORS(app, supports_credentials=True, resources={r"*": {"origins": "http://localhost:5173"}})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return {"error": "Email is required"}, 400

    student = Student.query.filter_by(email=email).first()

    if student:
        session['user_id'] = student.id  # Store user ID in session
        return {"message": "Login successful", "user": student.to_dict()}, 200
    else:
        return {"error": "User not found"}, 404

@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop('user_id', None)  # Clear the session
    return {"message": "Logged out"}, 200

@app.route("/")
def index():
    return "<h1>| Flatiron Yearbook | </h1>"

@app.route('/assets/<path:path>')
def send_assets(path):
    assets_dir = os.path.join(os.getcwd(), 'assets')
    return send_from_directory(assets_dir, path)

@app.route("/check_session")
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = Student.query.get(user_id)
        return {"user": user.to_dict()}, 200
    return {}, 401

@app.route("/api/cohorts", methods=["GET"])
def get_cohorts():
    try:
        cohorts = Cohort.query.all()
        return [
            {
                "id": cohort.id,
                "start_date": cohort.start_date.strftime('%Y-%m-%d'),
                "location": cohort.location,
                "name": cohort.name,
                "course": cohort.course,
                "instructors": [
                    {
                        "id": instructor.id,
                        "name": instructor.name,
                        "img": instructor.img,
                        "quote": instructor.quote
                    } for instructor in cohort.instructors
                ]
            } for cohort in cohorts
        ], 200
    except Exception as e:
        return {"error": str(e)}, 500

# @app.route("/api/yearbook/<int:cohort_id>", methods=["GET"])
# def get_yearbook(cohort_id):
#     cohort = Cohort.query.get_or_404(cohort_id)
#     students = cohort.students
#     student_info = [{"id": student.id, "name": student.name, "img": student.img} for student in students]
#     return {"students": student_info, "cohortName": cohort.location}, 200

@app.route("/api/yearbook/<int:cohort_id>", methods=["GET"])
def get_yearbook(cohort_id):
    try:
        cohort = Cohort.query.get_or_404(cohort_id)
        students = cohort.students
        student_info = [{"id": student.id, "name": student.name, "img": student.img, "quote": student.quote} for student in students]
        instructors = [
            {
                "id": instructor.id,
                "name": instructor.name,
                "img": instructor.img,
                "quote": instructor.quote
            } for instructor in cohort.instructors
        ]
        return {
            "cohortName": cohort.name,
            "students": student_info,
            "instructors": instructors
        }, 200
    except Exception as e:
        return {"error": str(e)}, 404
    
from flask import jsonify

@app.route("/api/student/<int:student_id>", methods=["GET"])
def get_student(student_id):
    try:
        student = Student.query.get_or_404(student_id)
        return student.to_dict(), 200
    except Exception as e:
        return {"error": str(e)}, 404

@app.route("/api/instructor/<int:instructor_id>", methods=["GET"])
def get_instructor(instructor_id):
    instructor = Instructor.query.get(instructor_id)
    if not instructor:
        return {"error": "Instructor not found"}, 404
    return {
        "id": instructor.id,
        "name": instructor.name,
        "img": instructor.img,
        "quote": instructor.quote
    }, 200


@app.route("/api/signatures", methods=["POST"])
def create_signature():
    json_data = request.get_json()
    new_signature = Signature(
        message=json_data['message'],
        student_id=json_data['student_id'],
        author_id=json_data['author_id']  # Assuming author_id is sent correctly from the front-end
    )
    db.session.add(new_signature)
    try :
        db.session.commit()
        return {"id": new_signature.id, "message": new_signature.message, "author": new_signature.author.name}, 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(port=5555, debug=True)
