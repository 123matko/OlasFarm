$(document).ready(function(){
   
    $('#slnko').css({
        visibility: 'visible'
    });
    var slnko=$('#slnko');
    var hore='-=5';
    var vlavo='+=5';
    var uhol=0,j=0;
    for(i=0;i<35;i++){

    slnko.animate({ top: hore, left: vlavo, }, 25);

   
    }
     
    setInterval(() => {
        slnko.css({
            "-moz-transform":"rotate("+uhol+"deg)",
            "-webkit-transform":"rotate("+uhol+"deg)",
            "-ms-transform":"rotate("+uhol+"deg)",
            "transform":"rotate("+uhol+"deg)",
           
        });
        uhol+=10;
        if(uhol==360){
        uhol=0;
        }
    }, 100);
   
   

});
var clientId = "example_clientID_" + new Date().getTime();
			var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "/mqtt", clientId);
			mqttClient.onConnectionLost = onConnectionLost;
			mqttClient.onMessageArrived = onMessageArrived;
			mqttClient.connect({onSuccess: onConnect});

			function onConnect() {
				console.log("onConnect");
				mqttClient.subscribe("OlasFarm/level");
			}

			function onConnectionLost(responseObject) {
				if (responseObject.errorCode !== 0) {
					console.log("onConnectionLost:" + responseObject.errorMessage);
				}
			}

			function onMessageArrived(message) {
                console.log("onMessageArrived for topic '" + message.destinationName + "': " + message.payloadString);
                var text=message.payloadString.loadLevel;
                window.open("level"+text+".html",_self);
                
			}
			
			function say(text) {
				if(mqttClient.isConnected()) {
                    console.log("saying: " + text);
					var content = JSON.stringify( {"say" : text});
					var message = new Paho.MQTT.Message(content);
					message.destinationName = "openlab/audio";
					mqttClient.send(message);
				}
			}
