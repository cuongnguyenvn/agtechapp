var iotf = require("../");
var config = require("./device.json");
var sleep = require("sleep");

function random (low, high) {
    return Math.round( (Math.random() * (high - low) + low) * 1000 ) / 1000;
}

var deviceClient = new iotf.IotfDevice(config);

//setting the log level to trace. By default its 'warn'
deviceClient.log.setLevel('info');

deviceClient.connect();

deviceClient.on('connect', function(){

    // deviceClient.publish('myevt', 'json', '{"hello": '+ random(1,111)+'}', 0);
    //publishing event using the default quality of service
    deviceClient.publish("status","json",'{"d" : { "cpu" : ' + random(0,99)+', "mem" : '+ random(0,500) + ' }}');

    // deviceClient.publish('myevt', 'json', '{"hello": '+ random(1,111)+'}', 0);
    //publishing event using the default quality of service
    // deviceClient.publish("status","json",'{"d" : { "cpu" : ' + random(0,99)+', "mem" : '+ random(0,500) + ' }}');
  
    deviceClient.disconnect();
});
// var interval = setInterval(function(str1, str2) {
//   deviceClient.connect();
// 
// }, 3000, "Hello.", "How are you?");
// 

deviceClient.on('disconnect', function(){
  console.log('Disconnected from IoTF');
});

deviceClient.on('error', function (argument) {
	console.log(argument);
	process.exit(1);
});