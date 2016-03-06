/*
{
  "cloudantNoSQLDB": [
    {
      "name": "ouragtech-cloudantNoSQLDB",
      "label": "cloudantNoSQLDB",
      "plan": "Shared",
      "credentials": {
        "username": "8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix",
        "password": "6f37e8f02528019bb2f86db43e33f49d2172d2e31c933aa9d72f849d8b2e707a",
        "host": "8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix.cloudant.com",
        "port": 443,
        "url": "https://8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix:6f37e8f02528019bb2f86db43e33f49d2172d2e31c933aa9d72f849d8b2e707a@8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix.cloudant.com"
      }
    }
  ]
}

*/
var iotf = require("ibmiotf");
var config = require("./device.json");
var sleep = require('sleep');
// Load the Cloudant library.
var Cloudant = require('cloudant');

var me = '8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix'; // Set this to your own account
var password = "6f37e8f02528019bb2f86db43e33f49d2172d2e31c933aa9d72f849d8b2e707a";

// Initialize the library with my account.
var cloudant = Cloudant("https://8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix:6f37e8f02528019bb2f86db43e33f49d2172d2e31c933aa9d72f849d8b2e707a@8cd7b256-b57e-4822-ab9f-7dbf2b6a9a8f-bluemix.cloudant.com",
  function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
  }
);

var db = cloudant.db.use("agtech");


function random (low, high) {
    return Math.round( (Math.random() * (high - low) + low) * 1000 ) / 1000;
}
var appClientConfig = {
  org: '1sihq1',
  id: 'myapp',
  "auth-key": 'a-1sihq1-lmejvsoyvz',
  "auth-token": '+GSuDjN@2CRTLLNAtS',
  "auth-method": "token"
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to trace. By default its 'warn'
var data =  { d : { 'temp' : random(20,22), 'humidity': random(60, 70), 'soilmoisture': random(40, 80), 'light': random(50, 70)}};
appClient.log.setLevel('info');
appClient.
  publishHTTPS("raspberrypi", "b827ebd5250c", "customEvent", "json", data). then (function onSuccess (argument) {
    console.log("OK");
    console.log(argument);
  }, function onError (argument) {
	
  	console.log("Fail");
  	console.log(argument);
  });
var date = new Date();
data.timestamp = date.getTime();
db.insert(data, function(){
  console.log('sensors data updated');
})
var deviceClient = new iotf.IotfDevice(config);

//setting the log level to trace. By default its 'warn'
deviceClient.log.setLevel('info');

deviceClient.connect();

deviceClient.on('connect', function(){
    deviceClient.publish("status","json",'{"d" : { "cpu" : ' + random(0,99)+', "mem" : '+ random(0,500) + ' }}');  
    deviceClient.disconnect();
});
/*
//List all devices of Device Type 'drone'
appClient.
listAllDevicesOfType('raspberrypi').then (function onSuccess (argument) {
  // console.log("Success");
	console.log(argument);
}, function onError (argument) {
	
	console.log("Fail");
	console.log(argument);
});
  
/*
//Register a new Device Type
appClient.
registerDeviceType('newType1',"New Type").then (function onSuccess (argument) {
	console.log("Success");
	console.log(argument);
}, function onError (argument) {
	
	console.log("Fail");
	console.log(argument);
});
*/