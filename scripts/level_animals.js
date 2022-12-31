$(document).ready(function () {
  actualLevel("animals");
  setInterval(() => {
    actualLevel("animals");
  }, 3000);

  $("#slnko").css({
    visibility: "visible",
  });
  var sun = $("#slnko");
  var up = "-=10";
  var left = "+=10";
  var deg = 0;
  
  for ( i = 0; i < 35; i++) {
    sun.animate({ top: up, left: left }, 25);
  }
  setTimeout(() => {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka'>"
    );
    $("#ovecka").animate({ left: "+=60%" }, 2000);
  }, 1000);

  setTimeout(() => {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka1'>"
    );
    $("#ovecka1").animate({ left: "+=50%" }, 2000);
    say(
      "Vitaj na mojej farme. Toto sú moje ovečky a teraz s nimi pôjdeme na pašu."
    );
  }, 2000);
  setTimeout(() => {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka2'>"
    );
    $("#ovecka2").animate({ left: "+=40%" }, 2000);
  }, 3000);
  setTimeout(() => {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka3'>"
    );
    $("#ovecka3").animate({ left: "+=30%" }, 2000);
  }, 4000);
  setTimeout(() => {
    $("#stodola_div").append(
      "<img src='../img/ovecka.png' class='ovecka' id='ovecka4'>"
    );
    $("#ovecka4").animate({ left: "+=20%" }, 2000);
  }, 5000);

  setTimeout(() => {
    next("animals_2");
  }, 10000);
  setInterval(() => {
    sun.css({
      "-moz-transform": "rotate(" + deg + "deg)",
      "-webkit-transform": "rotate(" + deg + "deg)",
      "-ms-transform": "rotate(" + deg + "deg)",
      transform: "rotate(" + deg + "deg)",
    });
    deg += 10;
    if (deg == 360) {
      deg = 0;
    }
  }, 100);
});

function next(text) {
  if (mqttClient.isConnected()) {
    console.log("continue level:" + text);
    var content = JSON.stringify({ loadLevel: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/level/2";
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

function say(text) {
  if (mqttClient.isConnected()) {
    console.log("saying: " + text);
    var content = JSON.stringify({ say: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/audio";
    mqttClient.send(message);
  }
}
