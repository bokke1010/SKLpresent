let box;
let lindex = 0;
let line = 0;
let next = false;
names = ["Bokke", "Hatty", "", "", ""]
dialogue = ["Have a great birthday SKL!", "happy birthdayyyyyy : D", "TEST", "4th?", "Just testing, this is the last sentence"];

function starttb() {
  box = document.getElementById("textbox");
  startmessage();
  addLetter();
  document.addEventListener('keypress', pressedZ);
}

function startmessage() {
  if(names[line] === ""){
    box.textContent = "* ";
  } else {
    box.textContent = names[line] + ": ";
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
  if (next) {
    startmessage();
    box.textContent += dialogue[line];
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