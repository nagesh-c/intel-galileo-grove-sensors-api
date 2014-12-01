/*jslint node:true,vars:true,bitwise:true,unparam:true */

/*jshint unused:true */

/*
The Local Temperature Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to read analog data from a Grover Starter Kit Plus – IoT Intel® Edition Temperature Sensor, start a web server and communicate wirelessly using WebSockets.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/iot-local-temperature-nodejs-and-html5-samples
*/


var mraa = require("mraa");
TemperatureSensor = {
    myAnalogPin : 0,
    initialize: function(AnalogPinNumber){
        //GROVE Kit Analog Pin (0,1,2 or 3) Connector --> Aio(AnalogpinNumber)
        myAnalogPin = new mraa.Aio(AnalogPinNumber);
    },
    getTemperature: function(){
        //type = 0 (celsius)
        //type = 1 (fahrenheit)
        //type = 2 (both returned as object)
        var B = 3975;
        var a = myAnalogPin.read();
        console.log("Checking....");
        var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        console.log("Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        console.log("Celsius Temperature:"+celsius_temperature);                 
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        console.log("Fahrenheit Temperature: " + fahrenheit_temperature);    
        Temp = { celsius : celsius_temperature, fahrenheit: fahrenheit_temperature};
        console.log(Temp);
    }
};

TemperatureSensor.initialize(0);
setInterval(TemperatureSensor.getTemperature,4000);