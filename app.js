var turnNum, mortalityProb, immunityProb, infectProb;

function randomNumber() {
    return Math.floor(Math.random() * 100)
}

function randomInfect() {
    var randomCell = randomNumber();
    var x = document.getElementById("population_table").getElementsByTagName("td");
    x[randomCell].style.background = "Yellow";    
}

function clearInfect() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=0; cell < 100; cell++) {
        x[cell].style.background = "Green";   
    }
}