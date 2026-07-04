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

function updateDamageBonusAndBuild() {
  const forValue = Number(document.getElementById("for").value);
  const tamValue = Number(document.getElementById("tam").value);

  // Wait until both values exist
  if (!forValue || !tamValue) return;

  const total = forValue + tamValue;

  const bonusInput = document.getElementById("bonus-de-dano");
  const corpoInput = document.getElementById("corpo");

  if (total >= 2 && total <= 64) {
    bonusInput.value = "-2";
    corpoInput.value = "-2";
  } else if (total >= 65 && total <= 84) {
    bonusInput.value = "-1";
    corpoInput.value = "-1";
  } else if (total >= 85 && total <= 124) {
    bonusInput.value = "Nenhum";
    corpoInput.value = "0";
  } else if (total >= 125 && total <= 164) {
    bonusInput.value = "+1d4";
    corpoInput.value = "+1";
  } else if (total >= 165 && total <= 204) {
    bonusInput.value = "+1d6";
    corpoInput.value = "+2";
  }
}

function updateMaxMagic() {
  const pod = Number(document.getElementById("pod").value);

  if (!pod) return;

  document.getElementById("magia-maximo").value = Math.floor(pod / 5);
}

function updateUnarmedCombat() {
  document.getElementById("desarmado-regular").value = document.getElementById("lutar-brigar").value;
  document.getElementById("desarmado-dificil").value = document.getElementById("lutar-brigar-minor").value;
  document.getElementById("desarmado-extremo").value = document.getElementById("lutar-brigar-minor2").value;
}

document.querySelectorAll(".pericia").forEach(skill => {
  skill.addEventListener("input", () => {
    const value = Number(skill.value) || 0;

    const half = skill.nextElementSibling;
    const fifth = half.nextElementSibling;

    if (half && half.classList.contains("pericia-minor")) {
      half.value = Math.floor(value / 2);
    }

    if (fifth && fifth.classList.contains("pericia-minor")) {
      fifth.value = Math.floor(value / 5);
    }

    // Keep Fight (Brawl) synchronized with the weapon table
    if (skill.id === "lutar-brigar") {
      updateUnarmedCombat();
    }

    // Recalculate sanity if Cthulhu Mythos changed
    if (skill.id === "mythos-de-cthulhu") {
      updateSanity();
    }
  });
});

function updateNativeLanguage() {
  const edu = Number(document.getElementById("edu").value);

  const nativeLanguage = document.getElementById("lingua-natural");
  nativeLanguage.value = edu;

  // Update half and fifth values
  const half = document.getElementById("lingua-natural-minor");
  const fifth = document.getElementById("lingua-natural-minor2");

  if (half) half.value = Math.floor(edu / 2);
  if (fifth) fifth.value = Math.floor(edu / 5);
}

function updateDodge() {
  const des = Number(document.getElementById("des").value);

  const dodge = Math.floor(des / 2);

  document.getElementById("esquivar").value = dodge;
  document.getElementById("esquivar-minor").value = Math.floor(dodge / 2);
  document.getElementById("esquivar-minor2").value = Math.floor(dodge / 5);

  // Sync with the combat section
  document.getElementById("esquiva").value = dodge;
  document.getElementById("esquiva-minor").value = Math.floor(dodge / 2);
  document.getElementById("esquiva-minor2").value = Math.floor(dodge / 5);
}