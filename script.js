// Attributes that use 3d6 × 5
const normalStats = ["for", "des", "pod", "con", "apa"];

// Attributes that use (2d6 + 6) × 5
const specialStats = ["edu", "tam", "int"];

// Rolls one die
function d6() {
  return Math.floor(Math.random() * 6) + 1;
}

// Rolls 3d6 × 5
function rollNormal() {
  return (d6() + d6() + d6()) * 5;
}

// Rolls (2d6 + 6) × 5
function rollSpecial() {
  return (d6() + d6() + 6) * 5;
}