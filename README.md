This repo is written to support few Grove Sensor(which I have got in Intel IoT Roadshow) on Intel Galileo Board. 

Here is the list of sensor supported:<br>
1.<a href="http://www.seeedstudio.com/wiki/Grove_-_Temperature_Sensor">Grove Temperature Sensor</a><br>
2.<a href="http://www.seeedstudio.com/wiki/Grove_-_Button">Grove Button</a> <br>
3.<a href="http://www.seeedstudio.com/wiki/Grove_-_LED_Socket_Kit">Grove Led Socket</a><br>
4.<a href="http://www.seeedstudio.com/wiki/Grove_-_Buzzer">Grove Buzzer</a><br>
5.<a href="http://www.seeedstudio.com/wiki/Grove_-_Touch_Sensor">Grove Touch Sensor</a><br>
6.<a href="http://www.seeedstudio.com/wiki/Grove_-_Sound_Sensor">Grove Sound Sensor</a><br>
7.<a href="http://www.seeedstudio.com/wiki/Grove_-_Rotary_Angle_Sensor">Grove Rotary Angle Sensor</a><br>
8.<a href="http://www.seeedstudio.com/wiki/Grove_-_LCD_RGB_Backlight">Grove LCD RGB Backlight</a><br>
9.<a href="http://www.seeedstudio.com/wiki/Grove_-_Air_Quality_Sensor">Grove Air Quality Sensor</a><br>
10.<a href="http://www.seeedstudio.com/wiki/Piezo_Sensor_-_LDT1-028K_Lead_Attachments">Grove Vibration Sensor</a><br>
11.<a href="http://www.seeedstudio.com/wiki/Grove_-_3-Axis_Digital_Accelerometer(%C2%B11.5g)">Grove 3-Axis Accelerometer</a><br>
12 <a href="http://www.seeedstudio.com/wiki/Grove_-_Servo">Grove Servo Motor</a><br>

<hr>
Please read respective sensors wiki page for each sensor tech specification. Here each sensor has a common function `initialize(pinNumber)`, parameter should be the pin number to which the sensor is connected. <br><br>

Example:<br>
<a href="http://www.seeedstudio.com/wiki/Grove_-_Temperature_Sensor">Grove Temperature Sensor</a><br>
<ul>
<li>Connect it to any of four Analog Pins(A0-A3)</li>
<li>It has two method intialize(pinNumber) and getTemperature(), getTemperature will return object containing both celsius and fahrenheit temperature
</ul>
<b>usage:</b><br>
          `TemperatureSensor.intialize(0);`<br>
          `var temperature = TemperatureSensor.getTemperature();`<br>


<b>FUTURE WORK</b><br>
1.Planning to release as a node module<br>
2.Porting of <b>upm</b> and <b>mraa</b> to JavaScript<br>

Reference:<br>
1.<a href="https://github.com/intel-iot-devkit/upm/">upm</a><br>
2.<a href="https://github.com/intel-iot-devkit/mraa">mraa</a><br>

<b>NOTE:</b>
Please do lookup the code for other sensor functions till I update README file

<b>IMP NOTE:</b><br>
I have not written `require()` for individual sensor. Please do write respective `require()` for the sensor being used.
