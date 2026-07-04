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

// Updates the three boxes for one attribute
function updateStat(id, value) {
  document.getElementById(id).value = value;
  document.getElementById(`${id}-top`).value = Math.floor(value / 2);
  document.getElementById(`${id}-bottom`).value = value / 5;

  updateMoveRate();
  updateMaxHealth();
  updateDamageBonusAndBuild();
  updateSanity();
  updateMaxMagic();
  updateNativeLanguage();
  updateDodge();
}

// Add click event to normal attributes
normalStats.forEach(id => {
  document.getElementById(id).addEventListener("click", () => {
    updateStat(id, rollNormal());
  });
});

// Add click event to special attributes
specialStats.forEach(id => {
  document.getElementById(id).addEventListener("click", () => {
    updateStat(id, rollSpecial());
  });
});

document.getElementById("mythos-de-cthulhu").addEventListener("input", updateSanity);
document.getElementById("sorte-atual").addEventListener("click", () => {
  document.getElementById("sorte-atual").value = rollNormal();
});

function updateMoveRate() {
  const forca = Number(document.getElementById("for").value);
  const destreza = Number(document.getElementById("des").value);
  const tamanho = Number(document.getElementById("tam").value);

  // Não calcula enquanto algum atributo ainda estiver vazio
  if (!forca || !destreza || !tamanho) return;

  let mov;

  if (forca < tamanho && destreza < tamanho) {
    mov = 7;
  } else if (forca > tamanho && destreza > tamanho) {
    mov = 9;
  } else {
    mov = 8;
  }

  document.getElementById("taxa-de-mov").value = mov;
}

function updateMaxHealth() {
  const con = Number(document.getElementById("con").value);
  const tam = Number(document.getElementById("tam").value);

  // Wait until both values exist
  if (!con || !tam) return;

  const maxHealth = Math.floor((con + tam) / 10);

  document.getElementById("vida-maxima").value = maxHealth;
}

function updateSanity() {
  const pod = Number(document.getElementById("pod").value);
  const mythos = Number(document.getElementById("mythos-de-cthulhu").value) || 0;

  const maxSanity = 99 - mythos;

  // Update maximum sanity
  document.getElementById("sanidade-maxima").value = maxSanity;

  // Current sanity starts from POD, but can't exceed the maximum
  if (pod) {
    document.getElementById("sanidade-atual").value = Math.min(pod, maxSanity);
  }
}