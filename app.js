// Declare global turn counter variable
var turnNumber = 0;
// Declare global health stat cariables
var healthy = 0;
var vaccinated = 0;
var infected = 0;
var dead = 0;
// Define random number generator function
function randomNumber() {
    return Math.floor(Math.random() * 220)
}
// Define vaccination and infection arrays to hold indices of these cells, respectively
var vCells = [];
var iCells = [];
// Define function for adding randomly vaccinated cells
function randomVacc(num) {
    // Make sure user isn't asking for a number we can't influence
    if (num >= 200) {
        alert("You've entered too many cells. Lower your number of vaccinated cells.");
    } else {
    // Loop through random numbers until we have generated the desired number of cells
        while (vCells.length < num) {
            var randomCell = randomNumber();
    // x is holding our table cell elements as an array
            var x = document.getElementById("population_table").getElementsByTagName("td");
    // y is accessing the specific cell from the x array based on our randomly generated number
            var y = x[randomCell].classList.item(y)
    // Make sure we haven't already vaccinated this spot
            if (!vCells.includes(randomCell) && y == "healthy" && randomCell > 20) {
    // Change cell classes
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("vaccinated");
                vCells.push(randomCell);
            } else {
                randomCell = randomNumber();
                }
            }
        }
// Call stat handler to update table statistics
UpdateStats();
}

function randomInfection(num) {
    if (num >= 200) {
        alert("You've entered too many cells. Lower your number of infected cells.");
    } else {
        while (iCells.length < num) {
            var randomCell = randomNumber();
            var x = document.getElementById("population_table").getElementsByTagName("td");
            var y = x[randomCell].classList.item(y)
            if (!iCells.includes(randomCell) && y == "healthy" && randomCell > 20) {
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("infected");
                iCells.push(randomCell);
            } else {
                randomCell = randomNumber();
                }
            }
        }
UpdateStats();
}

function UpdateStats() {
    healthy = 0;
    vaccinated = 0;
    infected = 0;
    dead = 0;
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    
    for (cell=20; cell<220; cell++) {
        var y = x[cell].classList.item(y);
        if (y == "healthy" || y == "vaccinated") {
            healthy++;
        } 
        
        if (y == "vaccinated") {
            vaccinated++;
        }
        
        if (y == "infected") {
            infected++;
        }
        
        if (y == "dead") {
            dead++;
        }
    }
    
    var percent_healthy = parseInt(((healthy + vaccinated) / 200) * 100);
    var percent_vaccinated = parseInt((vaccinated / 200) * 100);
    var percent_survived = parseInt(((healthy + vaccinated) / 200) * 100);
    var percent_dead = parseInt((dead / 200) * 100);
    
    var x_u = document.getElementById("population_table").getElementsByClassName("update");
    for (cell = 6 ; cell < 20; cell++) {
        if (cell == 6) {
            x_u[cell].innerHTML= "Turn #: " + turnNumber;
        } else if (cell == 7) {
            x_u[cell].innerHTML = "# \<br />Healthy: " + healthy;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "green";
        } else if (cell == 8) {
            x_u[cell].innerHTML = "# Vaccinated: " + vaccinated;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "blue";
        } else if (cell == 9) {
            x_u[cell].innerHTML = "# \<br />Infected: " + infected;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "red";
        } else if (cell == 10) {
            x_u[cell].innerHTML = "# \<br />Dead: " + dead;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "black";
        } else if (cell == 11) {
            x_u[cell].innerHTML = "% Healthy: " + percent_healthy;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "green";
        } else if (cell ==12) {
            x_u[cell].innerHTML = "% Vaccinated: " + percent_vaccinated;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "blue";
        } else if (cell == 13) {
            x_u[cell].innerHTML = "% Survived: " + percent_survived;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "green";
        } else if (cell == 14) {
            x_u[cell].innerHTML = "% \<br />Dead: " + percent_dead;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "black";
        }
    }
}


function infectionSpread() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    for (var cell = 20; cell < 220; cell++) {
        var y = x[cell].classList.item(y);
        // Logic to fix column overflow error which was stalling turn counter
        if (y == "infected") {
            if (cell < 180) {
                var z1 = x[cell+1].classList.item(z1);
                var z2 = x[cell-1].classList.item(z2);
                var z3 = x[cell+20].classList.item(z3);
                var z4 = x[cell-20].classList.item(z4); 
            } else if (199 > cell > 180) {
                var z1 = x[cell+1].classList.item(z1);
                var z2 = x[cell-1].classList.item(z2);
                var z3 = x[cell+20].classList.item(z3);
                var z4 = x[cell-20].classList.item(z4);
            } else if (cell == 199) {
                var z1 = x[cell+1].classList.item(z1);
                var z2 = x[cell-1].classList.item(z2);
                var z3 = x[cell+20].classList.item(z3);
                var z4 = x[cell-20].classList.item(z4);
            } 

            if (z1 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5 && 220 > (cell + 20)) {
                    x[cell+1].classList.remove("vaccinated");
                    x[cell+1].classList.add("infected");
                }

            } else if (z1 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500 && 220 > (cell + 20)) {
                    x[cell+1].classList.remove("healthy");
                    x[cell+1].classList.add("infected");
                }
            }

            if (z2 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5) {
                    x[cell-1].classList.remove("vaccinated");
                    x[cell-1].classList.add("infected");
                }

            } else if (z2 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
                    x[cell-1].classList.remove("healthy");
                    x[cell-1].classList.add("infected");
                }
            }

            if (z3 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5 && 220 > (cell + 20)) {
                    x[cell+20].classList.remove("vaccinated");
                    x[cell+20].classList.add("infected");
                }

            } else if (z3 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500 && 220 > (cell + 20)) {
                    x[cell+20].classList.remove("healthy");
                    x[cell+20].classList.add("infected");
                }
            }

            if (z4 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5) {
                    x[cell-20].classList.remove("vaccinated");
                    x[cell-20].classList.add("infected");
                }

            } else if (z4 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
                    x[cell-20].classList.remove("healthy");
                    x[cell-20].classList.add("infected");
                }
            }
        }
    }
    infectionDeath();
    turnNumber++;
    UpdateStats();
};

function infectionDeath() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    for (cell=20; cell < 220; cell++) {
        var y = x[cell].classList.item(y);
        if (y == "infected") {
            var probDie = Math.floor(Math.random() * 10000);
            var probSurvive = Math.floor(Math.random() * 10000);

            if (probDie < 1000) {
                    x[cell].classList.remove("infected");
                    x[cell].classList.add("dead");
            } else if (probSurvive < 250) {
                    x[cell].classList.remove("infected");
                    x[cell].classList.add("vaccinated");
            }
        }
    }
}
