let box;
let lindex = 0;
let pindex = 0;
let line = -1;
let next = true;
dialogue = [];
dialogue.push(create_text("Bokke", "Have a great birthday SKL!|I hope you like my present, put a lot of work into this! Huge thanks to the others for their contributions too!"));
dialogue.push(create_text("Hatty", "happy birthdayyyyyy : D"));
dialogue.push(create_text("Cellist", "A very big happy birthday SKL! Thank you for always being so kind and understanding, hope your birthday is awesome!"));
dialogue.push(create_text("BananaSplitz", "Happy Birthday SKL!!! Thamks for being so cool all the time, I hope this birthday is the best one yet! Prepare to be bombarded with gifts >:D"));
dialogue.push(create_text("beril", "Enjoy the celebration of the number of times the world has revolved with you on it.|It is said that love makes the world go round, therefore today is a day about love.|May you be cherished evermore and may the happy memories you make today cheer you up when you feel bonetrousled.|Today is highly likely to have an Unexpected Party: a merry event with good food and cool friends to hang out with.|In conclusion: happy birthday, super kirbylover! May you have a joyous adjustment to adulthood!"));

let toc;
let audio;

function create_text(name, text) {
  obj = {};
  obj.name = name;
  obj.text = text.split("|");
  obj.len = obj.text.length;
  return obj;
}

function starttb() {
  audio = new Audio('blip.wav');
  box = document.getElementById("textbox");
  shuffleArray(dialogue);
  dialogue.push(create_text("", "If you want to congratulate SKL for their birthday using this page, just DM bokke1010, you can find me in the IF discord"));
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
        line = 0; // This is just to ensure the very first message gets shown too
        // adding this logic to the end doesn't work due to timed events relying on this information
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
  laudio.volume = 0.3;
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
  let skiphint = document.getElementById("skiphint");
  skiphint.style.visibility = "visible";
}

function hidereminder() {
  let skiphint = document.getElementById("skiphint");
  skiphint.style.visibility = "hidden";
}