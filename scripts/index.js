var clientId = "example_clientID_" + new Date().getTime();
var mqttClient = new Paho.MQTT.Client(
  "openlab.kpi.fei.tuke.sk",
  80,
  "/mqtt",
  clientId
);
mqttClient.onConnectionLost = onConnectionLost;
mqttClient.onMessageArrived = onMessageArrived;
mqttClient.connect({ onSuccess: onConnect });

function onConnect() {
  console.log("onConnect");
  mqttClient.subscribe("OlasFarm/+");
  //mqttClient.subscribe("openlab/screen/1/url");
  mqttClient.subscribe("openlab/mapPositions/+");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log(
    "onMessageArrived for topic '" +
      message.destinationName +
      "': " +
      message.payloadString
  );
}

function say(text) {
  if (mqttClient.isConnected()) {
    console.log("saying: " + text);
    var content = JSON.stringify({ say: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/audio";
    mqttClient.send(message);
  }
}
function actualLevel(text) {
  if (mqttClient.isConnected()) {
    console.log("actual level:" + text);
    var content = JSON.stringify({ actualLevel: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/actualLevel";
    mqttClient.send(message);
  }
}
function setLevel(text) {
  if (mqttClient.isConnected()) {
    console.log("loading campaign:" + text);
    var content = JSON.stringify({ loadLevel: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level";
    mqttClient.send(message);
  }
}
function next(text) {
  if (mqttClient.isConnected()) {
    console.log("continue level:" + text);
    var content = JSON.stringify({ loadLevel: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level/2";
    mqttClient.send(message);
  }
}
function level1() {
  if (mqttClient.isConnected()) {
    console.log("začíname");
    var content = JSON.stringify({ loadLevel: "true" });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level/1";
    mqttClient.send(message);
  }
}


function end() {
  if (mqttClient.isConnected()) {
    console.log("Closing");

    var content = JSON.stringify({
      "all": "00000000",
      "duration": 1000
    });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/lights";
    mqttClient.send(message);
    var web1 = "http://ukazky.kpi.fei.tuke.sk:8080/map.html";

    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/0/url";
    mqttClient.send(message);

    var web1 = "http://ukazky.kpi.fei.tuke.sk:8080/liveit.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/11/url";
    mqttClient.send(message);
    message.destinationName = "openlab/screen/12/url";
    mqttClient.send(message);
    message.destinationName = "openlab/screen/13/url";
    mqttClient.send(message);
    message.destinationName = "openlab/screen/14/url";
    mqttClient.send(message);
    message.destinationName = "openlab/screen/15/url";
    mqttClient.send(message);
    
  }
  
}

function start() {
  if (mqttClient.isConnected()) {
    console.log("Starting");
   
    var content = JSON.stringify({
      "all": "000000dd",
      "duration": 1000
    });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/lights";
    mqttClient.send(message);
    
    console.log("Starting game");
    var web1 = "http://olasfarm.studenthosting.sk/start.html";
    message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/0/url";
    mqttClient.send(message);
  
  
    var web1 = "http://olasfarm.studenthosting.sk/start_1.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/11/url";
    mqttClient.send(message);
  
    var web1 = "http://olasfarm.studenthosting.sk/start_2.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/12/url";
    mqttClient.send(message);
 
    var web1 = "http://olasfarm.studenthosting.sk/start_3.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/13/url";
    mqttClient.send(message);
  
    var web1 = "http://olasfarm.studenthosting.sk/start_4.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/14/url";
    mqttClient.send(message);
  
    var web1 = "http://olasfarm.studenthosting.sk/start_5.html";
    var message = new Paho.MQTT.Message(web1);
    message.destinationName = "openlab/screen/15/url";
    mqttClient.send(message);
    level1();
  }
}
