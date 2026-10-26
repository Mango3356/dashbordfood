# La mia settimana — Meal planner

Una piccola web app mobile-friendly per consultare il menu settimanale, spuntare i pasti preparati e gestire la lista della spesa. Le spunte vengono salvate nel browser tramite localStorage.

## Pubblicarla con GitHub Pages

1. Crea un repository su GitHub, per esempio `dashboard-pasti`.
2. Carica tutti i file di questa cartella nella root del repository (`index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, `icon.svg`).
3. Nel repository apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**, seleziona `main` e `/ (root)`, quindi premi **Save**.
5. Attendi la pubblicazione e apri l'indirizzo mostrato da GitHub Pages, normalmente `https://TUO-UTENTE.github.io/dashboard-pasti/`.

## Aggiungerla alla schermata Home

- **iPhone (Safari):** apri il sito pubblicato → Condividi → Aggiungi alla schermata Home.
- **Android (Chrome):** apri il sito pubblicato → menu ⋮ → Aggiungi a schermata Home o Installa app.

Dopo il primo caricamento online, il service worker memorizza i file principali per l'uso offline. La prima visita deve avvenire online. Le spunte sono salvate localmente nel browser/dispositivo e non si sincronizzano automaticamente tra dispositivi.

## Test locale

Aprire `index.html` direttamente permette di provare la dashboard, ma installazione e cache offline richiedono un sito servito via HTTPS o un server locale.

Questa app è un organizzatore di pasti generico, non una dieta medica.
