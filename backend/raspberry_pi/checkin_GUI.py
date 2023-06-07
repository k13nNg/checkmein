from tkinter import *
from database_funcs import *


db = get_database()

student_ids_col = db["student_ids"]
check_in_col = db["student_check_in_time"]


root = Tk()
root.geometry("800x600")

logo = Label(root, text = "checkmein", font = ("Arial Rounded MT Bold", 24, "bold"), pady=50)
logo.pack()

prompt = Label(root, text = "Please Scan Your Student Card\n", pady=50)
prompt.config(font =("Courier", 14))
prompt.pack()

textBox = Text(root)
textBox = Entry(show="*", width = 8)
textBox.focus()
textBox.pack()

l = Label(root, text = "", pady=50)
l.config(font =("Courier", 14))

def clear_label(l):
    prompt["text"] = "Please Scan Your Student Card\n"
    l["text"] = ""

def func(event):

    prompt["text"] = "\n"

    student_id = textBox.get()
    result = get_student_by_id(student_id=student_id, collection=student_ids_col)

    if (result != False):
        check_in(result, check_in_col)
        l["text"] = "\nHello %s, you are checked in!" % result["student_name"]
        l.pack()

    else:
        l["text"] = "\nError: Unregistered User"
        l.pack()

    textBox.delete(0, END)
    root.after(2000, clear_label, l)
    l.pack()


root.bind('<Return>', func)

root.mainloop()