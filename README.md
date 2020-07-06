# AirHerz

Analisis de HR de los aempleados para aumentar la productividad.

<img src="https://i.ibb.co/T0VDWHn/My-Post-1.png" width="1000">

# Solution and What it does

We developed an Air table block which is able to see and analyze the HR of the employees in real time and with this we can analyze if the employee needs to take a moment to clear himself, stop working or other use cases. When the employee begins to suffer from anxiety and has been inactive for a long time, the system will send him a notification that he needs a break.

<img src="https://i.ibb.co/MMZSb2R/image.png">

At the same time we have a block that works as a widget and as an application, if we only have the widget on our side we can see that only our steps and our hr appear, however if we enlarge the screen, we can see our HR of the day in a broad way and our averages. All of this in real time.

<img src="https://i.ibb.co/FgChfv9/image.png">

The Hardware used was:

- RaspberryPiZero w.
- MiBand 3.

<img src="https://i.ibb.co/HFvqh8W/20200630-130329.jpg">

Here we can see how the RPi Zero W terminal is sending the HR data to the page through the Cloud MQTT broker.

<img src="https://i.ibb.co/tYgWZPD/image.png">

# How we built it

Connection diagram:

<img src="https://i.ibb.co/KW9XxW4/Esquema.png">

## CloudMQTT Setup:

First we create an account in CloudMQTT with a free plan:

https://customer.cloudmqtt.com/signup

With this we will access the credentials that we will use both in the Airtable block and in the raspberry.

<img src="https://i.ibb.co/TwGdT98/image.png">

We then save the Server, User, Password and Port credentials.

## RPi Setup:

First the RPi was configured to be a BLE Gateway for the clock, the configuration of the raspberry was done like this:

Download the operating system of the Raspberry Pi.

- To download the operating system of the Raspberry enter the following link:
- Link: https://www.raspberrypi.org/downloads/raspbian/
- Download the lastest version.

Flash the operating system in the SD.

Software: https://www.balena.io/etcher/

- Through Etcher flash the raspberry operating system but DO NOT put it inside the raspberry yet.

Create a wpa_supplicant for the connection of the raspberry to the internet.

- Since you have flashed the operating system, copy and paste the files from the "RPi OS Files" folder directly into the SD card.
- Then open the "wpa_supplicant.conf" file with a text editor
- In between the quotes in the ssid line write your wifi network and in psk the network key.

        country = us
        update_config = 1
        ctrl_interface =/var/run/wpa_supplicant

        network =
        {
        scan_ssid = 1
        ssid = "yourwifi"
        psk = "yourpassword"
        }


- We save the changes and remove the SD from the PC.

We then place the SD in the raspberry and connect it to its power source.

- The power source of a Raspberry Pi is recommended to be from 5 volts to 2.5A minimum. We recommend the official ower supply for the Raspberry pi.

Once the Raspberry has already started, we need to access it through SSH or with a keyboard and a monitor.

- If you want to access it through SSH we need your IP.
- In order to analyze your network and obtain the number we will have to use one of the following programs.
- Advanced IP Scanner (Windows) or Angry IP Scanner program (Windows, Mac and Linux).
- In the following image you can see how we got the Raspberry IP.

<img src="https://i.ibb.co/q9BM6dP/image.png"> 

Connect the raspberry with ssh.

- To connect using ssh to the raspberry we need the Putty program.
- Link: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
- This program will let us access the command console of the raspberry.
- In Linux, just open the terminal and put the following command.

        ssh pi@RASPBERRYIP

<img src="https://i.ibb.co/PxP86Xz/terminal.png">

- Password: “raspberry”

<img src="https://i.ibb.co/QpWj18S/image.png">

First, we will install the necessary libraries for our program to work.

- For it to work we just have to input the following command.

      sudo apt-get update
      sudo apt-get install python3-pip libglib2.0-dev libatlas-base-dev git -y
      sudo pip3 install bluepy Crypto crc16 paho-mqtt

- Download the folder with our program

       git clone https://github.com/altaga/AirHerz

- We will have to configure the CloudMQTT Platform credentials in our main.py program, so we open the editor of the Rpi Zero with the following command.

      sudo nano main.py

- Change the following value ​​for yours at the beginning of the code:

        EndPoint = "YOUR_ENDPOINT"
        MyPort = #####
        MyUser= "YOUR_USERNAME"
        MyPassword = "YOUR_PASSWORD"

