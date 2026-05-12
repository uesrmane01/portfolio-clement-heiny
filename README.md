# Portfolio - Clément Heiny

Portfolio moderne et responsive pour Clément Heiny, étudiant en BTS SIO option SISR.

## 🚀 Fonctionnalités

### Structure du site
- **Accueil** : Présentation personnelle avec emplacement pour CV
- **Expérience professionnelle** : Détail du stage chez My mobility
- **Veille technologique** : Section pour les actualités technologiques
- **Tableau de compétences** : Espace pour le tableau de compétences détaillé

### Caractéristiques techniques
- Design moderne et épuré
- Animations CSS fluides et sobres
- Navigation par onglets intuitive
- Responsive design (mobile, tablette, desktop)
- Accessibilité optimisée
- Performances optimisées

## 📁 Structure des fichiers

```
site portfolio/
├── index.html          # Page principale
├── style.css          # Styles et animations
├── script.js          # Interactions JavaScript
├── README.md          # Documentation
└── assets/            # Dossier pour les PDF et images
    ├── cv.pdf         # Votre CV (à ajouter)
    └── tableau-competences.pdf  # Tableau de compétences (à ajouter)
```

## 🛠️ Installation et utilisation

### 1. Ajouter vos fichiers PDF

1. Créez un dossier `assets` dans le répertoire principal
2. Placez votre CV dans `assets/cv.pdf`
3. Placez votre tableau de compétences dans `assets/tableau-competences.pdf`

### 2. Configurer les liens PDF

Ouvrez `script.js` et modifiez les lignes suivantes :

```javascript
// Ligne environ 65
if (buttonText.includes('CV')) {
    showNotification('Téléchargement du CV en cours...', 'info');
    window.open('assets/cv.pdf', '_blank');  // Décommentez cette ligne
} else if (buttonText.includes('tableau')) {
    showNotification('Ouverture du tableau de compétences...', 'info');
    window.open('assets/tableau-competences.pdf', '_blank');  // Décommentez cette ligne
}
```

### 3. Personnaliser le contenu

#### Modifier les informations personnelles
Éditez `index.html` dans la section "À propos de moi" pour mettre à jour :
- Votre nom et prénom
- Votre formation
- Votre description personnelle

#### Mettre à jour l'expérience
Modifiez la section "Expérience professionnelle" pour :
- Ajouter la période exacte du stage
- Compléter les missions si nécessaire
- Ajouter d'autres expériences

#### Personnaliser la veille technologique
Dans la section "Veille technologique", vous pouvez :
- Ajouter des liens vers des articles
- Intégrer des flux RSS
- Ajouter des catégories supplémentaires

## 🎨 Personnalisation du design

### Couleurs
Les couleurs sont définies dans `style.css` avec des variables CSS :

```css
:root {
    --primary-color: #2563eb;    /* Bleu principal */
    --secondary-color: #1e40af;  /* Bleu foncé */
    --accent-color: #3b82f6;     /* Bleu clair */
    /* ... autres variables */
}
```

### Animations
Les animations sont configurées pour être sobres et professionnelles :
- Transitions fluides de 0.3s
- Animations au scroll
- Effets de hover subtils
- Chargement progressif des éléments

## 📱 Navigation

### Navigation au clavier
- `1` : Accueil
- `2` : Expérience
- `3` : Veille
- `4` : Compétences

### Navigation tactile
- Boutons adaptés pour mobile
- Swipe supporté sur les sections
- Menu responsive

## 🔧 Maintenance

### Mettre à jour la veille technologique
1. Ajoutez de nouvelles catégories dans `index.html`
2. Mettez à jour les liens et descriptions
3. Actualisez les icônes Font Awesome si nécessaire

### Ajouter de nouvelles expériences
1. Dupliquez le template `.experience-card`
2. Adaptez le contenu
3. Assurez-vous que les animations fonctionnent

## 🌐 Déploiement

### Pour un déploiement en ligne
1. Uploadez tous les fichiers sur votre hébergement
2. Vérifiez que les liens vers les PDF sont corrects
3. Testez la navigation sur différents appareils

### Pour GitHub Pages
1. Créez un dépôt GitHub
2. Uploadez les fichiers
3. Activez GitHub Pages dans les settings
4. Le site sera disponible à l'adresse : `votre-username.github.io/nom-du-repo`

## 📊 Optimisation

### Performance
- Images optimisées (WebP recommandé)
- CSS et JavaScript minifiés en production
- Lazy loading pour les images
- Cache navigateur configuré

### SEO
- Balises meta descriptives
- Structure sémantique HTML5
- URLs propres
- Alt text pour les images

## 🐛 Dépannage

### Problèmes courants
- **PDF ne s'ouvre pas** : Vérifiez le chemin dans `script.js`
- **Animations saccadées** : Vérifiez la performance du navigateur
- **Design cassé sur mobile** : Testez avec les outils de développement

### Support technique
Pour toute question ou modification :
- Vérifiez la console du navigateur pour les erreurs
- Testez sur différents navigateurs
- Consultez la documentation CSS et JavaScript

## 📝 Licence

Ce portfolio est créé pour Clément Heiny. 
Vous pouvez l'utiliser comme template pour vos propres projets.

---

**Créé avec ❤️ pour Clément Heiny**  
*BTS SIO option SISR*
