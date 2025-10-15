  
  
  
  
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

  // Map DOM div ids to fiskene array entries
  const idToIndex = {
    'klovnfisk': 0,
    'kejserfisk': 1,
    'pudsefisk': 2,
    'hugofisk': 3
  };

  function createOverlay(fish) {
    const backdrop = document.createElement('div');
    backdrop.className = 'fish-overlay-backdrop';

    const box = document.createElement('div');
    box.className = 'fish-overlay';

    const close = document.createElement('button');
    close.className = 'close-btn';
    close.textContent = 'Luk';
    close.addEventListener('click', () => document.body.removeChild(backdrop));

    const img = document.createElement('img');
    img.className = 'preview';
    img.src = fish.billede || fish.gif || '';
    img.alt = fish.navn;

    const title = document.createElement('h2');
    title.textContent = fish.navn;

    const art = document.createElement('div');
    art.className = 'meta';
    art.textContent = `Art: ${fish.art}`;

    const livret = document.createElement('div');
    livret.className = 'meta';
    livret.textContent = `Spiser: ${fish.livret}`;

    const stoerrelse = document.createElement('div');
    stoerrelse.className = 'meta';
    stoerrelse.textContent = `Max længde: ${fish.maxLaengde_cm} cm`;

    const akvarie = document.createElement('div');
    akvarie.className = 'meta';
    akvarie.textContent = `Egnet til akvarium: ${fish.akvarieegnet ? 'Ja' : 'Nej'}`;

    const lev = document.createElement('div');
    lev.className = 'meta';
    lev.textContent = `Levested: ${fish.levested.join(', ')}`;

    box.appendChild(close);
    box.appendChild(img);
    box.appendChild(title);
    box.appendChild(art);
    box.appendChild(livret);
    box.appendChild(stoerrelse);
    box.appendChild(akvarie);
    box.appendChild(lev);

    const clear = document.createElement('div');
    clear.className = 'clear';
    box.appendChild(clear);

    backdrop.appendChild(box);

    // clicking backdrop (outside box) closes overlay
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        document.body.removeChild(backdrop);
      }
    });

    return backdrop;
  }

  function bindFishClicks() {
    Object.keys(idToIndex).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        const fish = fiskene[idToIndex[id]];
        if (!fish) return;
        const overlay = createOverlay(fish);
        document.body.appendChild(overlay);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindFishClicks);
  } else {
    bindFishClicks();
  }
