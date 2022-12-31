$(document).ready(function () {
  setTimeout(() => {
    $("#modal").css({
      visibility: "visible",
    });
    $("#bocny_modal").css({
      visibility: "visible",
    });
    $("#modal").append(
      "<span id='text'>Pomôž Ole s varením tým, že sa najdeš predmet, ktorý má použiť a postavíš sa k obrazovke s ním.</span>"
    );

    guess();
  }, 3000);

  setInterval(() => {
    actualLevel("kitchen");
  }, 3500);
});

function guess() {
  if (mqttClient.isConnected()) {
    console.log("starting level");
    var content = JSON.stringify({ start: "true" });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/kitchen";
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
