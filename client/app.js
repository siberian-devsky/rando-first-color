import { getColor, convertRgbToHex } from "./colorUtils.js";
import { history, colorFormat } from "./state.js";
import { updateHistory, restore, toggleLock, toggleColorFormatUi } from "./ui.js";

// DOM refs
const mainBox = document.querySelector("#mainBox");
const colorValue = document.querySelector("#colorValue");
const lockUnlock = document.querySelector("#lockUnlock");
const copy = document.querySelector("#clipboard");
colorFormat.button = document.querySelector("#colorFormat");
colorFormat.value = colorValue;

// history setup
for (let i = 0; i < 5; i++) {
  const button = document.getElementById(`history${i}`);
  history.push({ button, filled: false, color: "rgb(0, 0, 0)" });
  button.addEventListener("click", () => restore(history[i], mainBox, colorValue, copy));
}

// click handler
async function clickListener() {
  const color = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
  mainBox.style.background = color;
  colorValue.textContent = color;
  copy.style.background = color;

  updateHistory(color);

  // send rgb + hex to the db
  const hex = convertRgbToHex(color);
  await fetch("http://localhost:8000/colors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rgb: color, hex }),
  });
}

// wire up events
mainBox.addEventListener("click", clickListener);
lockUnlock.addEventListener("click", () =>
  toggleLock(mainBox, clickListener, lockUnlock)
);
colorFormat.button.addEventListener("click", () =>
  toggleColorFormatUi(colorValue, copy)
);
