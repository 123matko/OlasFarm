$(document).ready(function () {
  setTimeout(() => {
    $("#modal").css({
      visibility: "visible",
    });
    $("#bocny_modal").css({
      visibility: "visible",
    });
    $("#modal").append(
      "<span id='text'>Chcela som ti uštrikovať sveter, ale včera večer mi niekto poskrýval pomôcky po celej stodole.<br>Nechal mi však odkazy v hádankách pomôž mi ich rozlúštiť a nájsť pomôcky na uštrikovanie svetra.</span>"
      );
      say("Škriatok skryl moje veci po stodole pomôž mi ich nájsť.");
  }, 3000);

  setTimeout(() => {
    document.getElementById("text").innerHTML =
      "<span id='text'>Odpovede na hádanky sú miesta kde sú moje veci ukryté. Tie miesta nájdi na bočných obrazovkách a prístúp k nim.</span>";
      
    guess();
  }, 7000);

  setInterval(() => {
    actualLevel("wool");
  }, 5000);
});

function guess() {
  if (mqttClient.isConnected()) {
    console.log("starting level");
    var content = JSON.stringify({ start: "true" });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/wool";
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
