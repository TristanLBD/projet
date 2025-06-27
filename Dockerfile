FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY tsconfig.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source et les fichiers publics
COPY src/ ./src/
COPY public/ ./public/

# Compiler TypeScript
RUN npm run build

# Stage de production
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer seulement les dépendances de production
RUN npm ci --only=production

# Copier les fichiers compilés depuis le stage builder
COPY --from=builder /app/dist ./dist
# Copier le dossier public depuis le stage builder
COPY --from=builder /app/public ./public

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
