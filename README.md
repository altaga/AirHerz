# AirHerz

Analisis de HR de los aempleados para aumentar la productividad.


# Solution and What it does

Desarrollamos un bloque de Air table el cual es capaz de ver y analizar en tiempo real el HR de los empleados y con esto poder analizar si el empleado nececita tomarse un momento para despejarse.

https://i.ibb.co/P16tMBg/image.png

Cuando el empleado empieza a sufrir de ansiedad y ha estado mucho tiempo inactivo el sistema le arrojara una notificacion de que necesita una descanso.

https://i.ibb.co/Mkf6KGN/image.png

A su vez tenemos un bloque que funciona como widget y como aplicacion, ya que si solo tenemos de lado el widget podemos ver que aparece unicamente nuestros pasos y nuestro hr, sin embargo si ampliamos la pantalla, podremos ver de forma amplia nuestro HR del dia y nuestros promedios, todo esto en tiempo real.

https://i.ibb.co/ct1PQfT/image.png

El hardware utilizado para realizar el sistema fue el siguiente:

- RaspberryPiZero w.
- MiBand 3.

https://i.ibb.co/HFvqh8W/20200630-130329.jpg

Aqui podemos ver como la terminal de la RPi Zero W esta mandando los datos del HR a la pagina mediante el broker Cloud MQTT.

https://i.ibb.co/tYgWZPD/image.png

# How we built it

Esquema de conexion:

https://i.ibb.co/KW9XxW4/Esquema.png

Primero se configuro la RPi para ser un Gateway BLE para el reloj, la configuracion de la raspberry se realizo asi:



