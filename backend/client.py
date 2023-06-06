from database_funcs import *
import bcrypt

db = get_database()

student_ids_col = db["student_ids"]
check_in_col = db["student_check_in_time"]

print("Program started")

while True:
    choice = int(input("Enter 1 to register a student, 2 to check in\n"))

    if choice == 1:
        student_name = input("Please enter the student's name\n")
        student_id = input("Please enter student's id\n")

        bytes = student_id.encode("utf-8")
        salt = bcrypt.gensalt()

        hashed_id = bcrypt.hashpw(bytes, salt)

        reg_student(student_name=student_name, student_id=hashed_id, collection=student_ids_col)

    elif choice == 2:
        student_id = input("Please tap your card\n")

        result = get_student_by_id(student_id=student_id, collection=student_ids_col)

        if (result != False):
            check_in(result, check_in_col)
            print("Hello " + result["student_name"] + ", you are checked in!" )
        
        else:
            print("Error: Student does not exist")
    
    else:
        print("Please enter either 1 or 2")