import { history, colorFormat, toggleLocked } from "./state.js";
import { convertHexToRgb, convertRgbToHex } from "./colorUtils.js";

export function updateHistory(color) {
    for (let i = history.length - 2; i >= 0; i--) {
        history[i + 1].color = history[i].color;
    }
    history[0].color = color;
    history.forEach((h) => {
        h.button.style.background = h.color;
        h.filled = true;
    });
}

export function restore(historyItem, mainBox, colorValue, copyBtn) {
    mainBox.style.backgroundColor = historyItem.color;
    colorValue.innerHTML = historyItem.color;
    copyBtn.style.backgroundColor = historyItem.color;
}

export function toggleLock(mainBox, clickListener, lockUnlockBtn) {
    const locked = toggleLocked();
    if (locked) {
        mainBox.removeEventListener("click", clickListener);
        lockUnlockBtn.innerHTML = "UNLOCK";
        lockUnlockBtn.style.color = "red";
    } else {
        mainBox.addEventListener("click", clickListener);
        lockUnlockBtn.innerHTML = "LOCK";
        lockUnlockBtn.style.color = "black";
    }
}

export function toggleColorFormatUi(colorValue, copyBtn) {
    // defaults to true on load
    colorFormat.showAsRgb = !colorFormat.showAsRgb;
    
    const current = colorValue.innerHTML; // whatever is currently displayed

    const displayColor = colorFormat.showAsRgb
        ? convertHexToRgb(current)
        : convertRgbToHex(current);
    
    colorValue.innerHTML = displayColor;
    copyBtn.style.backgroundColor = displayColor;
    colorFormat.button.innerHTML = colorFormat.showAsRgb
        ? "Show HEX"
        : "Show RGB";
}
