#!/usr/bin/env node

// import modules
const blessed = require("blessed");
const figlet = require("figlet");

// set screen
const screen = blessed.screen({
  smartCSR: true,
  title: "shws",
  fullUnicode: true,
});

// set bear :)
// art by Joan G. Stark
const bearArt = [
  "                  _         _",
  ' .-""-.          ( )-"```"-( )          .-""-.',
  "/ O O  \\          /         \\          /  O O \\",
  "|O .-.  \\        /   0 _ 0   \\        /  .-. O|",
  "\\ (   )  '.    _|     (_)     |     .'  (   ) /",
  " '.`-'     '-./ |             |`\\.-'     '-'.'",
  "   \\         |  \\   \\     /   /  |         /",
  "    \\        \\   '.  '._.'  .'   /        /",
  "     \\        '.   `'-----'`   .'        /",
  "      \\   .'    '-._        .-'\\   '.   /",
  "       |/`          `'''''')    )    `\\|",
  "       /                  (    (      ,\\",
  "      ;                    \\    '-..-'/ ;",
  "      |                     '.       /  |",
  "      |                       `'---'`   |",
  "      ;                                 ;",
  "       \\                               /",
  "        `.                           .'",
  "          '-._                   _.-'",
  "           __/`\"  '  - - -  '  \"`\ \\__",
  "         /`            /^\\           `\\",
  "         \\(          .'   '.         )/",
  "          '.(__(__.-'       '.__)__).'",
].join("\n");

// set time
const timeElement = blessed.box({
  top: 2,
  left: "center",
  width: "80%",
  height: 6,
  align: "center",
  content: "Cant load your time :(",
  style: { fg: "white" },
});

// set bear box
const bear = blessed.box({
  top: Math.floor(screen.height - 25),
  left: 0,
  content: bearArt,
  tags: false,
  style: { fg: "yellow" },
});

// set help container
const helpContainer = blessed.box({
  bottom: 0,
  left: 0,
  width: "100%",
  height: 1,
  style: { bg: "black" },
});

// make container for help
blessed.box({
  parent: helpContainer,
  content: "Press q or Esc to exit",
  bottom: 0,
  left: 0,
  width: "70%",
  height: 1,
  style: {
    fg: "white",
    bg: "black",
  },
});

// make container for copyright
blessed.box({
  parent: helpContainer,
  content: "Art by Joan G. Stark",
  bottom: 0,
  left: "70%",
  width: "30%",
  height: 1,
  align: "right",
  style: {
    fg: "white",
    bg: "black",
  },
});

// show it all
screen.append(timeElement);
screen.append(bear);
screen.append(helpContainer);

// update time function
function updateTime() {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`.replaceAll(
    "",
    " ",
  );

  try {
    timeElement.setContent(
      figlet.textSync(timeStr, {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      }),
    );
  } catch (e) {
    timeElement.setContent(timeStr);
  }

  screen.render();
}

// set variables and consts for bear movement
let bearX = 0;
let bearMovingRight = true;
const bearWidth = 55;
const bearSpeed = 0.6;
let isPaused = false;

// move bear
function moveBear() {
  if (isPaused) return;

  if (bearMovingRight) {
    bearX += bearSpeed;
    if (bearX >= screen.width - bearWidth) {
      bearMovingRight = false;
    }
  } else {
    bearX -= bearSpeed;
    if (bearX <= 0) {
      bearMovingRight = true;
    }
  }

  bear.left = Math.floor(bearX);
  screen.render();
}

// space listener to stop bear :(
screen.key(["space"], () => {
  isPaused = !isPaused;
  screen.render();
});

// escape listener to exit
screen.key(["escape", "q", "й", "C-c"], () => {
  clearInterval(timeInterval);
  clearInterval(bearInterval);
  return process.exit(0);
});

// update time
updateTime();
const timeInterval = setInterval(updateTime, 1000);
const bearInterval = setInterval(moveBear, 16);

// thats all folks!
screen.render();
