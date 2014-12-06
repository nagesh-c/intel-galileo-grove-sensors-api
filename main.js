/*

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

*/


var mraa = require("mraa");
var upm = require("jsupm_grove");
//var upm_sound = require('jsupm_mic'); // parameter mismatch for getSampledWindow()

/* Temperature Sensor */
TemperatureSensor = {
    myAnalogPin : 0,
    initialize: function(AnalogPinNumber){
        //GROVE Kit Analog Pin (0,1,2 or 3) Connector --> Aio(AnalogpinNumber)
        myAnalogPin = new mraa.Aio(AnalogPinNumber);
    },
    getTemperature: function(){
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

/* Sound Sensor */
SoundSensor = {
    mySound: 0,
    thresholdContext: {
        averageReading : 0,
        runningAverage : 0,
        averagedOver   : 2,
    },
    initialize: function(soundPinNumber){
        mySound = new mraa.Aio(soundPinNumber);
    },
    getSampledWindow: function(freqMS, numberofSample){
        return mySound.read();
    },
    findThreshold: function(thresholdValue, buffer){
        var sum = 0;
        for(var i=0;i<buffer.length;i++){
            sum  = sum + buffer[i];
        }
        this.thresholdContext.averageReading = sum / buffer.length;
        this.thresholdContext.runningAverage = (((this.thresholdContext.averagedOver-1) * this.thresholdContext.runningAverage) + this.thresholdContext.averageReading) / this.thresholdContext.averagedOver;
        if(this.thresholdContext.runningAverage > thresholdValue){
            return this.thresholdContext.runningAverage;
        }
        else{
            return 0;
        }
    }
}

var groveRotary = new upm.GroveRotary(2);
loop();

function loop()
{
    var abs = groveRotary.abs_value();
    var absdeg = groveRotary.abs_deg();
    var absrad = groveRotary.abs_rad();

    var rel = groveRotary.rel_value();
    var reldeg = groveRotary.rel_deg();
    var relrad = groveRotary.rel_rad();

    //write the knob value to the console in different formats
    console.log("Abs: " + abs + " " + Math.round(parseInt(absdeg)) + " " + absrad.toFixed(3));
    console.log("Rel: " + rel + " " + Math.round(parseInt(reldeg)) + " " + relrad.toFixed(3));

    //wait 2 s and call function again
    setTimeout(loop, 2000);
}

