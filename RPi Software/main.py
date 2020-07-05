import paho.mqtt.client as paho
import time
import ssl
import sys
from auth import MiBand3
from constants import ALERT_TYPES
import os
import json
import argparse
import datetime as dt
import requests

# Change this value for your CloudMQTT settings
EndPoint = "YOUR_ENDPOINT"
MyPort = #####
MyUser= "YOUR_USERNAME"
MyPassword = "YOUR_PASSWORD"
# Parse MAC

parser = argparse.ArgumentParser()
parser.add_argument("echo")
args = parser.parse_args()

# Vars

hr=""
mqttc =""

def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc) )
    #client.subscribe("#" , 1 ) # Wild Card

# This function trigger every time we receive a message from the platform
def on_message(client, userdata, msg):
    band.send_custom_alert(3,str(msg.payload.decode()))
    print("topic: "+msg.topic)
    print("payload: "+str(msg.payload))
    
# This function trigger when we publish  
def on_publish(client, obj, mid):
    print("Data Sent")

def l(x):
    global hr
    global mqttc
    hr=str(x)
    myd=band.get_steps()
    steps=str(myd['steps'])
    meters=str(myd['meters'])
    if(int(hr)>70):
        temp = {
        "Device":"Device 1",
        "hr": hr,
        "step":steps,
        "meter": meters,
        "rec":"You worked hard, take a five minute walk break."
        }
        mqttc.publish("test",json.dumps(temp))
        print(temp)
    else:
        temp = {
        "Device":"Device 1",
        "hr": hr,
        "step":steps,
        "meter": meters,
        "rec":""
        }
        mqttc.publish("test",json.dumps(temp))
        print(temp)
    
    
def heart_beat():
    band.start_raw_data_realtime(heart_measure_callback=l)
    
# This function trigger when we subscribe to a new topic  
def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

MAC_ADDR = args.echo
mqttc = 0
band = 0
inside =0

while 1:
    try:
        print('Attempting to connect to ', MAC_ADDR)
        band = MiBand3(MAC_ADDR, debug=True)
        band.setSecurityLevel(level = "medium")

        # Authenticate the MiBand
        if len(sys.argv) > 2:
            if band.initialize():
                print("Initialized...")
            band.disconnect()
            sys.exit(0)
        else:
            band.authenticate()

        print("Bt: OK")
        # We prepare all callback functions and credentials.
        mqttc = paho.Client()
        mqttc.username_pw_set(MyUser, MyPassword)
        mqttc.on_connect = on_connect
        mqttc.on_message = on_message
        mqttc.on_publish = on_publish
        mqttc.on_subscribe = on_subscribe
        mqttc.connect(EndPoint, MyPort, keepalive=60)
        rc = 0
        print("Mqtt :Ok")
        once=1
        while rc == 0:
            rc = mqttc.loop()
            while(once):
                heart_beat()
                once=0
        print("rc: " + str(rc))

    except KeyboardInterrupt:
        exit()
        print(" ")
        print("Mqtt Disconnect")
        print("Band Disconnect")
        break

    except:
        exit()
        print("Mqtt Reconnect")
        print("Band Reconnect")
        if(inside):
            mqttc.disconnect()
