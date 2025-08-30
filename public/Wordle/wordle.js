// Function to load JSON file
function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'four-letter-words.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

// Function to select a random item from an array
// to be used to find a random word from the json file
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const tiles = document.querySelectorAll('.tile');
const keyboardButtons = document.querySelectorAll('.key');

document.addEventListener('DOMContentLoaded', function () {
    let words = []; 
    let rowStartIndex =0;

    function initialiseGame(randomWord) {
        document.addEventListener('keydown', function (event) {
            const key = event.key.toUpperCase().trim();
            if (key === 'BACKSPACE') {
                deleteLastLetterFromTiles();
                words.pop(); 
               
            } else if (key === 'ENTER' && words.length % 4 === 0 && words.length !==0) {
                event.preventDefault();
                wordle(words.join(""), randomWord, rowStartIndex);
                words.splice(0, words.length);
              
                rowStartIndex+=4;
                
            } else if (key.length === 1 && /^[A-Z]$/.test(key) && words.length / 4 !== 1) {
                insertLetterIntoTiles(key);
                words.push(key); 
              
            }
        });

        keyboardButtons.forEach(button => {
            button.addEventListener('click', function () {
                const letter = button.textContent.trim();
                
                if (letter === 'DEL') {
                    deleteLastLetterFromTiles();
                    words.pop(); // Remove the last element from words array
                } else if (letter === 'ENTER' && words.length % 4 === 0 && words.length!== 0) {
                    wordle(words.join(""), randomWord, rowStartIndex);
                    words.splice(0, words.length);
                    console.log(words);
                    rowStartIndex += 4;
                } else if (letter.length === 1 && words.length / 4 !== 1) {
                    console.log(words.length);
                    insertLetterIntoTiles(letter);
                    words.push(letter); // Add the pressed letter to words array
                }
            });
        });  
    }
    //Event Listener to highligh the keyboard buttons on the screen to highlight them
    //
    document.addEventListener('keydown', function (event) {
        const key = event.key.toUpperCase().trim();
        const highlightedButton = document.getElementById(key);
        if (highlightedButton) { // Ensure the button exists before adding the class
            highlightedButton.classList.add('animate-background');
            highlightedButton.classList.remove('animate-background');
            
            setTimeout(function () {
                highlightedButton.classList.add('animate-background');
            }, 10);

        }
    });

    function insertLetterIntoTiles(letter) {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].textContent === ''  && !tiles[i].dataset.readOnly) {
                tiles[i].textContent = letter;
            
                break;
            }
        }
    }

    function deleteLastLetterFromTiles() {
        for (let i = tiles.length - 1; i >= 0; i--) {
            if (!tiles[i].dataset.readOnly && tiles[i].textContent !== '') {
                tiles[i].textContent = '';
                break;
        
            }
        }
    }
    
    loadJSON(function (response) {
        const words = JSON.parse(response);
        const randomWord = getRandomItem(words);
        console.log(randomWord);
        initialiseGame(randomWord);
    });
});


function wordle(word, guess, startIndex,) {
    const feedback = [];
    let keyColourChanged;
    
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (guess[i] === letter) {
            feedback.push("#019801"); // Correct letter in the correct position
            keyColourChanged = document.getElementById(letter);
            //css property might have been added to letter be hence remove
            keyColourChanged.classList.remove("correctLetterWrongPosition");
            //change the colour of the keyboard buttons depending on the colour
            keyColourChanged.classList.add("correctPositon");
            
            continue;
        } else if (guess.includes(letter)) {
            feedback.push("#d8be48"); // Correct letter but in the wrong position
            keyColourChanged =document.getElementById(letter);
            keyColourChanged.classList.add("correctLetterWrongPosition");
            
        } else {
            feedback.push("#F83C3F"); // Wrong letter
            keyColourChanged =document.getElementById(letter);
            keyColourChanged.classList.add("wrongPosition");
            
        }
    }
    const endIndex = startIndex + 3; // Calculate the ending index

    
    for (let i = startIndex; i <= endIndex; i++) {
        const tile = tiles[i];
        const color = feedback[i - startIndex]; // Adjust index to match the feedback array
        tile.style.backgroundColor = color;
        tile.style.border = color;
        tile.dataset.readOnly = 'true';
        if (foundSolution(feedback)) {
            tile.classList.add("move-up-animation"); 
            for (let i = 0; i < tiles.length; i++) {
            tile.dataset.readOnly = 'true';
            }
            setTimeout(function() {
                location.reload();
            }, 4000); 
        }
} 
    if(endIndex === 19 && !foundSolution(feedback)){
     const outputDiv = document.getElementById('output');
        outputDiv.textContent += guess;
        outputDiv.classList.remove("hidden");
        setTimeout(function() {
        location.reload();
    }, 3000); 
}
}

function foundSolution(feedback){
    for(let j = 0; j< feedback.length; j++){
        if(feedback[j] !== "#019801"){
            return false;
        }
        
    }
    return true
}












// Select the icon element to rotate
const icon = document.getElementById('myIcon');

icon.addEventListener('click', function() {
    icon.classList.add("rotate-animation");
    icon.classList.remove("rotate-animation");
    
    setTimeout(function () {
        icon.classList.add('rotate-animation');
    }, 10);
    
});





