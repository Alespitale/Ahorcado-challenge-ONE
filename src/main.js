const initState = () => {
  random = getRandomInt(3,11);
  word = "";
  pressed = [];
  error = 0;
  count = 0;
  readKey = true;
  gameState = true;
}

const startGame = () => {
  gameScreen();
  aleatoryWord();
  listenKey();
}

const newGame = () => {
  initState();
  cleanScreen();
  startGame();
}

const gameScreen = () => {
  querySelNone(".first-screen");
  querySelFlex(".game-container");
  querySelNone(".foot");
  initState();
}

const addWord = () => {
  querySelNone(".first-screen");
  querySelFlex(".addWord-container");
  querySelNone(".foot");
}

const desist = () => {
  querySelNone(".game-container");
  querySelFlex(".first-screen");
  querySelFlex(".foot");
  cleanScreen();
}

const cancel = () => {
  querySelNone(".addWord-container");
  querySelFlex(".first-screen");
  querySelFlex(".foot");
  document.getElementById("input-word").value = "";
}

const listenKey = () => {
  document.addEventListener('keydown', (event) => { playDesktop(event) });
}

const playWithNewWord = (newWord) => {
  gameScreen();
  word = newWord;
  for (let i = 0; i < word.length; i++) {
    document.getElementById(`line-${i}`).style.display = 'flex';
  }
  listenKey();
}

const playDesktop = (event) => {
  if (readKey) {
    let keyValue = event.key;
    let capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Á', 'É', 'Í', 'Ó', 'Ú'];
    let lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'á', 'é', 'í', 'ó', 'ú'];
    if (capitalLetters.includes(keyValue)) keyValue = keyValue.toLowerCase();
    if (lowerLetters.includes(keyValue)) {
      verification(keyValue);
    }else {
      showToast("info", "Solo ingrese letras");
    }
    gameCase();
  }
}

const handleLetterBtn = (value) => {
  if (gameState) {
    verification(value);
    gameCase();
  }
}

function aleatoryWord(){
  const url=`https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=${random}`;
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    word = e.target.responseText;
    word = removeAccents(word);
    if(word.length > 0){
      for (let i = 0; i < word.length; i++) {
        document.getElementById(`line-${i}`).style.display = 'flex';
      }
    }
  }
}

const save = () => {
  let newWord = document.getElementById("input-word").value;
  newWord = newWord.toLowerCase();
  if (isEmptyText(newWord) && isThereAccents(newWord) && isThereNums(newWord)) {
    if(/[a-z\u00F1\u00d1\s]/.test(newWord)){
      let is_array = newWord.split(" ");
      if (is_array.length > 1) {
        showToast("info", "Solo ingrese una palabra");
        return false;
      }
      if (newWord.length <= 10) {
        sessionStorage.setItem("extra_word", newWord);
        showToast("success", "Palabra agregada");
        document.getElementById("input-word").value = "";
        cancel();
        playWithNewWord(newWord);
      } else {
          showToast("warning", "Máximo 10 letras");
          return false;
      }
    }
  }
}

const verification = (value) => {
  if (!pressed.includes(value)) {
    pressed.push(value);
    if (word.includes(value)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === value) {
          document.getElementById(`line-${i}`).innerHTML = value;
          sfx.correct.play();
          count++;
        }
      }
    } else {
      document.querySelector('.pressedLetters').innerHTML += value + '-';
      document.getElementById(`part-${error}`).style.display = 'flex';
      sfx.incorrect.play();
      error++;
    }
  }
}

const gameCase = () => {
  if (count === word.length) {
    gameState = false;
    readKey = false;
    win();
  }
  if (error === 6) {
    gameState = false;
    readKey = false;
    lost(word);
  }
  if (document.querySelector('#desist').addEventListener('click', () => {
    gameState = false;
    readKey = false;
  }));
}

function removeAccents(text) {
  const sustitutions = {
    àáâãäå: "a",
    èéêë: "e",
    ìíîï: "i",
    òóôõö: "o",
    ùúûü: "u",
    "[": " ",
    "]": " ",
    "\"": " ",
  };
  function getLetterReplacement(letter, replacements) {
    const findKey = Object.keys(replacements).reduce(
      (origin, item, index) => (item.includes(letter) ? item : origin),
      false
    );
    return findKey !== false ? replacements[findKey] : letter;
  }
  return text
    .split("")
    .map((letter) => getLetterReplacement(letter, sustitutions))
    .join("")
    .trim();
}

const querySelNone = (selector) => document.querySelector(selector).style.display = 'none';
const querySelFlex = (selector) => document.querySelector(selector).style.display = 'flex';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const cleanScreen = () => {
  document.querySelector('.legR').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.legL').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armR').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armL').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.head').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  for (let i = 0; i < 10; i++) {
    if (document.getElementById(`line-${i}`).style.display = 'flex'){
      document.getElementById(`line-${i}`).innerHTML = '';
      document.getElementById(`line-${i}`).style.display = 'none';
    }
  }
  for (let i = 0; i < 6; i++) {
    if (document.getElementById(`part-${i}`).style.display = 'flex') {
      document.getElementById(`part-${i}`).style.display = 'none';
    }
  }
  document.querySelector('.pressedLetters').innerHTML = "";
}

const win = () => {
  setTimeout(showConfetti, 400);
  setTimeout(sfx.winMusic.play(), 400);
  showToast("success", "¡Ganaste &#128526!");
}

const lost = (word) => {
  document.querySelector('.legR').classList.add('animate__animated', 'animate__swing');
  document.querySelector('.legL').classList.add('animate__animated', 'animate__swing');
  document.querySelector('.armR').classList.add('animate__animated', 'animate__swing');
  document.querySelector('.armL').classList.add('animate__animated', 'animate__swing');
  document.querySelector('.head').classList.add('animate__animated', 'animate__swing');
  setTimeout(sfx.lostMusic.play(), 400);
  showToast("error", `¡Perdiste &#128546! La palabra era: ${word}`);
}

const isEmptyText = (text) => {
  if (text === "" || text === " ") {
    showToast("info", "Ingrese una palabra");
    return false
  }
  return true
}

const letters_accents = "áéíóúý";
const isThereAccents = (text) => {
  for (let i = 0; i < text.length; i++) {
    if (letters_accents.includes(text[i])) {
      showToast("info", "No se permiten acentos");
      return false
    }
  }
  return true
}

const isThereNums = (text) => {
  if (text.match(/[0-9]/g)) {
    showToast("info", "No se permiten números");
    return false;
  }
  return true;
}

const showConfetti = () => {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    confettiNumber: 2000,
  });
}

const showToast= (icon, message) => {
  const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
  });
  Toast.fire({
      icon: icon,
      title: message,
  });
}

var sfx = {
  winMusic: new Howl({
    src: ["assets/sounds/win.mp3"],
  }),
  lostMusic: new Howl({
    src: ["assets/sounds/lost.mp3"],
  }),
  correct: new Howl({
    src: ["assets/sounds/correct.mp3"],
  }),
  incorrect: new Howl({
    src: ["assets/sounds/incorrect.mp3"],
  }),
}