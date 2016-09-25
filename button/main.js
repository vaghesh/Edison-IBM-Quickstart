/* Code to send button value to IBM Quickstart
 Weblink - https://quickstart.internetofthings.ibmcloud.com/
 Change "id" in config variable of code. And use same id to the IBM quickstart website
*/



var mraa = require('mraa'); //require mraa
var Client = require("ibmiotf");



var config = {
    "org" : "quickstart",
    "id" : "vaghesh",
    "type" : "iotsensor"
};

var deviceClient = new Client.IotfDevice(config);
deviceClient.connect();


var myDigitalPin6 = new mraa.Gpio(30); //setup digital read on Digital pin #6 (D6)
myDigitalPin6.dir(mraa.DIR_IN); //set the gpio direction to input


 deviceClient.on('connect', function () {
      periodicActivity()
      
});

 
function periodicActivity() //
{
  var myDigitalValue =  myDigitalPin6.read(); //read the digital value of the pin
  console.log('Gpio is ' + myDigitalValue); //write the read value out to the console
  deviceClient.publish("status","json",'{"d" : { "pir" : '+ myDigitalValue +'}}');
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}












