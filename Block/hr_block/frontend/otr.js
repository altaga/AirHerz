import React from "react";

var mqtt    = require('mqtt');
var options = {
  protocol: 'mqtts',
  username:"orywwdxe",
  password:"F_au7x0miB49",
	clientId: 'b0908853' 	
};
var client  = mqtt.connect('mqtt://tailor.cloudmqtt.com:28582', options);

// preciouschicken.com is the MQTT topic
client.subscribe('preciouschicken.com');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div>Hello World!</div>
}
}

export default App;
