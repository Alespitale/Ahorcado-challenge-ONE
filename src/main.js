const words = ["alegre", "correr", "generar", "estirar", "mudar", "gritar", "cantar", "atlas", "tierra", "mar", "cielo"];
let word = words[Math.floor(Math.random() * words.length)];
let pressed = [];
let error = 0;
let count = 0;
let readKey = true;
let gameState = true;

window.onload = () => {
  document.addEventListener('keydown', (event) => { playDesktop(event) });
}

const startGame = () => {
  for (let i = 0; i < word.length; i++) {
    document.getElementById(`line-${i}`).style.display = 'flex';
  }
  document.querySelector(".first-screen").style.display = 'none';
  document.querySelector(".game-container").style.display = 'flex';
  document.querySelector(".foot").style.display = 'none';
  cleanScreen();
}

const handleLetterBtn = (value) => {
  playMobile(value);
}

const playMobile = (value) => {
  if (gameState) {
    if (!pressed.includes(value)) {
      pressed.push(value);
      if (word.includes(value)) {
        for (let i = 0; i < word.length; i++) {
          if (word[i] === value) {
            document.getElementById(`line-${i}`).innerHTML = value;
            correctLetter();
            count++;
          }
        }
      } else {
        document.querySelector('.pressedLetters').innerHTML += value + '-';
        document.getElementById(`part-${error}`).style.display = 'flex';
        incorrectLetter();
        error++;
      }
    } else {
      enteredLetter();
    }
    if (count === word.length) {
      gameState = false;
      win();
    }
    if (error === 6) {
      gameState = false;
      lost(word);
    }
    if (document.querySelector('#desist').addEventListener('click', () => {
      gameState = false;
    }));
  }
}

const playDesktop = (event) => {
  if (readKey) {
    let keyValue = event.key;
    let capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    if (capitalLetters.includes(keyValue)) keyValue = keyValue.toLowerCase();
    if (lowerLetters.includes(keyValue)) {
      if (!pressed.includes(keyValue)) {
        pressed.push(keyValue);
        if (word.includes(keyValue)) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] === keyValue) {
              document.getElementById(`line-${i}`).innerHTML = keyValue;
              correctLetter();
              count++;
            }
          }
        } else {
          document.querySelector('.pressedLetters').innerHTML += keyValue + '-';
          document.getElementById(`part-${error}`).style.display = 'flex';
          incorrectLetter();
          error++;
        }
      } else {
        enteredLetter();
      }
    } else {
      JustLetters();
    }
    if (count === word.length) {
      readKey = false;
      win();
    }
    if (error === 6) {
      readKey = false;
      lost(word);
    }
    if (document.querySelector('#desist').addEventListener('click', () => {
      readKey = false;
    }));
  }
}

const newGame = () => {
  cleanScreen();
  startGame();
}

const addWord = () => {
  document.querySelector(".first-screen").style.display = 'none';
  document.querySelector(".addWord-container").style.display = 'flex';
  document.querySelector(".foot").style.display = 'none';
}

const desist = () => {
  document.querySelector(".game-container").style.display = 'none';
  document.querySelector(".first-screen").style.display = 'flex';
  document.querySelector(".foot").style.display = 'flex';
  cleanScreen();
}

const save = () => {
  let word = document.getElementById("input-word").value;
  if (isEmptyText(word) && isThereAccents(word) && isThereNums(word)) {
    if (!words.includes(word)) {
      word = word.toLowerCase();
      words.push(word);
      Swal.fire({
        title: "¡Palabra agregada!",
        color: '#6e0a71',
        showConfirmButton: 'Ok',
      })
      document.getElementById("input-word").value = "";
    }
  }
}

const cancel = () => {
  document.querySelector(".foot").style.display = 'flex';
  document.getElementById("input-word").value = "";
  document.querySelector(".addWord-container").style.display = 'none';
  document.querySelector(".first-screen").style.display = 'flex';
}

const cleanScreen = () => {
  word = words[Math.floor(Math.random() * words.length)];
  pressed = [];
  error = 0;
  count = 0;
  readKey = true;
  gameState = true;
  document.querySelector('.legR').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.legL').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armR').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armL').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.head').classList.remove('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  for (let i = 0; i < 7; i++) {
    if (document.getElementById(`line-${i}`).style.display = 'flex')
      document.getElementById(`line-${i}`).innerHTML = '';
    document.getElementById(`line-${i}`).style.display = 'none';
  }
  for (let i = 0; i < 6; i++) {
    if (document.getElementById(`part-${i}`).style.display = 'flex') {
      document.getElementById(`part-${i}`).style.display = 'none';
    }
  }
  for (let i = 0; i < word.length; i++) {
    document.getElementById(`line-${i}`).style.display = 'flex';
  }
  document.querySelector('.pressedLetters').innerHTML = "";
  // document.querySelector('.pressedLetters').value = "";
}

const show_confetti = () => {
  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    confettiNumber: 2000,
  });
}

const correctLetter = () => {
  let correctSound = new Howl({
    src: [
      "./assets/sounds/correct.mp3",
    ],
    html5: true,
  });
  correctSound.play();
}

const incorrectLetter = () => {
  let incorrectSound = new Howl({
    src: [
      "./assets/sounds/incorrect.mp3",
    ],
    html5: true,
  });
  incorrectSound.play();
}

const winMusic = () => {
  let winSound = new Howl({
    src: [
      "./assets/sounds/win.mp3",
    ],
    html5: true,
  });
  winSound.play();
}

const lostMusic = () => {
  let lostSound = new Howl({
    src: [
      "./assets/sounds/lost.mp3",
    ],
    html5: true,
  });
  lostSound.play();
}

const win = () => {
  setTimeout(show_confetti, 400);
  setTimeout(winMusic, 400);
  Swal.fire({
    title: "¡Ganaste &#128526!",
    color: '#6e0a71',
    showConfirmButton: 'Ok',
  })
}

const lost = (word) => {
  document.querySelector('.legR').classList.add('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.legL').classList.add('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armR').classList.add('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.armL').classList.add('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  document.querySelector('.head').classList.add('animate__animated', 'animate__swing', 'animate__delay-2s', '2s');
  setTimeout(lostMusic, 400);
  Swal.fire({
    title: 'Fin del juego &#128547;',
    text: `Perdiste. La palabra era: ${word}`,
    color: '#6e0a71',
    confirmButtonText: 'Ok'
  })
}

const enteredLetter = () => {
  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Ya ingresaste esta letra",
    showConfirmButton: false,
    timer: 1000,
  });
}

const JustLetters = () => {
  Swal.fire({
    title: 'Solo se permiten letras',
    color: '#6e0a71',
    confirmButtonText: 'Ok'
  })
}

const isEmptyText = (text) => {
  if (text === "" || text === " ") {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Ingrese la palabra",
      showConfirmButton: false,
      timer: 1600,
    });
    return false
  }
  return true
}

const letters_accents = "áéíóúý";
const isThereAccents = (text) => {
  for (let i = 0; i < text.length; i++) {
    if (letters_accents.includes(text[i])) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No se permiten acentos",
        showConfirmButton: false,
        timer: 1600,
      });
      return false
    }
  }
  return true
}

const isThereNums = (text) => {
  if (text.match(/[0-9]/g)) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "No se permiten números.",
      showConfirmButton: false,
      timer: 1600,
    });
    return false;
  }
  return true;
}