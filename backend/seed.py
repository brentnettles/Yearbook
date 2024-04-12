from app import app
from models import db, Student, Cohort
import random
from datetime import datetime  # Add this import statement

def seed_data():
    # Delete all existing data
    print('Deleting all data...')
    Student.query.delete()
    Cohort.query.delete()

    # Add cohorts
    print('Adding cohorts...')
    cohorts = [
        Cohort(start_date=datetime.strptime('2022-01-01', '%Y-%m-%d'), location='New York'),
        Cohort(start_date=datetime.strptime('2022-02-01', '%Y-%m-%d'), location='Los Angeles'),
        Cohort(start_date=datetime.strptime('2022-03-01', '%Y-%m-%d'), location='Chicago')
    ]
    db.session.add_all(cohorts)
    db.session.commit()

    # Add students
    print('Adding students...')
    students = [
        Student(img='student1.jpg', quote='Quote 1', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), signatures="Next year in Vegas!", cohort_id=1, email='student1@example.com', _password='password1'),
        Student(img='student2.jpg', quote='Quote 2', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), signatures="Next year at Mo's!", cohort_id=1, email='student2@example.com', _password='password2'),
        Student(img='student3.jpg', quote='Quote 3', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), signatures="Thanks for the repo!", cohort_id=2, email='student3@example.com', _password='password3')
    ]
    db.session.add_all(students)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()
