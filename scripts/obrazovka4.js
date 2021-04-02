var clientId = "example_clientID_" + new Date().getTime();
			var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "/mqtt", clientId);
			mqttClient.onConnectionLost = onConnectionLost;
			mqttClient.onMessageArrived = onMessageArrived;
			mqttClient.connect({onSuccess: onConnect});

			function onConnect() {
				console.log("onConnect");
				mqttClient.subscribe("OlasFarm/level");
				mqttClient.subscribe("openlab/screen/14/url");
				mqttClient.subscribe("OlasFarm/level/2");
				mqttClient.subscribe("experiments/mapPositions/xx123yy/0");
			}

			function onConnectionLost(responseObject) {
				if (responseObject.errorCode !== 0) {
					console.log("onConnectionLost:" + responseObject.errorMessage);
				}
			}

			function onMessageArrived(message) {
				console.log("onMessageArrived for topic '" + message.destinationName + "': " + message.payloadString);
				if(message.destinationName == "OlasFarm/level"){
					var text=JSON.parse(message.payloadString);
					window.open("./"+text.loadLevel+"/level1_4.html","_self");
				}
				if(message.destinationName == "OlasFarm/level/2"){
					var text=JSON.parse(message.payloadString);
					if(text.loadLevel == "animals_2"){
                        animals_level2();
                    }
				}
				if(message.destinationName == "experiments/mapPositions/xx123yy/0"){
					var text = JSON.parse(message.payloadString);
					var x = text.positions[0][0];
					var y = text.positions[0][1];
					if(x>570 && x<600){
						if(y>420 && y<460){
							ovecka_najdena();
						}
					}
				}
			}
		
			
			function spusti(){
				if(mqttClient.isConnected()){
					console.log("Starting game");
					var web1="http://"
					var content = JSON.stringify({web1});
                    var message= new Paho.MQTT.Message(content);
                    message.destinationName = "openlab/screen/14/url";
                    mqttClient.send(message);
				}
			}
			var ovecka = false;
			function animals_level2(){
				console.log("continue");
				if(!ovecka){
					$('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka' >");
					$('#ovecka').css({
						top: '57%',
						left: '55%'
					});
				}
				ovecka = true;
			}
			function ovecka_najdena(){
				if(mqttClient.isConnected() && ovecka){
					console.log("najdena ovecka");
					var content = JSON.stringify({"najdenaOvecka": 1});
                	var message= new Paho.MQTT.Message(content);
					message.destinationName = "OlasFarm/level/2";
					mqttClient.send(message);
					ovecka = false;
				}
				$('#ovecka').css({
					visibility: 'hidden'
				});
			}
