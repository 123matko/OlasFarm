
var screenid="_2";
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
                window.open("level"+text+screenid+".html","_self");
                
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
