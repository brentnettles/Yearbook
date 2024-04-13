from app import app, db
from models import Student, Cohort, Signature
from datetime import datetime

def seed_data():
    # Delete all existing data
    print('Deleting all data...')
    with app.app_context():
        Student.query.delete()
        Cohort.query.delete()
        Signature.query.delete()  # Add this line to delete existing Signature data

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
            # Cohort 1: Famous TV Show - Friends
            Student(img='/assets/c01/cohort01.png', name='Ross Geller', quote='We were on a break!', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='ross@example.com', _password='password1'),
            Student(img='/assets/c01/cohort02.png', name='Rachel Green', quote='It\'s not that common, it doesn\'t happen to every guy, and it IS a big deal!', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='rachel@example.com', _password='password2'),
            Student(img='/assets/c01/cohort03.png', name='Chandler Bing', quote='Could I BE anymore...', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='chandler@example.com', _password='password3'),
            Student(img='/assets/c01/cohort04.png', name='Monica Geller', quote='Welcome to the real world. It sucks. You\'re gonna love it!', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='monica@example.com', _password='password4'),
            Student(img='/assets/c01/cohort05.png', name='Joey Tribbiani', quote='How you doin\'?', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='joey@example.com', _password='password5'),
            Student(img='/assets/c01/cohort06.png', name='Phoebe Buffay', quote='Smelly Cat, Smelly Cat, what are they feeding you?', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='phoebe@example.com', _password='password6'),
            Student(img='/assets/c01/cohort07.png', name='Gunther', quote='We were on a break!', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='gunther@example.com', _password='password7'),
            Student(img='/assets/c01/cohort08.png', name='Janice Litman-Goralnik', quote='Oh. My. God.', grad_date=datetime.strptime('2022-01-15', '%Y-%m-%d'), cohort_id=1, email='janice@example.com', _password='password8'),
            
            # Cohort 2: Famous TV Show - Breaking Bad
            Student(img='/assets/c02/cohort01.png', name='Walter White', quote='Say my name.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='walter@example.com', _password='password9'),
            Student(img='/assets/c02/cohort02.png', name='Jesse Pinkman', quote='Yeah science!', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='jesse@example.com', _password='password10'),
            Student(img='/assets/c02/cohort03.png', name='Skyler White', quote='I am not in danger, Skyler. I am the danger.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='skyler@example.com', _password='password11'),
            Student(img='/assets/c02/cohort04.png', name='Hank Schrader', quote='You know, FYI, you can buy a decent bottle of scotch for the same price as a fine cigar.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='hank@example.com', _password='password12'),
            Student(img='/assets/c02/cohort05.png', name='Saul Goodman', quote='Better Call Saul!', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='saul@example.com', _password='password13'),
            Student(img='/assets/c02/cohort06.png', name='Gus Fring', quote='I hide in plain sight, same as you.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='gus@example.com', _password='password14'),
            Student(img='/assets/c02/cohort07.png', name='Mike Ehrmantraut', quote='No more half-measures.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='mike@example.com', _password='password15'),
            Student(img='/assets/c02/cohort08.png', name='Schraderbrau', quote='Brewed by the finest Czechoslovakians.', grad_date=datetime.strptime('2022-02-15', '%Y-%m-%d'), cohort_id=2, email='schraderbrau@example.com', _password='password16'),
            
            # Cohort 3: Famous TV Show - Game of Thrones
            Student(img='/assets/c01/cohort01.png', name='Jon Snow', quote='I am the sword in the darkness.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='jon@example.com', _password='password17'),
            Student(img='/assets/c01/cohort02.png', name='Daenerys Targaryen', quote='I will take what is mine with fire and blood.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='daenerys@example.com', _password='password18'),
            Student(img='/assets/c01/cohort03.png', name='Tyrion Lannister', quote='I drink and I know things.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='tyrion@example.com', _password='password19'),
            Student(img='/assets/c01/cohort04.png', name='Arya Stark', quote='A girl has no name.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='arya@example.com', _password='password20'),
            Student(img='/assets/c01/cohort05.png', name='Cersei Lannister', quote='When you play the game of thrones, you win or you die.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='cersei@example.com', _password='password21'),
            Student(img='/assets/c01/cohort06.png', name='Sansa Stark', quote='The lone wolf dies, but the pack survives.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='sansa@example.com', _password='password22'),
            Student(img='/assets/c01/cohort07.png', name='Bran Stark', quote='Chaos isn\'t a pit. Chaos is a ladder.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='bran@example.com', _password='password23'),
            Student(img='/assets/c01/cohort08.png', name='Jaime Lannister', quote='The things I do for love.', grad_date=datetime.strptime('2022-03-15', '%Y-%m-%d'), cohort_id=3, email='jaime@example.com', _password='password24'),
        ]
        db.session.add_all(students)
        db.session.commit()

        # Add signatures
        print('Adding signatures...')
        signatures = [
            Signature(message='Signature 1'),
            Signature(message='Signature 2'),
            Signature(message='Signature 3'),
            Signature(message='Signature 4'),
            Signature(message='Signature 5'),
            Signature(message='Signature 6'),
            Signature(message='Signature 7'),
            Signature(message='Signature 8')
        ]
        db.session.add_all(signatures)
        db.session.commit()

if __name__ == '__main__':
    seed_data()
