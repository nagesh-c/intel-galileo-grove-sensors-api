/*

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

*/


/*var mraa = require("mraa");
var upm = require("jsupm_grove");
//var upm_sound = require('jsupm_mic'); // parameter mismatch for getSampledWindow()
var lcd = require('jsupm_i2clcd');
var upmTP401 = require('jsupm_gas');
var vibSensor = require('jsupm_ldt0028');
var accerl = require('jsupm_mma7455');
var servomot = require('jsupm_servo');*/

/* Temperature Sensor */

module.exports = {
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

/* Rotary Angle Sensor */
AngleSensor = {
    myAngle: 0,
    initialize: function(anglePinNumber){
        myAngle = new upm.GroveRotary(anglePinNumber);
    },
    getAbsValue: function(){
        buffer = [];
        buffer.push(myAngle.abs_value());
        buffer.push(myAngle.abs_deg());
        buffer.push(myAngle.abs_rad().toFixed(3));
        return buffer;
    },
    getRelValue: function(){
        buffer = [];
        buffer.push(myAngle.rel_value());
        buffer.push(myAngle.rel_deg());
        buffer.push(myAngle.rel_rad().toFixed(3));
        return buffer;
    }
}

/* LCD */
LCD= {
    myLCD: 0,
    initialize: function(lcdPinNuber){
        myLCD = new lcd.Jhd1313m1(lcdPinNuber, 0x3E, 0x62);
    },
    displayLCD: function(row,column,textToDisplay){
        myLCD.setCursor(row,column);
        myLCD.write(textToDisplay);
    },
    setColor: function(r,g,b){
        myLCD.setColor(r,g,b);
    }
}

/* Air Quality Sensor 
Sensor heatup should be specified in the ReadMe */
AirQuality={
    myAirquality: 0,
    initialize: function(airqualityPinNumber){
        myAirquality = new upmTP401.TP401(airqualityPinNumber);
    },
    checkAirQualityLevel: function(value){
        if(value < 50) return "Fresh Air";
        if(value < 200) return "Normal Indoor Air";
        if(value < 400) return "Low Pollution";
        if(value < 600) return "High Pollution - Action Recommended";
        return "Very High Pollution - Take Action Immediately";
    },
    getsensorData: function(){
        var value = myAirquality.getSample();
        var ppm = myAirquality.getPPM();
        //write the sensor values to the console
        console.log("raw: " + value + " ppm: " + (" " + ppm.toFixed(2)).substring(-5, 5) + "   " + this.checkAirQualityLevel(value));
        buffer = {};
        buffer["raw"]= value;
        buffer["ppm"]= ppm.toFixed(2).substring(-5, 5);
        return buffer;    
    }
}

/* Piezo Vibration Sensor 
code to provide delay:
function delay( milliseconds ) {
    var startTime = Date.now();
    while (Date.now() - startTime < milliseconds);
}
*/
VibrationSensor={
    myVibSensor: 0,
    initialize: function(vibsensorPinNumber){
        myVibSensor = new vibSensor.LDT0028(vibsensorPinNumber);
    },
    getVibSensorData: function(){
        return myVibSensor.getSample();
    }
}

/* 3-Axis Accelerometer (has a bug) */
Accelerometer={
    myAccel: 0,
    initialize: function(accelPinNumber){
        myAccel = new accerl.MMA7455(accelPinNumber,0x1D);
    },
    readAcceleration: function(){
        console.log(myAccel.readData());
    }
}

/* Servo Motor */
ServoMotor= {
    myServo:0,
    initialize: function(servoPinNumber){
        var myServo = new servomot.ES08A(servoPinNumber);
    },
    rotate: function(angle){
        myServo.setAngle(angle);
    }
  }
}