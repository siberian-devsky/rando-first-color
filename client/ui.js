import { history, colorFormat, toggleLocked } from "./state.js";
import { convertRgbToHex } from "./colorUtils.js";

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

export function restore(historyItem, mainBox, colorValue, copy) {
  mainBox.style.background = historyItem.color;
  colorValue.innerHTML = historyItem.color;
  copy.style.backgroundColor = historyItem.color;
}

export function toggleLock(mainBox, clickListener, lockUnlock) {
  const locked = toggleLocked();
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

export function toggleColorFormatUi(colorValue, copy) {
  const current = history[0].color; // SST: always RGB
  const displayColor = colorFormat.showAsRgb
    ? convertRgbToHex(current)
    : current;

  colorFormat.showAsRgb = !colorFormat.showAsRgb;

  colorValue.innerHTML = displayColor;
  copy.style.backgroundColor = displayColor;
  colorFormat.button.innerHTML = colorFormat.showAsRgb
    ? "Show HEX"
    : "Show RGB";
}
