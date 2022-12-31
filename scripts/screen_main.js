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

var foundSheeps = 0;
var allSheeps = 5;
var expectedword;
var ind = 0;
var actual_level = "start";
var ihlice = 0,
  meter = 0,
  noznice = 0,
  nite = 0,
  gombiky = 0;
var hrniec = 0,
  tanier = 0,
  chlieb = 0,
  noz = 0,
  denko = 0,
  jahody = 0,
  mixer = 0,
  cukor = 0,
  varecha = 0,
  pohar = 0;

function onConnect() {
  console.log("onConnect");
  mqttClient.subscribe("openlab/screen/1/url");
  mqttClient.subscribe("OlasFarm/kitchen");
  mqttClient.subscribe("OlasFarm/wool");
  mqttClient.subscribe("OlasFarm/actualLevel");
  mqttClient.subscribe("OlasFarm/level");
  mqttClient.subscribe("OlasFarm/level/1");
  mqttClient.subscribe("OlasFarm/level/2");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
var levelset = false;
function onMessageArrived(message) {
  console.log(
    "onMessageArrived for topic '" +
      message.destinationName +
      "': " +
      message.payloadString
  );
  if (message.destinationName == "OlasFarm/level") {
    var text = JSON.parse(message.payloadString);
    if (actual_level != "start" && !levelset) {
      window.open("../" + text.loadLevel + "/level1.html", "_self");
      levelset = true;
    } else {
      window.open("./" + text.loadLevel + "/level1.html", "_self");
    }
  }
  if (message.destinationName == "OlasFarm/actualLevel") {
    var text = JSON.parse(message.payloadString);
    actual_level = text.actualLevel;
  }
  if (message.destinationName == "OlasFarm/level/1") {
    var text = JSON.parse(message.payloadString);
    if (text.loadLevel == "true") {
      start();
    }
  }
  if (message.destinationName == "OlasFarm/level/2") {
    var text = JSON.parse(message.payloadString);
    if (text.najdenaOvecka == "1") {
      sheep_found();
    }
    if (text.loadLevel == "animals_2") {
      animals_level2();
      
    }
  }

  if (message.destinationName == "OlasFarm/kitchen") {
    var text = JSON.parse(message.payloadString);

    if (text.start == "true") {
      guess_kitchen(0);
    }
    expectedword = text.word;
    switch (text.najdene) {
      case "Hrniec":
        document.getElementById("hrniec_img").src = "../img/uhadnute_hrniec.png";
        if (hrniec == 0) {
          guessed();
          hrniec = 1;
        }
        break;
      case "Tanier":
        document.getElementById("tanier_img").src = "../img/uhadnute_tanier.png";
        if (tanier == 0) {
          guessed();
          tanier = 1;
        }

        break;
      case "Chlieb":
        document.getElementById("chlieb_img").src = "../img/uhadnute_chlieb.png";
        if (chlieb == 0) {
          guessed();
          chlieb = 1;
        }
        break;
      case "Denko":
        document.getElementById("denko_img").src = "../img/uhadnute_denko.png";
        if (denko == 0) {
          guessed();
          denko = 1;
        }
        break;
      case "Noz":
        document.getElementById("noz_img").src = "../img/uhadnute_noz.png";
        if (noz == 0) {
          guessed();
          noz = 1;
        }
        break;
      case "Jahody":
        document.getElementById("jahody_img").src = "../img/uhadnute_jahody.png";
        if (jahody == 0) {
          guessed();
          jahody = 1;
        }
        break;
      case "Mixer":
        document.getElementById("mixer_img").src = "../img/uhadnute_mixer.png";
        if (mixer == 0) {
          guessed();
          mixer = 1;
        }

        break;
      case "Cukor":
        document.getElementById("cukor_img").src = "../img/uhadnute_cukor.png";
        if (cukor == 0) {
          guessed();
          cukor = 1;
        }
        break;
      case "Varecha":
        document.getElementById("varecha_img").src = "../img/uhadnute_varecha.png";
        if (varecha == 0) {
          guessed();
          varecha = 1;
        }
        break;
      case "Pohar":
        document.getElementById("pohar_img").src = "../img/uhadnute_pohar.png";
        if (pohar == 0) {
          guessed();
          pohar = 1;
        }
        break;
    }
  }
  if (message.destinationName == "OlasFarm/wool") {
    var text = JSON.parse(message.payloadString);
    if (text.start == "true") {
      guess_wool(0);
    }
    switch (text.najdene) {
      case "Nite":
        document.getElementById("nite_img").src = "../img/uhadnute_hrniec.png";
        if (nite == 0) {
          guessed();
          nite = 1;
        }
        break;
      case "Ihlice":
        document.getElementById("ihlice_img").src = "../img/uhadnute_seno.png";
        if (ihlice == 0) {
          guessed();
          ihlice = 1;
        }

        break;
      case "Gombíky":
        document.getElementById("gombiky_img").src = "../img/uhadnute_kniha.png";
        if (gombiky == 0) {
          guessed();
          gombiky = 1;
        }
        break;
      case "Meter":
        document.getElementById("meter_img").src = "../img/uhadnute_hodiny.png";
        if (meter == 0) {
          guessed();
          meter = 1;
        }
        break;
      case "Nožnice":
        document.getElementById("noznice_img").src = "../img/uhadnute_furik.png";
        if (noznice == 0) {
          guessed();
          noznice = 1;
        }
        break;
    }
  }
}
function guessed() {
  ind += 1;
  switch (actual_level) {
    case "kitchen":
      guess_kitchen(ind);
      break;
    case "wool":
      guess_wool(ind);
      break;
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

function say(text) {
  if (mqttClient.isConnected()) {
    console.log("saying: " + text);
    var content = JSON.stringify({ say: text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/audio";
    mqttClient.send(message);
  }
}



var left = 30;
function sheep_found() {
  console.log("najdena");
  foundSheeps += 1;
  var stratene = allSheeps - foundSheeps;
  if (stratene == 2) {
    say("Si šikovný pomocník. Ostávaju dve stratené ovečky.");
  } else if (stratene == 1) {
    say("Už iba jedna ovečka. Rýchlo ju nájdi.");
  } else if (stratene == 0) {
    say(
      "Ďakujem za pomoc pri hľadaní. Teraz sa ovečky vrátia do stodoly."
    );
    $("#text").css({
      visibility: "hidden",
    });
    animals_level3();
  } else {
    say("Našiel si ovečku. Ešte treba nájst " + stratene);
  }
  $("#stodola_div").append(
    "<img src='../img/ovecka.png' class='ovecka' id='ovecka_" +
      foundSheeps +
      "' >"
  );
  left += 10;
  $("#ovecka_" + foundSheeps).css({
    left: left + "%",
  });
}
function animals_level3() {
  setTimeout(() => {
    document.getElementById("ovecka_5").src = "../img/ovecka_2.png";
    $("#ovecka_5").animate({ left: "-=60%" }, 2000);
    $("#ovecka").css("visibility: none");
  }, 1000);

  setTimeout(() => {
    document.getElementById("ovecka_4").src = "../img/ovecka_2.png";
    $("#ovecka_4").animate({ left: "-=50%" }, 2000);
  }, 2000);
  setTimeout(() => {
    document.getElementById("ovecka_3").src = "../img/ovecka_2.png";
    $("#ovecka_3").animate({ left: "-=40%" }, 2000);
  }, 3000);
  setTimeout(() => {
    document.getElementById("ovecka_2").src = "../img/ovecka_2.png";
    $("#ovecka_2").animate({ left: "-=30%" }, 2000);
  }, 4000);
  setTimeout(() => {
    document.getElementById("ovecka_1").src = "../img/ovecka_2.png";
    $("#ovecka_1").animate({ left: "-=20%" }, 2000);
  }, 5000);
  setTimeout(() => {
    show_start();
  }, 7000);
}

function start(){
  say("Vitaj na mojej farme. Na mojej farme mi môžeš pomôcť s prípravou jedla v leveli kuchyňa, ktorý sa nachádza na prvej bočnej obrazovke. \pau=200\ Alebo mi môžeš pomôcť v leveli dieľni, ktorá je na strednej bečnej obrazovke. \pau=200\ Ak máš rada zvieratka, tak môžeš pomôcť v levely stodola na poslednej piatej obrzovke. Hru hraješ tak, že ak nájdeš hľadaný predmet pristúpiš k obrazovke, na ktorej ho vidíš.")
}

function show_start() {
  if (mqttClient.isConnected()) {
    console.log("main menu");
    var content = JSON.stringify({ main_menu: "true" });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/start";
    mqttClient.send(message);
  }
  window.open("../start.html", "_self");
}

function animals_level2() {
  say("Ach nie moje ovečky sa stratili! Pomôž mi ich nájsť.");
  $("#stodola_div").before(
    "<span id='text' class='uloha'>Nájdi skryté ovečky na bočných obrazovkách.</span>"
  );
  $("#ovecka").css({
    visibility: "hidden",
  });
  $("#ovecka1").css({
    visibility: "hidden",
  });
  $("#ovecka2").css({
    visibility: "hidden",
  });
  $("#ovecka3").css({
    visibility: "hidden",
  });
  $("#ovecka4").css({
    visibility: "hidden",
  });
  
  setTimeout(() => {
    say("Ovečky sú skryté na bočných obrazovkách, ak na niektorej uvidíš ovečku pristúp k nej aby sa vrátila späť.")
  }, 6000);
}

function help(index) {
  if (index == ind) {
    say("Skús sa pozrieť na predmety ešte raz možno to nájdeš.");
    
  }
}

var text;
function guess_kitchen(index) {
  switch (index) {
    case 0:
      setTimeout(() => {
        text = "Začneme raňajkami mám chuť na párky. Pomôž mi ich uvariť.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 2000);
      setTimeout(() => {
        text = "V akom predmete môžem párky uvariť?";
        document.getElementById("text").innerHTML = text;
        say(text);
        
      }, 8000);
      setTimeout(() => {
        send("Hrniec");
      }, 12000);
      setTimeout(() => {
        help(0);
      }, 20000);
      break;
    case 1:
      setTimeout(() => {
        text = "Teraz len počkať kým sa uvaria.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);

      setTimeout(() => {
        text = "Na aký predmet položím práve varené párky?";
        document.getElementById("text").innerHTML = text;
        say(text);
        
        index1 = index;
      }, 5000);
      setTimeout(() => {
        send("Tanier");
      }, 12000);
      setTimeout(() => {
        help(1);
      }, 20000);
      break;
    case 2:
      setTimeout(() => {
        text = "Ale párky predsa nebudem jesť samé.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);
      setTimeout(() => {
        text = "Čo jeme spolu s párkami, aby nás nebolelo bruško?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Chlieb");
      }, 5000);
      break;
    case 3:
      setTimeout(() => {
        text = "Chrumkavý chlebík ale je celý bochník musím ho narezať.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);
      setTimeout(() => {
        text = "Na akom predmete môžme narezať bochík chleba?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Denko");
      }, 6000);
      break;
    case 4:
      setTimeout(() => {
        text = "Chlieb mám, ale čo mám použiť na krájanie?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Noz");
      }, 1000);
      break;
    case 5:
      setTimeout(() => {
        text = "Super raňajky sme zvládli. Teraz poďme uvariť džem.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);
      setTimeout(() => {
        text = "Aké ovocie, ktoré tu vidíš môžme použiť?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Jahody");
      }, 5000);
      break;
    case 6:
      setTimeout(() => {
        text =
          "Nemám rada kúsky ovocia v džeme, aký nástroj použijem ak chcem mať džem jemný?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Mixer");
      }, 1000);
      break;
    case 7:
      setTimeout(() => {
        text = "Do džemu pridávame niečo, čo ho robí sladkým čo to je?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Cukor");
      }, 5000);
      break;
    case 8:
      setTimeout(() => {
        text = "Jéj džem nám už pekne buble.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);
      setTimeout(() => {
        text = "Mala by som to asi pomiešať, ale s čím?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Varecha");
      }, 5000);
      break;
    case 9:
      setTimeout(() => {
        text = "Už to je takmer hotové ostáva posledná vec.";
        document.getElementById("text").innerHTML = text;
        say(text);
      }, 1000);
      setTimeout(() => {
        text = "Kam môžem uvarený džem ponalievať?";
        document.getElementById("text").innerHTML = text;
        say(text);
        send("Pohar");
      }, 5000);
      break;
    case 10:
      setTimeout(() => {
        document.getElementById("text").innerHTML = "Ďakujem ti za pomoc.";
        say(text);
      }, 1000);
      setTimeout(() => {
        show_start();
      }, 2000);
      break;
  }
}

function guess_wool(index) {
  switch (index) {
    case 0:
      setTimeout(() => {
        document.getElementById("text").innerHTML =
          "Hádanka 1.<br>Ihlice som schoval tam,<br>kde ihly každý hľadá.";
        say("Ihlice som schoval tam, kde ihly každý hľadá.");
        send_wool("Seno");
      }, 7000);
      break;
    case 1:
      setTimeout(() => {
        document.getElementById("text").innerHTML =
          "Hádanka 2.<br>Vo veži sedím,<br>nie som vták,<br>vo vrecku ležím<br>tik-tak";
        say("Vo veži sedím, nie som vták, vo vrecku ležím, tik-tak, čo to je");
        send_wool("Hodiny");
      }, 7000);
      break;
    case 2:
      setTimeout(() => {
        document.getElementById("text").innerHTML =
          "Hádanka 3.<br>Nie je strom, no listov má priveľa<br>zošitá je, hoc nie je košeľa.<br>No nie je ani človek<br>a rozpráva o čomkoľvek.";
        say(
          "Nie je strom, no listov má priveľa zošitá je, hoc nie je košeľa.No nie je ani človek a rozpráva o čomkoľvek. Čo by to mohlo byť?"
        );
        send_wool("Kniha");
      }, 7000);
      break;
    case 3:
      setTimeout(() => {
        document.getElementById("text").innerHTML =
          "Hádanka 4.<br>Za kolieskom dlhé rúčky,<br>nesú náklad potichučky.<br>Nemá motor ani vláčik,<br>musíme ho sami tlačiť.";
        say(
          "Za kolieskom dlhé rúčky,nesú náklad potichučky.Nemá motor ani vláčik,musíme ho sami tlačiť. Čo to asi je?"
        );
        send_wool("Fúrik");
      }, 7000);
      break;
    case 4:
      setTimeout(() => {
        document.getElementById("text").innerHTML =
          "Hádanka 5.<br>Prázdna hlava, veľké uši,<br>mlčí a je ako tĺk.<br>Iba kuchár šípi, tuší,<br>čo uvarí, zješ sťa vlk.";
        say(
          "Prázdna hlava, veľké uši, mlčí a je ako tĺk. Iba kuchár šípi, tuší, čo uvarí, zješ sťa vlk."
        );
        send_wool("Hrniec");
      }, 7000);
      break;
    case 5:
      setTimeout(() => {
        document.getElementById("text").innerHTML = "Ďakujem ti za pomoc.";
        say("Ďakujem ti za pomoc.");
      }, 1000);
      setTimeout(() => {
        show_start();
      }, 2000);
      break;
  }
}
function send_wool(text) {
  if (mqttClient.isConnected()) {
    console.log("sending word" + text);
    var content = JSON.stringify({"word": text });
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/wool";
    mqttClient.send(message);
  }
}

function send(text){
  if(mqttClient.isConnected()){
    console.log("sending word" + text);
    var content = JSON.stringify({word:text});
    var message= new Paho.MQTT.Message(content);
    message.destinationName = "OlasFarm/kitchen";
    mqttClient.send(message);
  }
}

