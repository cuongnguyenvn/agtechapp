var iotf = require("ibmiotf");

var appClientConfig = {
  org: '1sihq1',
  id: 'myapp',
  "auth-key": 'a-1sihq1-lmejvsoyvz',
  "auth-token": '+GSuDjN@2CRTLLNAtS',
  "auth-method": "token",
  "type": "shared"
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to debug. By default its 'warn'
appClient.log.setLevel('debug');

appClient.connect();

appClient.on('connect', function () {
	appClient.
		subscribeToDeviceEvents();
	appClient.
		subscribeToDeviceEvents("customEvent");
	appClient.
		subscribeToDeviceEvents("status");

	setTimeout(function(){ 
		
    // appClient.
      // unsubscribeToDeviceEvents("customEvent");

	}, 3000);

	

	setTimeout(function(){ 
		
    // appClient.
      // unsubscribeToDeviceEvents();

	}, 9000);

})


appClient.on('deviceEvent', function (deviceType, deviceId, eventType, format, payload) {
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);

});