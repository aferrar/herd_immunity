var turnNum, mortalityProb, immunityProb, infectProb;

function randomNumber() {
    return Math.floor(Math.random() * 100)
}

function randomVacc() {
    var randomCell = randomNumber();
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var y = x[randomCell].classList.item(y)
    if (y = "healthy") {
        x[randomCell].classList.remove("healthy");
        x[randomCell].classList.add("vaccinated");
    } else {
        randomVacc();
    }
}
function resetCells() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=0; cell < 100; cell++) {
        var y = x[cell].classList.item(y);
        console.log(cell, y);
        x[cell].classList.remove(y);
        x[cell].classList.add("healthy");
        console.log(cell, y);
    }
}

function infectionStart() {
    var randomCell = randomNumber();
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var y = x[randomCell].classList.item(y)
    if (y = "healthy") {
        x[randomCell].classList.remove("healthy");
        x[randomCell].classList.add("infected");
    } else {
        infectionStart();
    }
}