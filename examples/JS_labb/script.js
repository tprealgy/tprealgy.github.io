var input1Elem, input2Elem, resultElem;

function init() {
    input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    resultElem = document.getElementById("result");
    document.getElementById("runBtn").onclick = testScript;
    
}//End inti
window.onload = init;

function testScript() {
    var speed; //Hastighet i km/h
    var time; //Tid i minuter
    var distance; //Sträcka
    var reactionTime  //Reaktion i sekunder
    var speedMS //Hastighet i m/s
    var car = ["Volvo", "BMW", "Ferrari"]; //Bilmärken
    var accTime = [10.5, 7, 4.3]; //Accelerationstid 0-100

    
    speed = Number(input1Elem.value);
    time = Number(input2Elem.value);

    //sträckan för angiven tid
    distance = speed * time / 60;
    resultElem.innerHTML = "Sträckan blir " + distance + " km. <br><br>";
    
    //Tid, om man kör 20 km/h långsammare
    time = distance / (speed - 20) * 60;
    resultElem.innerHTML += "Tiden för samma sträcka, om hastigheten är 20 km/h lägre blir " + time + " minuter. <br><br>";
    
    //Reaktionssträcka
    reactionTime = 3;
    speedMS = speed * 1000 / 3600;
    distance = speedMS * reactionTime;
    resultElem.innerHTML += "Om reaktionstiden är " + reactionTime + " sekunder blir reaktionssträckan " + distance + " m. <br><br>";
    
    //Accelerationssträckan 0-100 km/h för olika bilar. 100 km/h ränkas först om till m/s. 
    speedMS = 100 * 1000 / 3600;
    distance = speedMS * accTime[0] / 2;
    resultElem.innerHTML += car[0] + " 0-100 på " + accTime[0] + " sek. på " + distance + " meter. <br>";
    distance = speedMS * accTime[1] / 2;
    resultElem.innerHTML += car[1] + " 0-100 på " + accTime[1] + " sek. på " + distance + " meter. <br>";
    distance = speedMS * accTime[2] / 2;
    resultElem.innerHTML += car[2] + " 0-100 på " + accTime[2] + " sek. på " + distance + " meter. <br><br>";
    
    //Eget arbete
    
    time = distance / (speed + 40);
    resultElem.innerHTML += time + "wadawwdwa";
}//End testscript