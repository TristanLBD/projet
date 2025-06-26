const express = require('express');

// Fonction simple pour les tests
function add(a, b) {
    return a + b;
}

// Fonction pour multiplier
function multiply(a, b) {
    return a * b;
}

// Création de l'application Express
function createApp() {
    const app = express();

    app.get('/', (req, res) => {
        res.json({
            message: 'Bienvenue dans l\'application CI/CD!',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
        });
    });

    app.get('/health', (req, res) => {
        res.json({ status: 'OK' });
    });

    return app;
}

// Démarrage du serveur seulement si le fichier est exécuté directement
if (require.main === module) {
    const app = createApp();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}

// Export pour les tests
module.exports = { add, multiply, createApp };
