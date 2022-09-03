const words = ["alegre", "correr", "generar", "estirar", "mudar", "gritar", "cantar", "atlas", "tierra", "mar", "cielo"];

const startGame = () => {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let pressed = [];
  let error = 0;
  let count = 0;
  let readKey = true;
  document.querySelector(".first-screen").style.display = 'none';
  document.querySelector(".game-container").style.display = 'flex';
  document.querySelector(".foot").style.display = 'none';
  for (let i = 0; i < randomWord.length; i++) {
    document.getElementById(`line-${i}`).style.display = 'flex';
  }
  handleGame(randomWord, pressed, error, count, readKey);
}

const handleGame = (word, pressed, error, count, readKey) => {
  document.addEventListener("keydown", (event) => {
    if (readKey){
      let keyValue = event.key;
      let capitalLetters = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      if (capitalLetters.includes(keyValue)) keyValue = keyValue.toLowerCase();
      if (lowerLetters.includes(keyValue)) {
        if(!pressed.includes(keyValue)) {
          pressed.push(keyValue);
          if (word.includes(keyValue)) {
            for (let i = 0; i < word.length; i++) {
              if (word[i] === keyValue) {
                document.getElementById(`line-${i}`).innerHTML = keyValue;
                count++;
              }
            }
          } else {
            document.querySelector('.pressedLetters').innerHTML += keyValue;
            document.getElementById(`part-${error}`).style.display = 'flex';
            error++;
          }
        }else{
          enteredLetter();
        }
      } else {
          JustLetters();
      }
      if (count === word.length) {
        readKey = false;
        isWin();
      }
      if (error === 6) {
        readKey = false;
        isLost(word);
      }
      if (document.querySelector('#desist').addEventListener('click', () => {
        readKey = false;
      }));
    }
  }, false);
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
    if(!words.includes(word)) {
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
  document.querySelector('.pressedLetters').innerHTML = '';
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
}

const isWin = () => {
  Swal.fire({
    title: "¡Ganaste Felicidades!",
    color: '#6e0a71',
    showConfirmButton: 'Ok',
  })
}

const isLost = (word) => {
  Swal.fire({
    title: 'Fin del juego',
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