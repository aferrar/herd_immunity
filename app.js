var turnNumber = 0;

var healthy = 0;
var vaccinated = 0;
var infected = 0;
var dead = 0;

function randomNumber() {
    return Math.floor(Math.random() * 220)
}

function randomVacc(num) {
    if (num >= 200) {
        alert("You've entered too many cells. Lower your number of vaccinated cells.")
    } else {
        for (var cell = 0; cell < num; cell++) {
            var randomCell = randomNumber();
            var x = document.getElementById("population_table").getElementsByTagName("td");
            var y = x[randomCell].classList.item(y)
            if (y = "healthy" && randomCell > 20) {
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("vaccinated");
            } else {
                var randomCell = randomNumber();
                var x = document.getElementById("population_table").getElementsByTagName("td");
                var y = x[randomCell].classList.item(y)
                if (y = "healthy" && randomCell > 20) {
                    x[randomCell].classList.remove("healthy");
                    x[randomCell].classList.add("vaccinated");
                }
            }
        }
    }
UpdateStats();
}

infected_index = [];
function infectionStart() {
        var randomCell = randomNumber();
        infected_index.push(randomCell.toString());
        var x = document.getElementById("population_table").getElementsByTagName("td");
        var y = x[randomCell].classList.item(y)
        x[randomCell].classList.remove("healthy");
        x[randomCell].classList.add("infected");
    
        // Trying to prevent clicks that don't generate infection color. A little better. Still not // perfect
    
        console.log(randomCell);
        while (y !== "healthy" && randomCell < 20 && infected_index.indexOf(randomCell.toString() !== -1)) {
            y = x[randomCell].classList.item(y);
            if (y == "infected" || y == "vaccinated" || y == "dead" || y == "update") {
                randomCell = randomNumber();
                y = x[randomCell].classList.item(y);
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("infected");
                console.log(y, randomCell);
                }
        }
        console.log(y, randomCell);
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
        } else if (cell == 8) {
            x_u[cell].innerHTML = "# Vaccinated: " + vaccinated;
        } else if (cell == 9) {
            x_u[cell].innerHTML = "# \<br />Infected: " + infected;
        } else if (cell == 10) {
            x_u[cell].innerHTML = "# \<br />Dead: " + dead;
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
            x_u[cell].style.color = "red";
        }
    }
}


function infectionSpread() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    while (infected !== 0 && turnNumber < 200) {
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
                    var z3 = x[cell+1].classList.item(z3);
                    var z4 = x[cell-20].classList.item(z4);
                } else if (cell == 199) {
                    var z1 = x[cell].classList.item(z1);
                    var z2 = x[cell].classList.item(z2);
                    var z3 = x[cell].classList.item(z3);
                    var z4 = x[cell].classList.item(z4);
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
    }
}

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
                    x[cell].classList.add("healthy");
            }
        }
    }
}

// Found this online, can't get it functioning without crashing page yet                            // https://www.sitepoint.com/delay-sleep-pause-wait/

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
