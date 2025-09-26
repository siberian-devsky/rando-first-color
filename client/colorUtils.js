export function getColor(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertRgbToHex(currentColor) {
  const subString = currentColor.slice(4, currentColor.length - 1);
  const nums = subString.split(", ");

  const hexNums = nums.map((n) =>
    parseInt(n).toString(16).padStart(2, "0")
  );

  return "#" + hexNums.join("");
}

export function convertHexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

export async function getRandomColorsFromDb() {
    try {
        const response = await fetch ("http://localhost:8000/randomRainbow")
        const data = await response.json()

        // should be 10 (poor man's validation)
        if (!Array.isArray(data.rows) || data.rows.length !== 10) {
            throw new Error("Color data is malformed");
        }

        const gradient = `linear-gradient(to right, ${
            data.rows.map( (row, idx) => `${row.hex} ${idx * 10}%`).join(', ')
        })`
        
        const grandientBox = document.querySelector("#gradientBox")
        grandientBox.style.background = gradient;
        
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}