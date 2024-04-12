from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    quote = db.Column(db.String)
    grad_date = db.Column(db.Date, default=db.func.now())
    signatures = db.Column(db.String)
    author = db.Column(db.String)  
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'))
    email = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)

    cohort = db.relationship("Cohort", back_populates="students")
    serialize_rules = ['-cohort.students']

    def __repr__(self):
        return f"<Student {self.email}>"


class Cohort(db.Model, SerializerMixin):
    __tablename__ = 'cohorts'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, default=db.func.now())
    location = db.Column(db.String)

    students = db.relationship("Student", back_populates="cohort")
    serialize_rules = ['-students.cohort']

    def __repr__(self):
        return f"<Cohort {self.id}>"