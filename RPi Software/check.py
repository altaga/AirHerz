import paho.mqtt.client as mqtt
import os, urlparse

EndPoint = "a1nic3lezioefw-ats.iot.us-east-1.amazonaws.com"
caPath = "Certs/aws-iot-rootCA.crt"
certPath = "Certs/Covital-IoT.cert.pem"
keyPath = "Certs/Covital-IoT.private.key"

# Define event callbacks
def on_connect(client, userdata, flags, rc):
    print("rc: " + str(rc))

def on_message(client, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

def on_publish(client, obj, mid):
    print("mid: " + str(mid))

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(client, obj, level, string):
    print(string)

mqttc = mqtt.Client()


# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)
mqttc.connect(EndPoint, 8883, keepalive=60)

# Start subscribe, with QoS level 0
mqttc.subscribe("/DataIn", 0)

# Publish a message
mqttc.publish("/DataOut", "my message")

# Continue the network loop, exit when an error occurs
rc = 0
while rc == 0:
    rc = mqttc.loop()
print("rc: " + str(rc))