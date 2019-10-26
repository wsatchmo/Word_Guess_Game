/* 
 _                                             
| |                                            
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __  
| '_ \ / _` | '_ \ / _` | '_ ` _ \ / _` | '_ \ 
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\__,_|_| |_|\__, |_| |_| |_|\__,_|_| |_|
                    __/ |                      
                   |___/                       
*/
var themeSong = document.getElementById('theme');
function toggleMusic(){ //the music player
        if (themeSong.paused == false)
            themeSong.pause(); //if it is not paused, pause it when pressed
        else
            themeSong.play(); //otherwise, play it
            themeSong.loop = true; //and loop
            themeSong.volume = 0.45;
                 }
// FALLOUT 4 CHIPTUNE SONG!!!
var wins = 0;
var losses = 0;
//create a score counter
var wordArr = ["robot", "laser", "fatman", "grenade", "radiation", "raider", "psycho", "vault", "baseball", "alien", "wanderer", "father", "guns",
"handy", "drink", "mutant", "atoms", "china", "america", "water", "melee", "knife", "armor", "railroad", "brotherhood", "pugilist", "russia"];
//make an array of a ton of words

function clearScore(){
    wins = 0;
    losses = 0;
    document.getElementById('wins-count').innerHTML = wins;
    document.getElementById('losses-count').innerHTML = losses;
}

//!!!!!!DANGER ZONE!!!!!!//
function playGame(){

    document.getElementById('output1').innerHTML = "";
    document.getElementById('output2').innerHTML = "- - - - - -";
    document.getElementById('hangmanLetters').innerHTML = "- - - - - -";
    document.getElementById('round-status').innerHTML = "No Score . . .";
    //reset everything when a player hits start game button

    var currentWord = wordArr[Math.floor(Math.random() * wordArr.length)]; // the word to be guessed
    //choose a word at random
    var guesses = currentWord.length + 4;
    //create a guesses counter
    var currentArr = currentWord.split("");  //an array of all the letters in the word to be guessed
    //make an empty array that splits that word
    var blankWord = [];  // a blank array to be filled in with spaces, then updated with letters used
        for (j = 0; j < currentArr.length; j++){
            blankWord.push("_"); //display each letter as a space: "_ _ _ _ _"
        }
    
    var guessedLetters = []; // an array of all the letters the player has guessed, whetehr right or wrong

    document.onkeyup = function(event) {
        //store which key was pressed by the user
        var userChoice = event.key;
        var userLower = userChoice.toLowerCase();
        guessedLetters.push(userLower);

        var possibilitiesArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
                                "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        //an array of all possible guesses
        if (possibilitiesArr.includes(userLower)) {
        //if the guess isn't in the array, don't even count it -- considers uppercase to be lowercase
            for (i = 0; i < currentArr.length; i++){
                if (userLower === currentArr[i]){
                //if the chosen letter matches one of the letters in the word --
                    blankWord[i] = userLower;
                    //display that letter in the vizualization of the word
                }   
            }
            if (currentArr.indexOf(userLower) === -1){
            guesses -= 1;
            }
            //if the letter is not in the word, decrement guesses

            var winsBool;
            //a boolean to track if the round has been won or lost yet
            for (j = 0; j < blankWord.length; j++){
                if (blankWord[j] === currentArr[j]){
                    winsBool = true;
                } else {
                    winsBool = false;
                    break;
                }
            }

            if (winsBool){
                wins++;
                playGame();
                if (losses > wins){
                    document.getElementById('round-status').innerHTML = "Losing";
                } else if (losses === wins){
                    document.getElementById('round-status').innerHTML = "Tied";
                } else {
                    document.getElementById('round-status').innerHTML = "Winning";
                }
            }
            //if all letters have been guessed
                //display a win, add it to score counter

            if (guesses === 0 && (!winsBool)){
                losses++;
                playGame();
                if (losses > wins){
                    document.getElementById('round-status').innerHTML = "Losing";
                } else if (losses === wins){
                    document.getElementById('round-status').innerHTML = "Tied";
                } else {
                    document.getElementById('round-status').innerHTML = "Winning";
                }
            }
            //if guesses counter is zero and all letters haven't been guessed
                //display a loss, add it to loss counter           
        }

        if (guesses === 0 || winsBool){ 
           document.getElementById('pressanykey').innerHTML = "Press any key to begin"; 
        } else {
            document.getElementById('pressanykey').innerHTML = "";
        }
        //after the round, says press any key to begin again

        document.getElementById('output1').innerHTML = guessedLetters.toString().replace(/,/g , " ");
        document.getElementById('output2').innerHTML = guesses;
        document.getElementById('hangmanLetters').innerHTML = blankWord.toString().replace(/,/g , " ");
        document.getElementById('wins-count').innerHTML = wins;
        document.getElementById('losses-count').innerHTML = losses;      
    }
}