# Projet JavaScript Simple - TP CI/CD

Ce projet est un exemple simple d'application Node.js avec une pipeline CI/CD Jenkins.

## Fonctionnalités

-   Application Express simple
-   Tests automatisés avec Jest
-   Pipeline CI/CD Jenkins
-   Containerisation Docker
-   Déploiement sur GitHub Container Registry

## Installation

```bash
npm install
```

## Utilisation

### Démarrage de l'application

```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Exécution des tests

```bash
npm test
```

### Vérification du code

```bash
npm run lint
```

## Pipeline CI/CD

La pipeline Jenkins exécute les étapes suivantes :

1. **Checkout** : Télécharge le repository
2. **Install Dependencies** : Installe les dépendances npm
3. **Build** : Compile le projet
4. **Test** : Exécute les tests automatisés
5. **Lint** : Vérifie la qualité du code
6. **Build Docker Image** : Crée une image Docker
7. **Tag Repository** : Tag le repo avec la version du build
8. **Push to GitHub Container Registry** : Déploie l'image sur GitHub

## Configuration Jenkins

### Prérequis

-   Jenkins avec les plugins suivants :
    -   Docker Pipeline
    -   Git
    -   Credentials Binding

### Configuration des credentials

1. Créer des credentials de type "Username with password" avec l'ID `github-credentials`
2. Utiliser votre nom d'utilisateur GitHub et un token d'accès personnel

### Variables d'environnement

Modifier dans le `Jenkinsfile` :

-   `GITHUB_USERNAME` : Votre nom d'utilisateur GitHub

## Docker

### Build de l'image

```bash
docker build -t simple-js-project .
```

### Exécution du container

```bash
docker run -p 3000:3000 simple-js-project
```

## Structure du projet

```
├── src/
│   ├── index.js              # Application principale
│   └── __tests__/
│       └── index.test.js     # Tests
├── Dockerfile                # Configuration Docker
├── Jenkinsfile              # Pipeline CI/CD
├── package.json             # Dépendances et scripts
└── README.md               # Documentation
```
