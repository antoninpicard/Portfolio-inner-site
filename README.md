# Portfolio Inner Site

## Description
Portfolio personnel inspiré de l'interface Windows 95, développé avec React et TypeScript. Le site présente mes projets et compétences en développement web dans une interface rétro et interactive.

## Fonctionnalités
- 🖥️ Interface Windows 95
- 🎮 Mini-jeux intégrés (Wordle, Oregon Trail)
- 📂 Navigation par fenêtres
- 🎵 Lecteur de musique intégré
- 🎨 Animations et transitions fluides
- 💾 Easter eggs cachés

## Technologies Utilisées
### Frontend
- React 17
- TypeScript
- HTML5/CSS3
- JavaScript

### Librairies
- Framer Motion (animations)
- React Router DOM
- js-dos (émulation DOS)
- CSS Modules

## Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation
```bash
# Cloner le repository
git clone https://github.com/antoninpicard/Portfolio-inner-site.git

# Accéder au dossier
cd Portfolio-inner-site

# Installer les dépendances
npm install
# ou
yarn install

# Lancer le serveur de développement
npm start
# ou
yarn start
```

## Structure du Projet
```
├── public/
│   └── js-dos/        # Fichiers d'émulation DOS
├── src/
│   ├── assets/        # Images, icônes et ressources
│   ├── components/    # Composants React
│   │   ├── applications/  # Applications fenêtrées
│   │   ├── os/           # Composants système
│   │   ├── showcase/     # Pages de présentation
│   │   └── wordle/       # Jeu Wordle personnalisé
│   ├── constants/     # Constantes et configurations
│   └── hooks/         # Hooks React personnalisés
├── package.json
└── README.md
```

## Scripts Disponibles
- `npm start` : Lance le serveur de développement
- `npm build` : Crée une version de production
- `npm test` : Lance les tests
- `npm eject` : Éjecte la configuration CRA

## Contact
Pour plus d'informations ou collaborations :
- GitHub: [@antoninpicard](https://github.com/antoninpicard)

## Licence
Ce projet est sous licence MIT.

---
Made with ❤️ by Antonin
