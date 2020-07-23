let box;
let lindex = 0;
let pindex = 0;
let line = -1;
let next = true;
dialogue = [];
dialogue.push(create_text("Bokke", "Have a great birthday SKL!|I hope you like my present, put a lot of work into this!"));
dialogue.push(create_text("Hatty", "happy birthdayyyyyy : D"));
dialogue.push(create_text("Cellist", "A very big happy birthday SKL! Thank you for always being so kind and understanding, hope your birthday is awesome!"));
let toc;
let audio;

//["Bokke", "Have a great birthday SKL!"], ["Hatty", "happy birthdayyyyyy : D"], ["", "So I tried to get some collaboration in here, but people prefered to make their own stuff instead."], ["", "TEST"]

function create_text(name, text) {
  obj = {};
  obj.name = name;
  obj.text = text.split("|");
  obj.len = obj.text.length;
  console.log(obj);
  return obj;
}

function starttb() {
  audio = new Audio('blip.wav')
  box = document.getElementById("textbox");
  shuffleArray(dialogue);
  document.addEventListener('keypress', pressedZ);
}

function startmessage() {
  if(dialogue[line].name === ""){
    box.textContent = "* ";
  } else {
    box.textContent = dialogue[line].name + ": ";
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
      if (line >= 0) {
        if(pindex === dialogue[line].len - 1) {
          line++;
          pindex = 0;
        } else {
          pindex++;
        }
      } else {
        line = 0;
      }
      line = line % dialogue.length;
      clearTimeout(toc);
      hidereminder();
      startmessage();
      lindex = 0;
      next = false;
      addLetter();
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
    box.textContent += dialogue[line].text[pindex];
    toc = window.setTimeout(reminder, 1000);
  } else {
    box.textContent += dialogue[line].text[pindex][lindex];
    lindex++
    if (lindex == dialogue[line].text[pindex].length) {
      next = true;
      toc = window.setTimeout(reminder, 1000);
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