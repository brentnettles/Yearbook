from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import relationship

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    name = db.Column(db.String)
    quote = db.Column(db.String)
    grad_date = db.Column(db.Date, server_default=db.func.now())
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'))
    email = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)

    cohort = relationship("Cohort", back_populates="students")
    signatures = relationship("Signature", back_populates="student", lazy="dynamic")
    serialize_rules = ['-cohort.students']

    def __repr__(self):
        return f"<Student {self.email}>"


class Cohort(db.Model, SerializerMixin):
    __tablename__ = 'cohorts'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, server_default=db.func.now())
    location = db.Column(db.String)

    students = relationship("Student", back_populates="cohort")
    serialize_rules = ['-students.cohort']

    def __repr__(self):
        return f"<Cohort {self.id}>"


class Signature(db.Model):
    __tablename__ = 'signatures'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String)
    author = db.Column(db.String)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    student = relationship("Student", back_populates="signatures")

    def __repr__(self):
        return f"<Signature '{self.message}' by {self.author}>"