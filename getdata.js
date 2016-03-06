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



// db.insert(data, function(){
//   console.log('sensors data updated');
// })
//       
db.find({"sort": [{"timestamp": "desc"}], limit:1, selector: {"timestamp": {"$gt": 0 } } }, function(er, result) {
  if (er) {
    throw er;
  }
 
  console.log('Found %d documents', result.docs.length);
  for (var i = 0; i < result.docs.length; i++) {
    console.log('  Doc id: %s', result.docs[i]._id);
    console.log(result.docs[i].d);
  }
});