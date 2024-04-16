from flask import Flask, session, request, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Student, Cohort, Signature
import os

# Setup Flask app and specify the absolute path to the static folder dynamically
app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'assets'))

app.secret_key = '123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
Migrate(app, db)

# Correct CORS setup to allow credentials
CORS(app, supports_credentials=True, resources={r"*": {"origins": "http://localhost:5173"}})


HARDCODED_USER = {
    'user_id': 1,
    'username': 'Test_User'
}

@app.route("/")
def index():
    return "<h1>| Flatiron Yearbook | </h1>"

@app.route('/assets/<path:path>')
def send_assets(path):
    assets_dir = os.path.join(os.getcwd(), 'assets')
    return send_from_directory(assets_dir, path)

@app.route("/check_session")
def check_session():
    return HARDCODED_USER, 200
    
# No need to handle login/logout endpoints for now

@app.route("/api/cohorts", methods=["GET"])
def get_cohorts():
    cohorts = Cohort.query.all()
    return [cohort.to_dict() for cohort in cohorts], 200

@app.route("/api/yearbook/<int:cohort_id>", methods=["GET"])
def get_yearbook(cohort_id):
    cohort = Cohort.query.get_or_404(cohort_id)
    students = cohort.students

    student_info = [
        {
            "id": student.id,
            "name": student.name,
            "img": student.img
        }
        for student in students
    ]

    # Return both students and the name of the cohort
    return {"students": student_info, "cohortName": cohort.location}, 200  # Using cohort.location as the name


# @app.route("/api/yearbook/<int:cohort_id>", methods=["GET"])
# def get_yearbook(cohort_id):
#     cohort = Cohort.query.get_or_404(cohort_id)
#     students = cohort.students

#     student_info = [{"id": student.id, "name": student.name, "img": student.img} for student in students]

#     # Include the cohort name in the response
#     return {"students": student_info, "cohortName": cohort.name}, 200


@app.route("/api/student/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return {"error": "Student not found"}, 404
    
    student_info = student.to_dict() if hasattr(student, 'to_dict') else {
        "name": student.email,
        "img": student.img,
        "quote": student.quote,
        "signatures": student.signatures
    }

    return student_info, 200

@app.route("/api/signatures", methods=["POST"])
def create_signature():
    if request.method == "POST":
        # Parse JSON data from the request body
        json_data = request.get_json()

        # Create a new signature object using the JSON data
        new_signature = Signature(
            message=json_data.get('message'),
            # Add any other fields you need for the signature
        )

        # Add the new signature to the database session
        db.session.add(new_signature)
        
        try:
            # Commit the changes to the database
            db.session.commit()
            # Return a success response with the newly created signature
            return {
                "id": new_signature.id,
                "message": new_signature.message,
                # Add other fields if needed
            }, 201
        except Exception as e:
            # Rollback changes if an error occurs
            db.session.rollback()
            # Return an error response
            return {"error": str(e)}, 500


if __name__ == "__main__":
    app.run(port=5555, debug=True)