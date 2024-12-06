# Application de Gestion des Notes - Programmation Web

Cette application web permet de gérer efficacement les notes des étudiants avec une interface intuitive et des fonctionnalités avancées.

## Fonctionnalités Principales

### Gestion des Fichiers
- Import de fichier Excel contenant les données des étudiants
- Sauvegarde automatique des modifications dans le fichier Excel
- Export des notes en format Excel avec les notes finales calculées

### Gestion des Notes
- Affichage du matricule et nom de chaque étudiant
- Modification des notes pour :
  - Bonus
  - TD (Travaux Dirigés)
  - CC (Contrôle Continu)
  - TP (Travaux Pratiques)
  - Projet
  - Présence
- Calcul automatique des notes finales selon les pourcentages définis

### Interface Utilisateur
- Barre de recherche pour trouver rapidement un étudiant (par nom ou matricule)
- Configuration des pourcentages pour chaque type de note
- Boutons d'action clairs et bien organisés
- Interface responsive et moderne

## Structure du Fichier Excel
Le fichier Excel doit contenir les colonnes suivantes :
- matricule
- nom
- bonus
- note_td
- note_cc
- note_tp
- note_projet
- note_presence

## Calcul des Notes
- Les notes TD, CC, TP et Projet sont pondérées selon les pourcentages définis
- Le bonus et la présence sont ajoutés directement à la note finale
- La note finale est calculée automatiquement

## Installation et Utilisation

### Installation Locale
1. Clonez ce dépôt
2. Ouvrez `index.html` dans votre navigateur
3. Aucune installation supplémentaire n'est requise

### Utilisation
1. Ouvrez l'application dans votre navigateur
2. Importez votre fichier Excel avec les colonnes requises
3. Configurez les pourcentages pour chaque type de note
4. Modifiez les notes si nécessaire
5. Utilisez la barre de recherche pour trouver rapidement un étudiant
6. Cliquez sur "Sauvegarder les modifications" pour enregistrer
7. Utilisez "Télécharger en Excel" pour exporter les notes finales

## Technologies Utilisées
- HTML5
- CSS3
- JavaScript
- Bibliothèque XLSX.js pour la manipulation des fichiers Excel

## Auteur
[Votre nom]

## Licence
[Votre licence]
