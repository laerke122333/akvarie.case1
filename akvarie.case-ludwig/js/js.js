const objekt = document.getElementById("billede");
let x = window.innerWidth / 2 - 100;  // startposition (midten)
let y = window.innerHeight / 2 - 100; // startposition (midten)
let rotationY = 0;                    // startvinkel
const fart = 50;                      // hvor mange pixels den flytter sig

// / Sørg for at 'objekt' peger på billedet/elementet du vil flytte
// fx: const objekt = document.getElementById("billede");

// Startposition på skærmen
objekt.style.position = objekt.style.position || "absolute";
objekt.style.left = x + "px";
objekt.style.top = y + "px";

let target = { x, y };        // musens målposition (centreret under musen)
let smooth = 0.12;            // 0..1 — lavere = mere glidende

// Opdater mål, når musen flytter sig
document.addEventListener("mousemove", (e) => {
  // centrer objektet under cursoren
  const halfW = objekt.offsetWidth / 2 || 0;
  const halfH = objekt.offsetHeight / 2 || 0;

  target.x = e.clientX - halfW;
  target.y = e.clientY - halfH;

  // (valgfrit) skriv koordinater ud hvis du bruger #output
  const output = document.getElementById("output");
  if (output) output.textContent = `Mus: ${Math.round(e.clientX)}, ${Math.round(e.clientY)}`;
});

// Hjælpefunktion til at holde objektet inde på skærmen
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); } 

// Animations-loop: bevæg mod musen og opdater stil
function followMouse() {
  // glid mod mål
  x += (target.x - x) * smooth;
  y += (target.y - y) * smooth;

  // hold inden for vinduets kanter
  const maxX = window.innerWidth - (objekt.offsetWidth || 0);
  const maxY = window.innerHeight - (objekt.offsetHeight || 0);
  x = clamp(x, 0, maxX);
  y = clamp(y, 0, maxY);

  // vend mod musens vandrette retning
  if (Math.abs(target.x - x) > 0.5) {
    rotationY = (target.x < x) ? 180 : 0;
  }

  // anvend på elementet
  objekt.style.left = x + "px";
  objekt.style.top = y + "px";
  objekt.style.transform = `rotateY(${rotationY}deg)`;

  requestAnimationFrame(followMouse);
}

// Start animationen
followMouse();


//Hvis du vil have, at elementet ikke glider, men hopper direkte til musen, kan du skifte animations-loopet ud med en simpel opdatering inde i mousemove:





objekt.style.left = x + "px";
  objekt.style.top = y + "px";
  objekt.style.transform = `rotateY(${rotationY}deg)`;
  objekt.behavior

  output.textContent = "Du trykkede på: " + tast.toUpperCase();

  document.getElementById("billede").scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
// når man trykker på en tast
// document.addEventListener("keydown", function(event) {
//   const tast = event.key.toLowerCase();
//   const output = document.getElementById("output");

//   switch (tast) {
//     case "w": // op
//       y -= fart;
//       if (y < 0) y = 0;
//       break;

//     case "s": // ned
//       y += fart;
//       if (y > window.innerHeight - -2000) y = window.innerHeight - -2000;
//       break;


//     case "a": // venstre + roter
//       x -= fart;
//       if (x < 0) x = 0;
//       rotationY = 180; // vend mod venstre
//       break;

//     case "d": // højre + roter
//       x += fart;
//       if (x > window.innerWidth - 200) x = window.innerWidth - 200;
//       rotationY = 0; // vend mod højre
//       break;

//   }




  