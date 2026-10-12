# Portfolio – Abdullah Osmani

Statische Portfolio-Website (HTML, CSS, JavaScript) ohne Build-Schritt.

## Ansehen

`index.html` im Browser öffnen – fertig.

## Anpassen

| Was                   | Wo                                                                |
|-----------------------|-------------------------------------------------------------------|
| Eigene Bilder         | In `images/` ablegen und in `index.html` die Platzhalter ersetzen |
| Titel / Angaben       | `<figcaption>` des jeweiligen Werks in `index.html`               |
| Kategorie eines Werks | Attribut `data-category` (`malerei`, `zeichnung`, `digital`)      |
| Über-mich-Text        | Abschnitt `#ueber` in `index.html`                                |
| Ausstellungen         | Abschnitt `#ausstellungen` in `index.html`                        |
| Kontakt-E-Mail        | `CONTACT_EMAIL` in `script.js` und der `mailto:`-Link im Footer   |
| Farben / Schriften    | Variablen in `:root` am Anfang von `styles.css`                   |

Ein Platzhalter-Werk wird so durch ein echtes Bild ersetzt:

```html
<figure class="work" data-category="malerei">
  <img src="images/werk-01.jpg" alt="Morgenlicht" loading="lazy">
  <figcaption><h3>Morgenlicht</h3><p>Öl auf Leinwand · 80 × 120 cm · 2025</p></figcaption>
</figure>
```

Mit `work--tall` (doppelt hoch) oder `work--wide` (doppelt breit) lässt sich das
Raster abwechslungsreicher gestalten.

## Veröffentlichen

Den Ordner `portfolio/` auf einen beliebigen statischen Hoster hochladen, z. B.
GitHub Pages, Netlify oder Vercel.
