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
var actual_level = "start";
var expectedword = "";
var x = 0;
var y = 0;
var map = "experiments/mapPositions/xx123yy/0";
var run = true;
function onConnect() {
  console.log("onConnect");
  mqttClient.subscribe("OlasFarm/level");
  mqttClient.subscribe("OlasFarm/level/2");
  mqttClient.subscribe("OlasFarm/obrazovky");
  mqttClient.subscribe("OlasFarm/wool");
  mqttClient.subscribe("OlasFarm/kitchen");
  mqttClient.subscribe("experiments/mapPositions/xx123yy/0");
  mqttClient.subscribe("OlasFarm/actualLevel");
  mqttClient.subscribe("OlasFarm/start");
  mqttClient.subscribe("openlab/mapPositions/+");
  map = "openlab/mapPositions/9";
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
  if (message.destinationName == "OlasFarm/obrazovky") {
    var text = JSON.parse(message.payloadString);
    if (text.start == "true") {
      spusti();
    }
    if (text.end == "true") {
      koniec();
    }
  }
  if (message.destinationName == "OlasFarm/level") {
    var text = JSON.parse(message.payloadString);

    if (actual_level == "start") {
      window.open("./" + text.loadLevel + "/level1_5.html", "_self");
    } else {
      window.open("../" + text.loadLevel + "/level1_5.html", "_self");
    }
  }
  if (message.destinationName == "OlasFarm/level/2") {
    var text = JSON.parse(message.payloadString);
    if (text.loadLevel == "animals_2") {
      animals_level2();
    }
  }
  if (message.destinationName == "OlasFarm/start") {
    var text = JSON.parse(message.payloadString);
    if (text.main_menu == "true") {
      show_start();
    }
  }
  if (message.destinationName == "OlasFarm/actualLevel") {
    var text = JSON.parse(message.payloadString);
    actual_level = text.actualLevel;
  }
  if (message.destinationName == "OlasFarm/kitchen") {
    var text = JSON.parse(message.payloadString);
    expectedword = text.word;
  }
  if (message.destinationName == "OlasFarm/wool") {
    var text = JSON.parse(message.payloadString);
    expectedword = text.word;
  }
  if (message.destinationName == map) {
    var text = JSON.parse(message.payloadString);
    var inFrontOfScreen=true;
    if (text.positions != null) {
      messageb = [];
      messageb = text.positions;
      for (var i = 0; i < messageb.length; i++) {
        x = messageb[i][0];
        y = messageb[i][1];
        if (x > 510 && x < 540) {
          if (y > 420 && y < 460) {
          inFrontOfScreen=true;
        }
      }
    }
    if (inFrontOfScreen) {
      setTimeout(() => {
        control();
      }, 5000);
    }
  }
  }
}

function control() {
  for (var i = 0; i < messageb.length; i++) {
    x = messageb[i][0];
    y = messageb[i][1];
    console.log("x: " + x + "; y: " + y);
    if (x > 510 && x < 540) {
      if (y > 420 && y < 460) {
        switch (actual_level) {
          case "start":
            if(run){
          setLevel("animals");
          run=false;
            }
          break;
          case "animals":
            sheep_found();
            break;
          case "kitchen":
            if (expectedword == "Jahody") {
              guessed_kitchen("Jahody");
            } else if (expectedword == "Pohar") {
              guessed_kitchen("Pohar");
            }
            break;
        }
      }
    }
  }
}
var sheep = false;
function animals_level2() {
  console.log("continue");
  if (!sheep) {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka' >"
    );
    $("#ovecka").css({
      top: "60%",
      left: "20%",
    });
    sheep = true;
  }
  
}

function sheep_found() {
  if (mqttClient.isConnected() && sheep) {
    console.log("najdena ovecka");
    var content = JSON.stringify({ najdenaOvecka: 1 });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level/2";
    mqttClient.send(message);
    sheep = false;
  }
  $("#ovecka").css({
    visibility: "hidden",
  });
}

function setLevel(text) {
  if (mqttClient.isConnected()) {
    console.log("loading level:" + text);
    var content = JSON.stringify({ loadLevel: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level";
    mqttClient.send(message);
  }
}

function guessed_kitchen(text) {
  if (mqttClient.isConnected()) {
    say("Správne");
    var content = JSON.stringify({ najdene: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/kitchen";
    mqttClient.send(message)
  }
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

function show_start() {
  window.open("../start_5.html", "_self");
}
