let box;
let lindex = 0;
let line = 0;
let next = false;
dialogue = ["Happy birthday SKL!", "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", "3rd?", "Just testing, this is the last sentence"];

function starttb() {
  box = document.getElementById("textbox");
  box.textContent = "* ";
  addLetter();
  document.addEventListener('keypress', pressedZ);
}

function pressedZ(key) {
  if (key.code === 'KeyZ') {
    if (next) {
      if (++line < dialogue.length) {
        console.log(line);
        box.textContent = "* ";
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
  if (next) {
    box.textContent = "* " + dialogue[line];
  } else {
    box.textContent += dialogue[line][lindex];
    lindex++
    if (lindex == dialogue[line].length) {
      next = true;
    } else {
      window.setTimeout(addLetter, 100);
    }
  }
}