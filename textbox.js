let box;
let lindex = 0;
let line = -1;
let next = true;
dialogue = [["Bokke", "Have a great birthday SKL!"], ["Hatty", "happy birthdayyyyyy : D"], ["", "Sentences are in a random order now!"], ["", "TEST"]];
// var audio;
let audio;

function starttb() {
  audio = new Audio('blip.wav')
  box = document.getElementById("textbox");
  shuffleArray(dialogue);
  document.addEventListener('keypress', pressedZ);
}

function startmessage() {
  if(dialogue[line][0] === ""){
    box.textContent = "* ";
  } else {
    box.textContent = dialogue[line][0] + ": ";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function pressedZ(key) {
  if (key.code === 'KeyZ') {
    if (next) {
      if (++line < dialogue.length) {
        clearTimeout();
        hidereminder();
        startmessage();
        lindex = 0;
        next = false;
        addLetter();
      }
    } else {
      next = true;
    }
  }
}

function addLetter() {
  let laudio = audio.cloneNode();
  laudio.play();

  if (next) {
    startmessage();
    box.textContent += dialogue[line][1];
    window.setTimeout(reminder, 1000);
  } else {
    box.textContent += dialogue[line][1][lindex];
    lindex++
    if (lindex == dialogue[line][1].length) {
      next = true;
      window.setTimeout(reminder, 1000);
    } else {
      window.setTimeout(addLetter, 40);
    }
  }
}

function reminder() {
  if (line < dialogue.length - 1) {
    let skiphint = document.getElementById("skiphint");
    skiphint.style.visibility = "visible";
  }
}

function hidereminder() {
  let skiphint = document.getElementById("skiphint");
  skiphint.style.visibility = "hidden";
}