- To save the changes in the editor press the command "ctrl + o", Enter and then "ctrl + x", enter

With this preparation, the last thing we need to do is obtain the MAC-Address of our MiBand3, we will obtain this by executing the following command on the RaspberryPi.

      sudo hcitool lescan

<img src="https://i.ibb.co/1MfbWmZ/image.png" width="1000">

- To activate the code, execute the following command:

      sudo python3 main.py YOURMAC

- If everything works correctly you will see the following:

<img src="https://i.ibb.co/84bmFBs/Succesful.png" width="1000">

## Block Setup:

NOTE: I recommend doing this exercise before starting to configure your block since they explain the initial configuration, installation of dependencies, etc.

https://airtable.com/developers/blocks/guides/hello-world-tutorial

To perform the installation and testing of the block, we first have to go to the folder "Block\hr_block\frontend", inside the file "app.js" we are going to configure the CloudMQTT credentials.

<img src="https://i.ibb.co/2MPPLPB/image.png" width="1000">

Now we will have to install the dependencies so that the block can run with NodeJS, inside the folder "Block\hr_block" we open the CMD console or in the case of Mac OS or Linux the Terminal and put the following command.

    npm install

At the end of the process we will see a screen like this, indicating that everything was installed correctly.

<img src="https://i.ibb.co/3SSMBVp/image.png" width="1000">

To execute the block and see its operation in Airtable, we will place the following command.

    block run

If everything works correctly we will see the following window.

<img src="https://i.ibb.co/yR8YFRv/image.png" width="1000">

Inside the Airtable platform to make the block work we will put the following.

<img src="https://i.ibb.co/hVBPHZD/image.png" width="1000">

Once everything is correctly configured we will see the following.

<img src="https://i.ibb.co/NN2xR8Z/image.png" width="1000">

Now if we run the entire system we will see how the employee's HR begins to appear on the screen. The block is responsive, so you can adjust the size to your liking or screen size.

<img src="https://i.ibb.co/MMZSb2R/image.png">

And if expand the block we will see the monitor with the data in real time of the worker.

<img src="https://i.ibb.co/FgChfv9/image.png">

Here is a video of how the solution works in real time, recorded with the OBS without cuts, if the judges require a demo in real time we can easily schedule a video call.

https://youtu.be/Zjk_lzNLe54

# DEMO:

https://youtu.be/IGo9C7FaP9Y

https://airtable.com/invite/l?inviteId=inv2709vKk2l2zxkw&inviteToken=2b54fbf400e74450ab0068d1d723ae3dcef4504958673709cf95ef02eef6de0b

# Test the block:

If you don't have the hardware available, you can still test the block as follows.

IMPORTANT NOTE: For a production block it is necessary to use a private MQTT broker due to the sensitive data that can pass through it and above all to use secure protocols such as MQTT-TSL. In addition, the topic changes randomly each time you open the block in order to avoid duplication of topics in the broker and that we always have a unique topic.

1.- Open an MQTT Websocket and place the following credentials, in our case we will use a public one like the one below.

http://www.hivemq.com/demos/websocket-client/

<img src="https://i.ibb.co/StB7S1J/image.png">

      Host:test.mosquitto.org
      Port:8081
      ClientID:ANY_RANDOM_STRING

<img src="https://i.ibb.co/qRtzY9v/image.png">

      Topic:YOUR_BLOCK_TOPIC
      Message:{"Device":"Device 1","hr": 80,"step":900,"meter": 1024,"rec":"ANY MESSAGE"}

If everything works correctly you can see the data entered in the HR Monitor.

<img src="https://i.ibb.co/F5LN1s0/image.png">

Here a real time demo without Hardware:

https://youtu.be/HXszdwnjgqg

# APENDIX:

I attach all the licenses of the libraries used to develop the block as required by the Airtable rules.

ChartJS.
https://github.com/chartjs/Chart.js/blob/master/LICENSE.md

ReactChartJS.
https://github.com/jerairrest/react-chartjs-2/blob/master/LICENSE.md

MQTT.js.
https://github.com/mqttjs/MQTT.js/blob/master/LICENSE.md

Babel.
https://github.com/babel/babel/blob/master/LICENSE

Reactstrap.
https://github.com/reactstrap/reactstrap/blob/master/LICENSE






