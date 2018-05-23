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
        // Make sure user doesn't input more cells than we have
    if (num >= 200) {
        alert("You've entered too many cells. Lower your number of vaccinated cells.");
    } else {
        // While the number of vaccinated cells is less than what is desired
        while (vCells.length < num) {
            // Pick a random cell
            var randomCell = randomNumber();
            // Define our population table as array x
            var x = document.getElementById("population_table").getElementsByTagName("td");
            // Define our cell from x as y
            var y = x[randomCell].classList.item(y)
            // Check to see if the cell is healthy and not in the statistics row
            if (!vCells.includes(randomCell) && y == "healthy" && randomCell > 20) {
                // Vaccinate cell
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("vaccinated");
                vCells.push(randomCell);
            } else {
                // If we already vaccinated the cell or it's in the stats row then we choose a new number
                randomCell = randomNumber();
                }
            }
        }
// Run stat handler function to update table statistics
UpdateStats();
}

function randomInfection(num) {
    if (num >= 200) {
        // Make sure user doesn't input more cells than we have
        alert("You've entered too many cells. Lower your number of infected cells.");
    } else {
        // While the number of infected cells is less than what is desired
        while (iCells.length < num) {
            // Pick a random cell
            var randomCell = randomNumber();
            // Define our population table as array x
            var x = document.getElementById("population_table").getElementsByTagName("td");
            // Define our cell from x as y
            var y = x[randomCell].classList.item(y)
            // Check to see if the cell is healthy and not in the statistics row
            if (!iCells.includes(randomCell) && y == "healthy" && randomCell > 20) {
                // Infect cell
                x[randomCell].classList.remove("healthy");
                x[randomCell].classList.add("infected");
                // Push the cell index to our infection array
                iCells.push(randomCell);
            } else {
                // If we already infected the cell or it's in the stats row then we choose a new number
                randomCell = randomNumber();
                }
            }
        }
// Run stat handler function to update table statistics
UpdateStats();
}

function UpdateStats() {
    // Reset global variables
    healthy = 0;
    vaccinated = 0;
    infected = 0;
    dead = 0;
    // Define our population table as array x
    var x = document.getElementById("population_table").getElementsByTagName("td");
    var cell;
    // Loop through entire population table and count cell statuses
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
    // Define and compute percentages for each stat classification
    var percent_healthy = parseInt((healthy / 200) * 100);
    var percent_vaccinated = parseInt((vaccinated / 200) * 100);
    var percent_survived = parseInt(((healthy + vaccinated) / 200) * 100);
    var percent_dead = parseInt((dead / 200) * 100);
    
    // Generate statistics row elements directly with HTML injection rather than hardcoding into index.html
    var x_u = document.getElementById("population_table").getElementsByClassName("update");
    for (cell = 6 ; cell < 20; cell++) {
        if (cell == 6) {
            x_u[cell].innerHTML= "Turn #: " + turnNumber;
        } else if (cell == 7) {
            x_u[cell].innerHTML = "# \<br />Healthy " + healthy;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#c2c21e";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 10) {
            x_u[cell].innerHTML = "# Vaccinated " + vaccinated;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#2990fa";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 12) {
            x_u[cell].innerHTML = "# \<br />Infected " + infected;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#ee8a1b";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 13) {
            x_u[cell].innerHTML = "# \<br />Dead\<br /> " + dead;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "black";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 8) {
            x_u[cell].innerHTML = "% Healthy " + percent_healthy;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#c2c21e";
            x_u[cell].style.borderColor = "black"
        } else if (cell ==11) {
            x_u[cell].innerHTML = "% Vaccinated " + percent_vaccinated;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#2990fa";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 9) {
            x_u[cell].innerHTML = "% Survived " + percent_survived;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "#c2c21e";
            x_u[cell].style.borderColor = "black"
        } else if (cell == 14) {
            x_u[cell].innerHTML = "% \<br />Dead\<br /> " + percent_dead;
            x_u[cell].style.fontWeight = "bold";
            x_u[cell].style.color = "black";
            x_u[cell].style.borderColor = "black"
        } 
    }
}


function infectionSpread() {
    // Define our population table as array x
    var x = document.getElementById("population_table").getElementsByTagName("td");
    // Loop through entire population table
    for (var cell = 20; cell < 220; cell++) {
        var y = x[cell].classList.item(y);
        // Spread logic for infection. If we encounter an infected cell we define local variables to their neighbors making sure to avoid boundaries
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
            // Check local variable status and either leave alone or infect based on status. Vaccinated cells have 0.05% infection chance
            if (z1 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5 && 220 > (cell + 20)) {
                    x[cell+1].classList.remove("vaccinated");
                    x[cell+1].classList.add("infected");
                }
            // Healthy cells have 25% infection chance
            } else if (z1 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500 && 220 > (cell + 20)) {
                    x[cell+1].classList.remove("healthy");
                    x[cell+1].classList.add("infected");
                }
            }
            // Check local variable status and either leave alone or infect based on status. Vaccinated cells have 0.05% infection chance
            if (z2 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5) {
                    x[cell-1].classList.remove("vaccinated");
                    x[cell-1].classList.add("infected");
                }
            // Healthy cells have 25% infection chance
            } else if (z2 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
                    x[cell-1].classList.remove("healthy");
                    x[cell-1].classList.add("infected");
                }
            }
            // Check local variable status and either leave alone or infect based on status. Vaccinated cells have 0.05% infection chance
            if (z3 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5 && 220 > (cell + 20)) {
                    x[cell+20].classList.remove("vaccinated");
                    x[cell+20].classList.add("infected");
                }
            // Healthy cells have 25% infection chance
            } else if (z3 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500 && 220 > (cell + 20)) {
                    x[cell+20].classList.remove("healthy");
                    x[cell+20].classList.add("infected");
                }
            }
            // Check local variable status and either leave alone or infect based on status. Vaccinated cells have 0.05% infection chance
            if (z4 == "vaccinated") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 5) {
                    x[cell-20].classList.remove("vaccinated");
                    x[cell-20].classList.add("infected");
                }
            // Healthy cells have 25% infection chance
            } else if (z4 == "healthy") {
                var probSpread = Math.floor(Math.random() * 10000);
                if (probSpread < 2500) {
                    x[cell-20].classList.remove("healthy");
                    x[cell-20].classList.add("infected");
                }
            }
        }
    }
    // Run death handler function to decide if infected survive turn or not
    infectionDeath();
    // Run stat handler function to update table statistics
    UpdateStats();
    // While there are still infected in the population, continue counting turns
    if (infected !== 0) {
        turnNumber++;
    }
};

function infectionDeath() {
    // Define our population table as array x
    var x = document.getElementById("population_table").getElementsByTagName("td");
    // Loop through entire population table
    for (cell=20; cell < 220; cell++) {
        // Define our cell from x as y
        var y = x[cell].classList.item(y);
        // Check for infection
        if (y == "infected") {
            // Set random number used for probability of death and survival through immunity
            var probDie = Math.floor(Math.random() * 10000);
            var probSurvive = Math.floor(Math.random() * 10000);
            // Infected cells have a 10% chance of death
            if (probDie < 1000) {
                    x[cell].classList.remove("infected");
                    x[cell].classList.add("dead");
            // Infected cells also have a 2.5% chance of immunity
            } else if (probSurvive < 250) {
                    x[cell].classList.remove("infected");
                    x[cell].classList.add("vaccinated");
            }
        }
    }
}
