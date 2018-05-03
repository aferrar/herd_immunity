var turnNumber = 0;


function UpdateStats() {
    var healthy = 0;
    var vaccinated = 0;
    var infected = 0;
    var dead = 0;
    
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=20; cell<240; cell++) {
        var y = x[cell].classList.item(y);
        if (y == "healthy") {
            healthy++;
        } else if (y == "vaccinated") {
            vaccinated++;
        } else if (y == "infected") {
            infected++;
        } else if (y == "dead") {
            dead++;
        }
    }
    
    var percent_healthy = healthy / 200;
    var percent_vaccinated = vaccinated / 200;
    var percent_infected = infected / 200;
    var percent_dead = dead / 200;
    
    var x_u = document.getElementById("population_table").getElementsByClassName("update");
    for (cell = 0 ; cell < 20;cell++) {
        if (cell == 6) {
            x_u[cell].innerHTML= "Healthy: " + healthy;
        } else if (cell == 7) {
            x_u[cell].innerHTML = "Vacc: " + vaccinated;
        } else if (cell == 8) {
            x_u[cell].innerHTML = "Infected: " + infected;
        } else if (cell == 9) {
            x_u[cell].innerHTML = "Dead: " + dead;
        } else if (cell == 10) {
            x_u[cell].innerHTML = "% Healthy: " + percent_healthy;
        } else if (cell == 11) {
            x_u[cell].innerHTML = "% Vacc: " + percent_vaccinated;
        } else if (cell ==12) {
            x_u[cell].innerHTML = "% Inf: " + percent_infected;
        } else if (cell == 13) {
            x_u[cell].innerHTML = "% Dead: " + percent_dead;
        } else if (cell == 14) {
            x_u[cell].innerHTML = "Turn #: " + turnNumber;
        }
    }
console.log(healthy, vaccinated, infected, dead, percent_healthy, percent_vaccinated, percent_infected, percent_dead);
}

function randomNumber() {
    return Math.floor(Math.random() * 200)
}

function randomVacc() {
    var randomCell = randomNumber();
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var y = x[randomCell].classList.item(y)
    if (y = "healthy" && randomCell > 20) {
        x[randomCell].classList.remove("healthy");
        x[randomCell].classList.add("vaccinated");
    } else {
        randomVacc();
    }
UpdateStats();
}
function resetCells() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=20; cell < 240; cell++) {
        var y = x[cell].classList.item(y);
        console.log(cell, y);
        x[cell].classList.remove(y);
        x[cell].classList.add("healthy");
        console.log(cell, y);
    }
    
    for (cell=0; cell < 20; cell++) {
        x[cell].innerHTML = "";
    }
    turnNumber = 0;
}

function infectionStart() {
    var randomCell = randomNumber();
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var y = x[randomCell].classList.item(y)
    if (y = "healthy" && randomCell > 20) {
        x[randomCell].classList.remove("healthy");
        x[randomCell].classList.add("infected");
    } else {
        infectionStart();
    }
UpdateStats();
}



function infectionSpread() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=20; cell < 240; cell++) {
        var y = x[cell].classList.item(y);
        console.log(cell, y);
        if (y == "infected") {
            var z1 = x[cell+1].classList.item(z1);
            var z2 = x[cell-1].classList.item(z2);
            var z3 = x[cell+20].classList.item(z3);
            var z4 = x[cell-20].classList.item(z4);
            
            if (z1 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5) {
                    x[cell+1].classList.remove("vaccinated");
                    x[cell+1].classList.add("infected");
                }
            
            } else if (z1 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
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
                if (probSpread < 5) {
                    x[cell+20].classList.remove("vaccinated");
                    x[cell+20].classList.add("infected");
                }
            
            } else if (z3 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
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
    UpdateStats();
}

function infectionDeath() {
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    for (cell=20; cell < 240; cell++) {
        var y = x[cell].classList.item(y);
        console.log(cell, y);
        if (y == "infected") {
            var probDie = Math.floor(Math.random() * 10000);
            if (probDie < 1000) {
                    x[cell].classList.remove("infected");
                    x[cell].classList.add("dead");
            }
        }
    }
    turnNumber++
    UpdateStats();
}
