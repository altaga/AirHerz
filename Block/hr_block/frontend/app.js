import React, { useState, Fragment } from 'react';
import { Box, Text } from "@airtable/blocks/ui";
import LineGraph from "./line.js"
// reactstrap components
import {
  Row,
  Col,
  Container
} from "reactstrap";

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

function getAvgOfArray(numArray) {
  var total = 0;
  for (var j = 0; j < numArray.length; j++) {
    total += parseInt(numArray[j]);
  }
  return Math.round(total / numArray.length);
}



var mqtt = require('mqtt');
var options = {
  protocol: 'mqtts',
  clientId: makeid(5),
  keepalive: 60,
  reconnectPeriod: 1000
};
var client = mqtt.connect('wss://test.mosquitto.org:8081', options);

const topic = makeid(20)

client.subscribe(topic);

var i = 0

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hr: "NA",
      steps: "NA",
      meters: "NA",
      mess: "None",
      x: window.innerWidth - 20,
      y: window.innerHeight - 20,
      avg: "NA",
      max: "NA",
      min: "NA",
      data: [],
      series: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      alert(topic)
    }, 100);

  }

  componentWillMount() {

    setInterval(() => {
      this.setState(
        {
          x: window.innerWidth - 20,
          y: window.innerHeight - 20
        }
      )
    }, 100);

    let _this = this
    client.on('message', function (topic, message) {
      var note = JSON.parse(message.toString());
      var indata = _this.state.data
      var inserie = _this.state.series
      indata.push(note['hr'])
      inserie.push(i++)
      _this.setState(
        {
          data: indata,
          series: inserie
        }
      )

      // Updates React state with message 
      _this.setState({
        avg: getAvgOfArray(indata),
        max: getMaxOfArray(indata),
        min: getMinOfArray(indata),
        hr: note['hr'],
        steps: note['step'],
        meters: note['meter'],
        mess: note["rec"]
      })
    });
  }

  render() {

    if (this.state.x < 600) {
      return (
        <div className="App">
          <Row style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box display="flex" alignItems="center" justifyContent="center" border="thick" backgroundColor="#2bb6ff" borderRadius="large" padding={0} width={this.state.x} height={this.state.y} overflow="hidden">
              <Row md="2">
                <Col xs="12" style={{ paddingLeft: "0px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x - 30} height={this.state.y / 2 - 20} overflow="hidden">
                    <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x / 2} height={this.state.y / 2} overflow="hidden" marginRight="10px">
                      <Text style={{ fontFamily: "verdana", fontSize: "10px", color: "white", lineHeight: "32px", paddingRight: "10px" }}><h1>HR: {this.state.hr} BPM </h1> </Text>
                    </Box>
                    <Box display="flex" alignItems="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x / 2} height={this.state.y / 2} overflow="hidden">
                      <Row>
                        <Col>
                          <Text style={{ fontFamily: "verdana", fontSize: "10px", color: "white", lineHeight: "32px", paddingLeft: "10px" }}><h1>Steps: {this.state.steps}</h1> </Text>
                        </Col>
                        <Col>
                          <Text style={{ fontFamily: "verdana", fontSize: "10px", color: "white", lineHeight: "32px", paddingLeft: "10px" }}><h1>Meters: {this.state.meters}</h1> </Text>
                        </Col>
                      </Row>
                    </Box>
                  </Box>
                </Col>
                <Col xs="12" style={{ paddingLeft: "0px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" marginTop="15px" padding={0} width={this.state.x - 30} height={this.state.y / 2 - 20} overflow="hidden">
                    <Row>
                      <Col>
                        <Text style={{ fontFamily: "verdana", fontSize: "10px", color: "white", lineHeight: "32px", paddingLeft: "30px" }}><h1>Recommendation:</h1></Text>
                      </Col>
                      <Col>
                        <Text style={{ fontFamily: "verdana", fontSize: "10px", color: "white", lineHeight: "32px", paddingLeft: "30px" }}><h1>{this.state.mess}</h1></Text>
                      </Col>
                    </Row>
                  </Box>
                </Col>
              </Row>
            </Box>
          </Row>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Row style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box display="flex" alignItems="center" border="thick" backgroundColor="#2bb6ff" borderRadius="large" padding={0} width={this.state.x} height={this.state.y} overflow="hidden">
              <Row md="2">
                <Col xs="12" style={{ paddingLeft: "10px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x / 2 - 30} height={this.state.y / 2 - 20} overflow="hidden">
                    <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x / 4} height={this.state.y / 4} overflow="hidden" marginRight="10px">
                      <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "22px", paddingRight: "20px" }}><h1>HR: {this.state.hr} BPM </h1> </Text>
                    </Box>
                    <Box display="flex" alignItems="center" backgroundColor="#000" borderRadius="large" padding={0} width={this.state.x / 4} height={this.state.y / 4} overflow="hidden">
                      <Row>
                        <Col>
                          <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px", paddingLeft: "20px" }}><h1>Steps: {this.state.steps}</h1> </Text>
                        </Col>
                        <Col>
                          <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px", paddingLeft: "20px" }}><h1>Meters: {this.state.meters}</h1> </Text>
                        </Col>
                      </Row>
                    </Box>
                  </Box>
                </Col>
                <Col xs="12" style={{ paddingLeft: "10px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" marginTop="15px" padding={0} width={this.state.x / 2 - 30} height={this.state.y / 2 - 20} overflow="hidden">
                    <Row>
                      <Col>
                        <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px", paddingLeft: "30px" }}><h1>Recommendation:</h1></Text>
                      </Col>
                      <Col>
                        <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px", paddingLeft: "30px" }}><h1>{this.state.mess}</h1></Text>
                      </Col>
                    </Row>
                  </Box>
                </Col>
              </Row>
              <Row md="2">
                <Col xs="12" style={{ paddingLeft: "10px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="#000" borderRadius="large" marginTop="0px" marginBottom="15px" padding={0} width={this.state.x / 2} height={this.state.y / 3 - 25} overflow="hidden">
                    <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px", paddingLeft: "10px" }}><h1>AVG HR today &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.avg} </h1></Text>
                    <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px" }}><h1>Max HR today &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.max} </h1></Text>
                    <Text style={{ fontFamily: "verdana", color: "white", fontSize: "14px", lineHeight: "32px" }}><h1>Min HR today &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.min} </h1></Text>
                  </Box>
                </Col>
                <Col xs="12" style={{ paddingLeft: "10px" }}>
                  <Box display="flex" alignItems="center" justifyContent="center" backgroundColor="white" borderRadius="large" paddingTop="20px" padding={0} width={this.state.x / 2} height={this.state.y / 1.46 - 25} overflow="hidden">
                    <LineGraph data={[this.state.data, this.state.series]} />
                  </Box>
                </Col>
              </Row>
            </Box>
          </Row>
        </div>
      )
    }
  }
}

export default App;
