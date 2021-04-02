var clientId = "example_clientID_" + new Date().getTime();
			var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "/mqtt", clientId);
			mqttClient.onConnectionLost = onConnectionLost;
			mqttClient.onMessageArrived = onMessageArrived;
			mqttClient.connect({onSuccess: onConnect});

			function onConnect() {
				console.log("onConnect");
				mqttClient.subscribe("OlasFarm/level");
				//mqttClient.subscribe("openlab/screen/1/url");
			}

			function onConnectionLost(responseObject) {
				if (responseObject.errorCode !== 0) {
					console.log("onConnectionLost:" + responseObject.errorMessage);
				}
			}

			function onMessageArrived(message) {
				console.log("onMessageArrived for topic '" + message.destinationName + "': " + message.payloadString);
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
            
           function setLevel(text){
                if(mqttClient.isConnected()){
                    console.log("loading campaign:" + text);
                    var content = JSON.stringify({"loadLevel": text});
                    var message= new Paho.MQTT.Message(content);
                    message.destinationName = "OlasFarm/level";
					mqttClient.send(message);
					
                }
			}
			function next(text){
				if(mqttClient.isConnected()){
					console.log("continue level:" + text);
                	var content = JSON.stringify({"loadLevel": text});
                	var message= new Paho.MQTT.Message(content);
					message.destinationName = "OlasFarm/level/2";
					mqttClient.send(message);
				}
			}
			function level1(){
				if(mqttClient.isConnected()){
					console.log("začíname");
                	var content = JSON.stringify({"loadLevel": 'true'});
                	var message= new Paho.MQTT.Message(content);
					message.destinationName = "OlasFarm/level/1";
					mqttClient.send(message);
				}
			}
			
			function spusti(){
				if(mqttClient.isConnected()){
					console.log("Starting game");
					var web1="http://"
					var content = JSON.stringify({web1});
                    var message= new Paho.MQTT.Message(content);
                    message.destinationName = "openlab/screen/1/url";
                    mqttClient.send(message);
				}
			}