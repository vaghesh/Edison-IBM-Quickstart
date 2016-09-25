// Load Grove module
var groveSensor = require('jsupm_grove');

var Client = require("ibmiotf");


var config = {
    "org" : "quickstart",
    "id" : "vaghesh",
    "type" : "iotsensor"
};


var deviceClient = new Client.IotfDevice(config);
deviceClient.connect();


// Create the temperature sensor object using AIO pin 0
var temp = new groveSensor.GroveTemp(0);
console.log(temp.name());

// Read the temperature ten times, printing both the Celsius and
// equivalent Fahrenheit temperature, waiting one second between readings

function temp_sensor() {
        var celsius = temp.value();
        var fahrenheit = celsius * 9.0/5.0 + 32.0;
        console.log(celsius + " degrees Celsius, or " +
            Math.round(fahrenheit) + " degrees Fahrenheit");

    deviceClient.publish("status","json",'{"d" : { "temperature" : '+ celsius +'}}');
     setTimeout(temp_sensor,1000);

}


deviceClient.on('connect', function () {
      temp_sensor();

});
