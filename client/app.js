import { history, colorFormat } from "./state.js";
import {
    getColor,
    convertRgbToHex,
    copyToClipboard,
    getRandomColorsFromDb
} from "./colorUtils.js";
import {
    updateHistory,
    restore,
    toggleLock,
    toggleColorFormatUi,
} from "./ui.js";

// DOM refs
const mainBox = document.querySelector("#mainBox");
const colorValue = document.querySelector("#colorValue");
const lockUnlockBtn = document.querySelector("#lockUnlockBtn");
const copyBtn = document.querySelector("#clipboard");
const rainbowBtn = document.querySelector("#rainbowBtn")

// colorFormat state manager - handles the button
colorFormat.button = document.querySelector("#colorFormat");
colorFormat.value = colorValue;

// history setup
for (let i = 0; i < 5; i++) {
    const button = document.getElementById(`history${i}`);
    history.push({ button, filled: false, color: "rgb(0, 0, 0)" });
    button.addEventListener("click", () =>
        restore(history[i], mainBox, colorValue, copyBtn)
    );
}

// click handler
async function clickListener() {
    const color = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
    mainBox.style.background = color;
    colorValue.textContent = color;
    copyBtn.style.background = color;
    // reset the format btn text
    colorFormat.button.innerHTML = "Show Hex";

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
lockUnlockBtn.addEventListener("click", () =>
    toggleLock(mainBox, clickListener, lockUnlockBtn)
);
colorFormat.button.addEventListener("click", () =>
    toggleColorFormatUi(colorValue, copyBtn)
);
copyBtn.addEventListener("click", () => copyToClipboard(colorValue.innerHTML));
rainbowBtn.addEventListener("click", () => getRandomColorsFromDb())
