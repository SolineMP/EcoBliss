# Automatisez des tests pour une boutique en ligne
## À propos 
Projet n°10 de la formation de Testeur de logiciel. Mise en place de tests automatiques avec Cypress
# Table des matières 
| ~~~~~~~~~~~~~~ |
|-------|
|✨ [À propos](#à-propos)|
|📦 [Installation](#installation)|
|🚀 [Utilisation](#utilisation)|
|🤝 [Construit avec](#construit-avec)|
|🏗 ️[Documentation](#documentation)|
|🗂 ️[Gestion des versions](#gestion-des-versions)|
|📄 [Instructions](#instructions)

## Prérequis
Installation de : 
- [NodeJS](https://nodejs.org/en/learn)
- [npm](https://docs.npmjs.com/about-npm)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/)
- [cypress](https://www.cypress.io/)

## Installation
 - Installer npm 
 - Cloner le code
 - Effectuer la commande : docker-compose up à la racine du projet 
 - Effectuer la commande : npx cypress run pour lancer tous les tests en ligne de commande
 - Effectuer la commande : npx cypress open pour ouvrir une fenêtre dédiée, puis cliquer sur E2E testing et enfin choisir le navigateur désiré. Une page va s'ouvrir avec différents fichiers de tests. Cliquer sur le fichier souhaité pour voir le test se dérouler.
 - Il est possible d'avoir un modèle de report différents en allant dans le fichier /reports et d'ouvrir les pages HTML associées.
 - Une fois l'utilisation du projet terminé, effectuer la commande : docker-compose down 
## Utilisation
 - Tests de fonctionnalités : 
    - Vérifier la navigation des différentes pages du site. Page d’accueil, page de connexion, page produit et page panier.
    - Tests de l’ajout de produits au panier, modification des quantités et suppression des articles du panier.
 - Tests de gestion des stocks : 
    - Vérifier la précision des stocks pour éviter toute survente (si non désiré par le client). 
    - Tester la fonctionnalité de mise à jour automatique des stock après l’ajout au panier. 
 - Tests au niveau de l’API : 
    - Tests sur différents endpoints.
    - Vérification de la réponse HTTP, vérification des données envoyées, tests d’erreurs. 
 - Tests de connexion : 
    - Vérification de la fonctionnalité de connexion et de déconnexion. 
    - Vérification de la présence du panier seulement si l’utilisateur est connecté.
 - Tests de contenu : 
    - Vérification de la précision et de la pertinence du contenu visuel du site, affichage des produits, images, descriptions et titres. 
## Construit avec
### Langages
[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
[Cypress](https://www.cypress.io/)

## Documentation
[Lien vers la documentation](https://www.cypress.io/)
## Instructions
### Ce projet a pour but de : 
- Analyser les besoins en automatisation de tests
- Automatiser des tests via des scripts 
- Rédiger un bilan de tests automatisés
