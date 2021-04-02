var clientId = "example_clientID_" + new Date().getTime();
			var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "/mqtt", clientId);
			mqttClient.onConnectionLost = onConnectionLost;
			mqttClient.onMessageArrived = onMessageArrived;
			mqttClient.connect({onSuccess: onConnect});

			var najdeneOvecky = 0;
			var vsetkyOvecky = 5;

			function onConnect() {
				console.log("onConnect");
				mqttClient.subscribe("openlab/screen/1/url");
				
				mqttClient.subscribe("OlasFarm/level");
				mqttClient.subscribe("OlasFarm/level/1");
				mqttClient.subscribe("OlasFarm/level/2");
				
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
					window.open("./"+text.loadLevel+"/level1.html","_self");
					
				}
				if(message.destinationName == "OlasFarm/level/1"){
					var text=JSON.parse(message.payloadString);
					if(text.loadLevel == "true"){
                        level1();
                    }
				}
				if(message.destinationName == "OlasFarm/level/2"){
					var text=JSON.parse(message.payloadString);
					if(text.najdenaOvecka == "1"){
						ovecka_najdena();
					}
					if(text.loadLevel == "animals_2"){
                        animals_level2();
                    }
				}
				
				
				
			}
			
			function level1(){
                console.log("spustam");
                say("Vitaj na mojej farme. Toto sú moje ovečky a teraz s nimi pôjdeme na pašu.");
                
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
                    console.log("loading level:" + text);
                    var content = JSON.stringify({"loadLevel": text});
                    var message= new Paho.MQTT.Message(content);
                    message.destinationName = "OlasFarm/level";
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
			var left= 30;
			function ovecka_najdena(){
				console.log("najdena")
				najdeneOvecky+=1;
				var stratene=vsetkyOvecky-najdeneOvecky; 
				if(stratene == 2){
					say("Si šikovný pomocník. Ostávaju dve starené ovečky.");
				}
				else if(stratene == 1){
					say("Už iba jedna ovečka. Rýchlo ju nájdi.");
				}else if(stratene ==0){
					say("Ďakujem za pomoc pri hľadaní. Teraz ovečky odprevadíme späť na farmu.")
					$('#text').css({
						visibility: 'hidden'
					});
					
				}
				else{
				say("Našiel si ovečku. Ešte treba nájst "+stratene);
				}
				$('#stodola_div').append("<img src='../img/ovecka.png' class='ovecka' id='ovecka_"+najdeneOvecky+"' >");
				left+=10;
				$('#ovecka_'+najdeneOvecky).css({
					top: '60%',
					left: left+'%'
				});

			}

			function animals_level2(){
				say("Ach nie moje ovečky sa stratili! Pomôž mi ich nájsť.");
				$('#stodola_div').before("<span id='text' class='uloha'>Nájdi skryté ovečky na bočných obrazovkách.</span>");               
				$('#ovecka').css({
                    visibility: 'hidden'
                });
                $('#ovecka1').css({
                    visibility: 'hidden'
                });
                $('#ovecka2').css({
                    visibility: 'hidden'
                });
                $('#ovecka3').css({
                    visibility: 'hidden'
                });
                $('#ovecka4').css({
                    visibility: 'hidden'
                });
			}
			