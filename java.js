let gameName = "GUESS THE WORD";
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = gameName;

// setting game option

let numbersOftry = 6;
let numbersOfletters = 6;
let currentTry = 1;
let numbersOfHints = 2;

// mange words
let wordToGuess = "";
const words = [
  "create",
  "update",
  "delete",
  "master",
  "branch",
  "mainly",
  "elzero",
  "school",
];
wordToGuess = words[Math.floor(Math.random() * words.length)];


// massage for succsess 
let massage = document.querySelector(".massage");

//hint 

let getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint)

function guessGame() {
  for (let i = 1; i <= numbersOftry; i++) {
    let inputsContiner = document.querySelector(".inputs");
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.classList.add("try");
    tryDiv.innerHTML = `<span>TRY-${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disable");

    for (let j = 1; j <= numbersOfletters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(input);
    }

    inputsContiner.appendChild(tryDiv);

    inputsContiner.children[0].children[1].focus();
  }

  // to have all disabled classes disabled
  const inputDisabledDiv = document.querySelectorAll(".disable input");
  inputDisabledDiv.forEach((input) => (input.disabled = true));

  // to have all your inputs at this var
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = input.value.toUpperCase();

      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}




const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handlguesses);

console.log(wordToGuess);
function handlguesses() {
    let successGuess = true;

    for(let i =1; i <= numbersOfletters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];


        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");

        }else if(wordToGuess.includes(letter) && letter !== "" ){
            inputField.classList.add("not-in-place");
            successGuess = false;

        }else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }


    if (successGuess) {
        massage.innerHTML = `you have win <span>${wordToGuess}</span>`;
        

        let allTrys = document.querySelectorAll(".inputs > div");

        allTrys.forEach((input) => input.classList.add("disable"))

        guessButton.disabled = true;

    }else {
        document.querySelector(`.try-${currentTry}`).classList.add("disable");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => input.disabled =true);

        currentTry++;

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => input.disabled = false);
        
        let el = document.querySelector(`.try-${currentTry}`);

        if(el) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disable");
            el.children[1].focus()
        }else {
            massage.innerHTML = `you have lose the word is <span>${wordToGuess}</span>`;
            guessButton.disabled= true;
            getHintButton.disabled = true;
        }
    }
}








// hint function

function getHint() {
  if (numbersOfHints > 0) {
    numbersOfHints--;
    document.querySelector(".hint span").innerHTML = numbersOfHints;
  }

  if (numbersOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enbledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enbledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randIndex];
    const indexToFill = Array.from(enbledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

window.onload = function () {
  guessGame();
};
