// DOM elements
const mainBox = document.querySelector("#mainBox");
const colorValue = document.querySelector("#colorValue");
const lockUnlock = document.querySelector("#lockUnlock");
const copy = document.querySelector("#clipboard");
const colorFormat = {
    button: document.querySelector("#colorFormat"),
    mode: "rgb" | "hex",
    value: colorValue,
};

// history buttons
const history = [];
for (let i = 0; i < 5; i++) {
    const button = document.getElementById(i.toString());
    history.push({
        button: button,
        filled: false,
        color: "rgb(0, 0, 0)",
    });
}

// get random color()
function getColor(min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// click helper - main button only
async function clickListener() {
    const color = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
    mainBox.style.background = color;
    colorValue.textContent = color;
    copy.style.background = color;

    // update history
    updateHistory(color);

    // get hex this will always be hex because click generates rgb
    const hex = convertColorFormat(color)

    // send it to the db
    const response = await fetch("http://localhost:8000/colors", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rgb: color, hex: hex }),
    });
}

// clipboard
function copyToClipboard() {
    const value = colorValue.textContent;
    navigator.clipboard.writeText(value);
}

// lock color
let locked = false;
function toggleLock() {
    locked = !locked;
    if (locked) {
        mainBox.removeEventListener("click", clickListener);
        lockUnlock.innerHTML = "UNLOCK";
        lockUnlock.style.color = "red";
    } else {
        mainBox.addEventListener("click", clickListener);
        lockUnlock.innerHTML = "LOCK";
        lockUnlock.style.color = "black";
    }
}

// handle history buffer
function updateHistory(color) {
    // Step 1: shift colors backward (from index 3 down to 0)
    for (let i = history.length - 2; i >= 0; i--) {
        history[i + 1].color = history[i].color;
    }

    // Step 2: insert new color at the front
    history[0].color = color;

    // Step 3: update all button DOMs to match the history state
    history.forEach((h) => {
        h.button.style.background = h.color;
    });
}

// restore color from history to the main box
function restore(button) {
    mainBox.style.background = button.style.backgroundColor;
    // sync the copy button
    copy.style.backgroundColor = button.style.backgroundColor;
}

// update display only
function toggleColorFormatUi() {
    // get the current value
    const current = colorValue.innerHTML;

    const convertedValue = convertColorFormat(current)

    // toggle the button
    if (convertedValue.includes('#')) {
        // toggle button label
        colorFormat.button.innerHTML = "Show RGB";
    } else {    
        colorFormat.button.innerHTML = "Show HEX";
    }

    colorValue.innerHTML = convertedValue;
}

// just swap values
function convertColorFormat(currentColor) {
    if (currentColor.includes("rgb")) {
        // parse values
        let subString = currentColor.slice(4, currentColor.length - 1);

        const nums = subString.split(", ");

        // convert to hex
        hexNums = nums.map((n) => {
            return parseInt(n).toString(16).padStart(2, "0");
        });

        const convertedHex = "#" + hexNums.join("");

        return convertedHex;
    } else {
        const r = currentColor.slice(1, 3);
        const g = currentColor.slice(3, 5);
        const b = currentColor.slice(5, 7);

        const convertedRgb = `rgb(
            ${parseInt(r, 16)}, 
            ${parseInt(g, 16)}, 
            ${parseInt(b, 16)}
        )`;

        return convertedRgb;
    }
}

// attach event listener
mainBox.addEventListener("click", clickListener);
