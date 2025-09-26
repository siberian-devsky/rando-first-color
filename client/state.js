export const history = [];
export const colorFormat = {
  button: null,
  value: null,
  showAsRgb: true,
};
export let locked = false;

export function toggleLocked() {
  locked = !locked;
  return locked;
}
