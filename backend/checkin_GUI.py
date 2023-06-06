from tkinter import *
from database_funcs import *
import bcrypt

db = get_database()

student_ids_col = db["student_ids"]
check_in_col = db["student_check_in_time"]

root = Tk()
root.geometry("300x200")

l = Label(root, text = "Please Scan Your Student Card")
l.config(font =("Courier", 14))
l.pack()

textBox = Text(root)
textBox = Entry(show="*", width = 8)
textBox.focus()
textBox.pack()

def func(event):

    student_id = textBox.get()
    result = get_student_by_id(student_id=student_id, collection=student_ids_col)

    if (result != False):
        check_in(result, check_in_col)
        l = Label(root, text = "Hello %s, you are checked in!" % result["student_name"])
        l.config(font =("Courier", 14))
        l.pack()
        
    else:
        l = Label(root, text = "Error: Unregistered User")
        l.config(font =("Courier", 14))
        l.pack()

root.bind('<Return>', func)


root.mainloop()