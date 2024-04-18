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

    # Relationships
    cohort = relationship("Cohort", back_populates="students")
    authored_signatures = relationship("Signature", foreign_keys="Signature.author_id", back_populates="author", lazy='dynamic')
    received_signatures = relationship("Signature", foreign_keys="Signature.student_id", back_populates="recipient", lazy='dynamic')
    ### Testing lazy='dynamic' /  in defining a relationship, returns a query object instead of a list



    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "img": self.img,
            "quote": self.quote,
            "grad_date": self.grad_date.strftime('%Y-%m-%d'),
            "cohort_id": self.cohort.id if self.cohort else None,
            "cohort_location": self.cohort.location if self.cohort else None,
            "received_signatures": [sig.to_dict() for sig in self.received_signatures]
        }
    def __repr__(self):
        return f"<Student {self.email}>"


class Cohort(db.Model, SerializerMixin):
    __tablename__ = 'cohorts'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, server_default=db.func.now())
    location = db.Column(db.String)
    name = db.Column(db.String)
    course = db.Column(db.String)

    instructors = relationship("Instructor", back_populates="cohort")
    students = relationship("Student", back_populates="cohort")
    serialize_rules = ['-students.cohort']

    def to_dict(self):
        return {
            "id": self.id,
            "start_date": self.start_date.strftime('%Y-%m-%d'),
            "location": self.location,
            "name": self.name,
            "course": self.course,
            "instructors": [instructor.to_dict() for instructor in self.instructors]  
        }


    def __repr__(self):
        return f"<Cohort {self.id}>"


class Signature(db.Model):
    __tablename__ = 'signatures'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    # Relationships
    # author = relationship("Student", foreign_keys=[author_id], back_populates="authored_signatures")
    # recipient = relationship("Student", foreign_keys=[student_id], back_populates="received_signatures")
    author = relationship("Student", foreign_keys=[author_id], back_populates="authored_signatures", lazy='joined')
    recipient = relationship("Student", foreign_keys=[student_id], back_populates="received_signatures", lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "author": self.author.name if self.author else "Anonymous",
            "author_id": self.author_id
        }

    def __repr__(self):
        return f"<Signature '{self.message}' by {self.author.name if self.author else 'Anonymous'}>"
class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    img = db.Column(db.String)
    quote = db.Column(db.String)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'))

    cohort = relationship("Cohort", back_populates="instructors")