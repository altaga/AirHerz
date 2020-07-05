# AirHerz

Analisis de HR de los aempleados para aumentar la productividad.


# Solution and What it does

Desarrollamos un bloque de Air table el cual es capaz de ver y analizar en tiempo real el HR de los empleados y con esto poder analizar si el empleado nececita tomarse un momento para despejarse.

<img src="https://i.ibb.co/P16tMBg/image.png">

Cuando el empleado empieza a sufrir de ansiedad y ha estado mucho tiempo inactivo el sistema le arrojara una notificacion de que necesita una descanso.

<img src="https://i.ibb.co/Mkf6KGN/image.png">

A su vez tenemos un bloque que funciona como widget y como aplicacion, ya que si solo tenemos de lado el widget podemos ver que aparece unicamente nuestros pasos y nuestro hr, sin embargo si ampliamos la pantalla, podremos ver de forma amplia nuestro HR del dia y nuestros promedios, todo esto en tiempo real.

<img src="https://i.ibb.co/ct1PQfT/image.png">

El hardware utilizado para realizar el sistema fue el siguiente:

- RaspberryPiZero w.
- MiBand 3.

<img src="https://i.ibb.co/HFvqh8W/20200630-130329.jpg

Aqui podemos ver como la terminal de la RPi Zero W esta mandando los datos del HR a la pagina mediante el broker Cloud MQTT.

<img src="https://i.ibb.co/tYgWZPD/image.png">

# How we built it

Esquema de conexion:

<img src="https://i.ibb.co/KW9XxW4/Esquema.png">

## CloudMQTT Setup:

Primero creamos una cuenta en CloudMQTT en un plan gratuito:

https://customer.cloudmqtt.com/signup

Ya con esto accederemos a las credenciales que usaremos tanto en el bloque de Airtable como en la raspberry.

<img src="https://i.ibb.co/TwGdT98/image.png">

Guardamos las credenciales de Server, User, Password y Port.

## RPi Setup:

Primero se configuro la RPi para ser un Gateway BLE para el reloj, la configuracion de la raspberry se realizo asi:

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
      sudo pip3 install bluepy Crypto crc16 paho-mqtt sklearn numpy

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

NOTA: Recomiendo realizar este ejercicio antes de empezar a configurar su bloque.

https://airtable.com/developers/blocks/guides/hello-world-tutorial

Para realizar la instalacion y prueba del bloque, primero tenemos que ir a la carpeta de "Block\hr_block\frontend", dentro de el archivo "app.js" vamos a configurar las credenciales de CloudMQTT.

<img src="https://i.ibb.co/2MPPLPB/image.png" width="1000">

Ahora tendremos que instalar las dependencias para que el bloque pueda correr con NodeJS, dentro de la carpeta "Block\hr_block" abrimos la consola CMD o en el caso de Mac OS o Linux el Terminal y ponemos el siguiente comando.

    npm install

Al terminar el proceso veremos una pantalla asi, indicando que se instalo todo correctamente.

<img src="https://i.ibb.co/3SSMBVp/image.png" width="1000">

Para ejecutar el bloque y poder ver su funcionamiento en Airtable, colocaremos el siguiente comando.

    block run

Si todo funciona correctamente veremos la siguiente ventana.

<img src="https://i.ibb.co/yR8YFRv/image.png" width="1000">

Dentro de la plataforma de Airtable para hacer funcionar el bloque pondremos lo siguiente.

<img src="https://i.ibb.co/4pjYjHq/image.png" width="1000">

Una vez todo este correctamente configurado veremos lo siguiente.

<img src="https://i.ibb.co/0FCvWv6/image.png" width="1000">

Ahora si hacemos funcionar todo el sistema veremos como el HR del empleado empieza a aparecer en la pantalla.

<img src="https://i.ibb.co/P16tMBg/image.png">

Y si hacemos grande el bloque veremos el monitor con los datos en tiempo real del trabajador.

<img src="https://i.ibb.co/ct1PQfT/image.png">

Aqui un video de como funciona el bloque.



## DEMO:






