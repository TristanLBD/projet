import express, { Request, Response } from "express";
import path from "path";

// Fonction simple pour les tests
function add(a: number, b: number): number {
    return a + b;
}

// Fonction pour multiplier
function multiply(a: number, b: number): number {
    return a * b;
}

interface HealthResponse {
    status: string;
}

// Création de l'application Express
function createApp(): express.Application {
    const app = express();
    app.use(express.json());

    // Servir les fichiers statiques (HTML)
    app.use(express.static(path.join(__dirname, "../public")));

    app.get("/", (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/health", (_req: Request, res: Response) => {
        const response: HealthResponse = { status: "OK" };
        res.json(response);
    });

    // API de calcul
    app.post("/api/calc", (req: Request, res: Response) => {
        const { a, b, op } = req.body;
        let result: number | null = null;
        if (typeof a === "number" && typeof b === "number") {
            if (op === "add") result = add(a, b);
            else if (op === "multiply") result = multiply(a, b);
        }
        if (result === null) {
            res.status(400).json({ error: "Paramètres invalides" });
        } else {
            res.json({ result });
        }
    });

    return app;
}

// Démarrage du serveur seulement si le fichier est exécuté directement
if (require.main === module) {
    const app = createApp();
    const PORT: number = parseInt(process.env.PORT || "3000", 10);

    app.listen(PORT, () => {
        console.log(`Serveurr démarré sur le port ${PORT}`);
    });
}

// Export pour les tests
export { add, multiply, createApp };
