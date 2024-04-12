"""
One way of running the app:
flask --app src/app.py --debug run --port 5555


We can also use environment variables:
export FLASK_APP=src/app.py  # this is a path, make sure it is correct!
export FLASK_RUN_PORT=5555
export FLASK_DEBUG=1

Then we just need to do:
flask run
"""
import os

from flask import Flask, request, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Student, Cohort


app = Flask(__name__)
# set the db connection string
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize the sqlalchemy db
db.init_app(app)
# initialize alembic (migration framework)
Migrate(app, db)
# initialize CORS
CORS(app, supports_credentials=True)

@app.route("/")
def index():
    return "<h1>| Flatiron Yearbook | </h1>"

@app.route("/cohorts", methods=["GET"])
def get_cohorts():
    cohorts = Cohort.query.all()
    return [cohort.to_dict() for cohort in cohorts], 200


@app.route("/yearbook/<int:cohort_id>", methods=["GET"])
def get_yearbook(cohort_id):
    cohort = Cohort.query.get_or_404(cohort_id)
    students = cohort.students

    # Construct a list of dictionaries with only the desired fields
    student_info = []
    for student in students:
        student_data = {
            "id": student.id,
            "img": student.img
        }
        student_info.append(student_data)

    return student_info, 200

@app.route("/student/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return {"error": "Student not found"}, 404
    student_info = {
        "name": student.email,  # Assuming the email is the name
        "img": student.img,
        "quote": student.quote,
        "signatures": student.signatures
    }
    return student_info, 200

@app.route("/sign_yearbook/<int:student_id>", methods=["PATCH"])
def sign_yearbook(student_id):
    data = request.get_json()
    signatures = data.get("signatures")

    if not signatures:
        return {"error": "Message is required"}, 400
    
    student = db.session.get(Student, student_id)
    if not student:
        return {"error": "Student not found"}, 404

    signature_author = "Mr. Jerry"  

    student.signatures += f"\n- {signatures} by {signature_author}"
    
    for field in data:
        setattr(student, field, data[field])

    db.session.commit()
    
    return student.to_dict(), 200

if __name__ == "__main__":
    app.run(port=5555, debug=True)
