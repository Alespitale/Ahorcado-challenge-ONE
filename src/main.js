const letters_accents = "áéíóúý";

const startGame = () => {
  document.querySelector(".first-screen").style.display = 'none';
  document.querySelector(".game-container").style.display = 'flex';
  document.querySelector(".footer").style.display = 'none';
}

const addWord = () => {
  document.querySelector(".first-screen").style.display = 'none';
  document.querySelector(".addWord-container").style.display = 'flex';
  document.querySelector(".footer").style.display = 'none';
}

const newGame = () => {
  document.querySelector(".game-container").style.display = 'none';
  document.querySelector(".first-screen").style.display = 'flex';
  document.querySelector(".footer").style.display = 'flex';
}

const desist = () => {
  document.querySelector(".footer").style.display = 'flex';
  newGame();
}

const saveAndStart = () => {
  let word = document.getElementById("input-word").value;
  if (isEmptyText(word) && isThereAccents(word) && isThereNums(word)) {
    word = word.toUpperCase();
    //let wordArray = word.split("");
    document.querySelector(".footer").style.display = 'flex';
    document.getElementById("input-word").value = "";
    document.querySelector(".addWord-container").style.display = 'none';
    document.querySelector(".game-container").style.display = 'flex';
  }
}

const cancel = () => {
  document.querySelector(".footer").style.display = 'flex';
  document.getElementById("input-word").value = "";
  document.querySelector(".addWord-container").style.display = 'none';
  document.querySelector(".first-screen").style.display = 'flex';
}

const isEmptyText = (text) => {
  if (text === ""|| text === " ") {
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

const isThereAccents = (text) => {
  for(let i = 0; i < text.length; i++) {
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