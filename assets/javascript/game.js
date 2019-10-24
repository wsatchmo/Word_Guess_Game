var wins = 0;
var losses = 0;
//create a score counter
var wordArr = ["britain", "horse", "chuckle", "fluffy", "drink", "italian", "monkey", "africa", "america", "puppy", "cheese", "tacos", "duck", "donkey", "wrench", "boxer"];
//make an array of a ton of words

function playGame(){
    var currentWord = wordArr[Math.floor(Math.random() * wordArr.length)]; // the word to be guessed
    //choose a word at random
    var guesses = currentWord.length + 4;
    //create a guesses counter
    var currentArr = currentWord.split("");  //an array of all the letters in the word to be guessed
    //make an empty array that splits that word
    var blankWord = [];  // a blank array to be filled in with spaces, then updated with letters used
        for (j = 0; j < currentArr.length; j++){
            blankWord.push("_"); //display each letter as a space: _____
        }
    
    var guessedLetters = []; // an array of all the letters the player has guessed, whetehr right or wrong

    document.onkeyup = function(event) {
        //store which key was pressed by the user
        var userChoice = event.key;
        guessedLetters.push(userChoice);

        for (i = 0; i < currentArr.length; i++){
            if (userChoice === currentArr[i]){
            //if the chosen letter matches one of the letters in the word --
                blankWord[i] = userChoice;
                //display that letter in the vizualization of the word
            }   
        }
        
        if (currentArr.indexOf(userChoice) === -1){
        guesses -= 1;
        }
        //If the letter is not in the word, decrement guesses

        var winsBool;

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
            alert("Round won!");
        }
        //if all letters have been guessed
            //display a win, add it to score counter

        if (guesses === 0 && (!winsBool)){
            losses++;
            playGame();
            alert("Round lost!");
        }
        //if guesses counter is zero and all letters haven't been guessed
            //display a loss, add it to loss counter

        document.getElementById('output1').innerHTML = guessedLetters.toString().replace(/,/g , " ");
        document.getElementById('output2').innerHTML = guesses;
        document.getElementById('hangmanLetters').innerHTML = blankWord.toString().replace(/,/g , " ");
        document.getElementById('wins-count').innerHTML = wins;
        document.getElementById('losses-count').innerHTML = losses;
    }
}