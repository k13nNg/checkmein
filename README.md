# Overview

The Design Lab at Appleby College is a makerspace equipped with multiple state-of-the-art equipments, such as 3D printers, CNC machines, IoT programming devices, … The lab’s purpose is to offer students the best resources and assistance on their journey to explore the world of Engineering and Technology.

During the school year, the Design Lab is not only used as a classroom for several classes, but also as a makerspace that is accessible by students and faculty members in the Appleby College community. Hence, keeping track of attendance record of individual students and the lab equipment usage is a tedious and challenging task for the lab technologist, who also happens to be a teacher at the school.

In the effort of making this task easier, ***checkmein*** was developed with the sole purpose of automating the the attendance-taking process, as well as providing valuable insights on the lab usage and possible areas that could be improved/ optimized.

# The design
<img width="737" alt="checkmein_diagram" src="https://github.com/k13nNg/checkmein/assets/75595156/2680ec7a-e6ac-400a-ae94-da3341db747a">

# Equipments used
- Raspberry Pi 4B
- A RFID scanner
- A secured Local Area Network (LAN) set up, where only authorized users and applications can access
- An external display for the Raspberry Pi
- A host computer

# How to set up and use checkmein
************************************Raspberry Pi:************************************

1. Download the `checkmein` project file from the GitHub repository and navigate to the `raspberry_pi` folder
2. Connect the Raspberry Pi to an external display and the RFID scanner
3. Use `pip install` to install the following packages
    - pymongo
    - bcrypt
    - dotenv
4. Run the `checkin_GUI.py` file for a Graphic User Interface of the program to prompt users to scan their card and checkin.

***************************Optional:*************************** Refer to [this guide](https://raspberrytips.com/autostart-a-program-on-boot/) to autostart `checkin_GUI.py` when Raspberry Pi is connected to the power and booted up. 

***************Note:*************** If you use the guide to autostart `checkin_GUI.py` on Raspberry Pi, make sure you have installed the packages in ******Step 3****** globally, that is, make sure these packages are installed so that the device do not need to run bashrc to validate them. One way to do this is to boot up Python using the Terminal interface and use `pip install` to install these packages.

****Web Application:****

1. Install Node.js, React, Express.js and MongoDB on your host computer
2. Refer to [this guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) to install MongoDB Community version and how to start it
3. In MongoDB Compass, connect to your local computer using the URI `mongodb://localhost:27107/`, then create a new database - named *********checkmein.********* Then proceed to create 2 new collections: ***student_check_in_time*** and ******student_ids.****** 
4. Start the MongoDB Community server locally on your host computer
5. Download the `checkmein` project file from the GitHub repository and navigate to the `webapp` folder
6. Run `npm install` to install all of the necessary dependencies
7. Use `npm install` to install these dependencies just in case ******Step 4****** skipped them
    - brcypt
    - dotenv
    
    **********Note:********** If you are using a Windows device, please install **bcrypt** instead of **bcryptjs**
    
8. In the root folder (`checkmein/`), create a new environment file, named `.env` (Make sure the file is named exactly as stated).
9. Copy the following lines into your `.env` file, with the appropriate changes as stated below
    - REACT_APP_LOCAL_IP: Your local network IP, starting with 192
    - CHECKMEIN_COL_NAME: checkmein
    - REACT_APP_PORT: The desired port to run your React application backend

  ```python
  REACT_APP_LOCAL_IP = # Your local IP address
  CHECKMEIN_COL_NAME = # checkmein
  REACT_APP_PORT = # The port that you want your backend to use
  ```

10. Make sure you are in the `checkmein/webapp` directory, then run the command `npm start` to start the app
