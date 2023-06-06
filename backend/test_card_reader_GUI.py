from tkinter import *

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
    print("The entered student id is: ", textBox.get())

root.bind('<Return>', func)

root.mainloop()