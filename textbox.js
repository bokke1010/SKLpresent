let box;
let lindex = 0;
let line = 0;
let next = false;
names = ["Bokke", "Hatty", "", "", ""]
dialogue = ["Have a great birthday SKL!", "happy birthdayyyyyy : D", "TEST", "4th?", "Just testing, this is the last sentence"];

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
        clearTimeout();
        hidereminder();
        if(names[line] === ""){
          box.textContent = "* ";
        } else {
          box.textContent = names[line] + ": ";
        }
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
    if(names[line] === ""){
      box.textContent = "* " + dialogue[line];
    } else {
      box.textContent = names[line] + ": " + dialogue[line];
    }
    window.setTimeout(reminder, 1000);
  } else {
    box.textContent += dialogue[line][lindex];
    lindex++
    if (lindex == dialogue[line].length) {
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