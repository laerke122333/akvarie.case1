

const objekt = document.getElementById("akvariemanden");
let x = window.innerWidth / 2 - 100;  // startposition (midten)
let y = window.innerHeight / 2 - 100; // startposition (midten)
let rotationY = 0;                    // startvinkel
const fart = 50;                      // hvor mange pixels den flytter sig

// / Sørg for at 'objekt' peger på billede/elementet du vil flytte
// fx: const objekt = document.getElementById("akvariemanden");

// Startposition på skærmen
objekt.style.position = objekt.style.position || "absolute";
objekt.style.left = x + "px";
objekt.style.top = y + "px";

let target = { x, y };        // musens målposition (centreret under musen)
let smooth = 0.05;            // 0..1 — lavere = mere glidende


// Hjælpefunktion til at holde objektet inde på skærmen
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); } 

// Animations-loop: bevæg mod musen og opdater stil
function followMouse() {
  // glid mod mål
  x += (target.x - x) * smooth;
  y += (target.y - y) * smooth;

  // hold inden for vinduets kanter (synligt område)
  const maxX = window.innerWidth - (objekt.offsetWidth || 0) + window.scrollX;
  const maxY = window.innerHeight - (objekt.offsetHeight || 0) + window.scrollY;
  x = Math.max(window.scrollX, Math.min(maxX, x));
  y = Math.max(window.scrollY, Math.min(maxY, y));

  // vend mod musens vandrette retning
  if (Math.abs(target.x - x) > 0.5) {
    rotationY = (target.x < x) ? 180 : 0;
  }

  // anvend på elementet
  objekt.style.left = x + "px";
  objekt.style.top = y + "px";
  objekt.style.transform = `rotateY(${rotationY}deg)`;

  // *** kameraet følger objektet (centrér på det) ***
  window.scrollTo({
    left: x - window.innerWidth / 2 + (objekt.offsetWidth || 0) / 2,
    top:  y - window.innerHeight / 2 + (objekt.offsetHeight || 0) / 2,
    behavior: "auto" // eller "smooth" (kan føles træg i hvert frame)
  });

  requestAnimationFrame(followMouse);
}

// Start animationen
followMouse();

// Opdater mål, når musen flytter sig (brug scroll-offset)
document.addEventListener("mousemove", (e) => {
  const halfW = objekt.offsetWidth / 2 || 0;
  const halfH = objekt.offsetHeight / 2 || 0;

  target.x = e.clientX + window.scrollX - halfW;
  target.y = e.clientY + window.scrollY - halfH;

  const output = document.getElementById("output");
  if (output) output.textContent = `Mus: ${Math.round(target.x)}, ${Math.round(target.y)}`;
});



const fiskene = [
      {
        navn: 'Klovnfisk',
        art: 'Amphiprion ocellaris',
        livret: 'Små krebsdyr',
        levested: ['Det østlige Indiske Ocean', 'Australien', 'Indonesien'],
        maxLaengde_cm: 8,
        akvarieegnet: true,
        billede: 'img/klovnimg.png',
        gif: 'img/KlovnGif.gif'
      },
      {
        navn: 'Dværgkejser',
        art: 'Centropyge bicolor',
        livret: 'Små krebsdyr',
        levested: ['Det Indiske Ocean'],
        maxLaengde_cm: 8,
        akvarieegnet: true,
        billede: 'img/kejserimg.png',
        gif: 'img/KejserGif.gif'
      },
      {
        navn: 'Pudseffisk',
        art: 'Labroides dimidiatus',
        livret: 'Parasitter',
        levested: ['Det Indiske Ocean', 'Australien', 'Det Røde Hav', 'Indonesien', 'Stillehavet'],
        maxLaengde_cm: 11,
        akvarieegnet: true,
        billede: 'img/pudseimg.png',
        gif: 'img/PudseGif.gif'
      },
      {
        navn: 'Hugofisk',
        art: 'Salarias Faciatus',
        livret: 'Mikroalger',
        levested: ['Det Indiske Ocean', 'Australien', 'Japan', 'Det Røde Hav', 'Indonesien', 'Stillehavet'],
        maxLaengde_cm: 14,
        akvarieegnet: true,
        billede: 'img/hugoimg.png',
        gif: 'img/HugoGif.gif'
      },
    ];


 function visFiskInfo(fiskNavn) {
  const fisk = fiskene.find(f => f.navn === fiskNavn);
  if (!fisk) return;

  // Fyld info ind i overlayet
  document.getElementById("fiskNavn").textContent = fisk.navn;
  document.getElementById("fiskArt").textContent = fisk.art;
  document.getElementById("fiskLivret").textContent = fisk.livret;
  document.getElementById("fiskLevested").textContent = fisk.levested.join(", ");
  document.getElementById("fiskLaengde").textContent = fisk.maxLaengde_cm;
  document.getElementById("fiskAkvarie").textContent = fisk.akvarieegnet ? "Ja" : "Nej";
  document.getElementById("fiskBillede").src = fisk.billede;

  // Vis overlay
  document.getElementById("fisk-overlay").classList.remove("hidden");
}

// Luk overlayet
document.getElementById("close-overlay").addEventListener("click", () => {
  document.getElementById("fish-overlay").classList.add("hidden");
});

document.getElementById("klovnfisk").addEventListener("click", () => visFiskInfo("Klovnfisk"));
document.getElementById("kejserfisk").addEventListener("click", () => visFiskInfo("Dværgkejser"));
document.getElementById("pudsefisk").addEventListener("click", () => visFiskInfo("Pudseffisk"));
document.getElementById("hugofisk").addEventListener("click", () => visFiskInfo("Hugofisk"));





  