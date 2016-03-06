var iotf = require("ibmiotf");


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
    // console.log(argument);
  }, function onError (argument) {
	
  	console.log("Fail");
  	console.log(argument);
  });
var date = new Date();
data.timestamp = date.getTime();
// Push data from file to cloudant
var fs = require('fs'), filename = "test.txt";
fs.readFile(filename, 'utf8', function(err, data) {  
  var tmp = data.split(' ');  
  if (4 == tmp.length ){
    data = {'temp': tmp[0], 'humidity': tmp[1], 'soilmoisture': tmp[2], 'light': tmp[3]};
    data.timestamp = date.getTime();
    db.insert(data, function(){
      console.log('sensors data updated');
    })
    
  }
  
});

