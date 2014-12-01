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
var upm = require("jsupm_grove");

/* Temperature Sensor */
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
        //console.log("Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        //console.log("Celsius Temperature:"+celsius_temperature);                 
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        //console.log("Fahrenheit Temperature: " + fahrenheit_temperature);    
        Temp = { celsius : celsius_temperature, fahrenheit: fahrenheit_temperature};
        //console.log(Temp);
        return Temp;
    }
};

/* Button */
Button = {
    myButton : 2,
    initialize: function(buttonPinNumber){
        myButton = new mraa.Gpio(buttonPinNumber);
        myButton.dir(mraa.DIR_IN);
    },
    checkButton: function(){
        return myButton.read();
    }
};

/* LED */
LED = {
    myLED: 2,
    initialize: function(ledPinNumber){
        myLED = new upm.GroveLed(ledPinNumber);
    },
    setLedOnOff: function(status){
        if(status === true){
            myLED.on();
        }
        if(status === false){
            myLED.off(); 
        }
    }
};

/* Ligth Sensor */
LightSensor= {
    myLight: 0,
    initialize: function(lightPinNumber){
        myLight = new upm.GroveLight(lightPinNumber);
    },
    getLightValue: function(){
        console.log(myLight.value());
    }
};

/* Buzzer Sensor */
BuzzerSensor= {
    myBuzzer: 0,
    state: 0,
    initialize: function(buzzerPinNumber){
        myBuzzer = new mraa.Gpio(buzzerPinNumber);
        myBuzzer.dir(mraa.DIR_OUT);
    },
    buzzerOn: function(){
        if(this.state === 0){
            myBuzzer.write(1);
            this.state = 1;
        }
        else{
            myBuzzer.write(0);
            this.state = 0;
        }
    }
};

/* Touch Sensor */
TouchSensor= {
    myTouch: 0,
    initialize: function(touchPinNumber){
        myTouch = new mraa.Gpio(touchPinNumber);
        myTouch.dir(mraa.DIR_IN);
    },
    checkTouch: function(){
        return myTouch.read();
    }
};

