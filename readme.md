# Web-based Learning Game met Pose Tracking

## Over dit project

Dit project is ontworpen om een interactieve en boeiende leeromgeving te creëren door middel van webgebaseerde spellen. Dankzij de integratie van pose-tracking via MediaPipe wordt een unieke gebruikerservaring geboden. Het project is bedoeld voor educatieve spellen die gebruik maken van beweging als invoermethode.


## Gebruikte Technologieën

- **MediaPipe**: Voor het uitvoeren van pose-tracking in real-time.
- **Three.js**: Een bibliotheek voor het creëren van 3D-graphics in de browser.
- **TypeScript**: Een superset van JavaScript die type-checking toevoegt.
- **canvas framework**: voor 2de games": een framework voor 2d spellen op de web.



## Project Structuur

De codebase is georganiseerd in verschillende lagen om een schone en modulaire structuur te behouden.

```plaintext
-p
- dist/
- src/
  - 2dGame/
  - presentation/
  - controlLayer/
  - example_game_three.js/
  - mediaPipeLayer
  - controlLayer
- tests/
  - unit/
  - integration/
- public/
  -css
  -index.html
```

# Ontwikkelingsworkflow

## Branching en Pull Requests

1. **Nieuwe Branch**: Maak altijd een nieuwe branch aan vanuit de dev-branch voor het werken aan nieuwe features of bugfixes.
2. **Code Review**: Na afronding van de werkzaamheden, maak een Pull Request (PR) aan. Andere teamleden kunnen deze PR dan reviewen.
3. **Merging**: Na goedkeuring van de PR kan deze gemerged worden met de dev-branch.

## Unit Tests

Elke nieuwe klasse moet vergezeld gaan van een unit test. Dit zorgt voor een robuustere codebase en maakt toekomstige wijzigingen veiliger.

# Hoe bij te dragen

1. Fork deze repository.
2. Clone je fork lokaal.
3. Maak een nieuwe branch voor je wijzigingen.
4. Push je wijzigingen terug naar je fork op GitHub.
5. Maak een pull request naar de oorspronkelijke repository.

# Installatie en Setup

## Vereisten

- Node.js en npm

## Installatie

1. Clone de repository: git clone https://github.com/growthmovesFontys/GrowthMoves.git
2. Navigeer naar de projectmap: cd locatie_van_clone
3. Installeer de benodigde npm pakketten (die staan al in de package.json):

```bash
npm install
```

## Webpack

We gebruiken Webpack om de TypeScript code te bundelen.

1. Compileer het project met Webpack: npm run build
2. Voeg de bundle.js toe aan je index.html:

```html
<script src="path/to/bundle.js"></script>
```

# Licentie

Dit project valt onder de MIT-licentie - zie het LICENSE.md bestand voor details.
