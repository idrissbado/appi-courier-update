# Vivo Energy - Système de Gestion de Courrier

Un système web moderne pour la gestion et le changement de statut des courriers de l'entreprise Vivo Energy.

**Auteur :** Eunice Achie

## Fonctionnalités

- ✅ Interface utilisateur moderne et responsive
- ✅ Traitement des courriers par référence via URL
- ✅ Mise à jour automatique du statut en base de données
- ✅ Messages de confirmation et d'erreur élégants
- ✅ Design aux couleurs de Vivo Energy avec animations
- ✅ Compatible avec l'API Flask existante

## Installation Locale

### Prérequis

- Node.js 18+ installé
- Base de données PostgreSQL configurée
- npm ou yarn

### Étapes d'installation

1. **Télécharger et extraire le projet**

2. **Installer les dépendances**
   \`\`\`bash
   npm install
   # ou
   yarn install
   \`\`\`

3. **Configurer les variables d'environnement**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Modifier `.env.local` avec vos paramètres :
   \`\`\`env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   \`\`\`

4. **Lancer le serveur de développement**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

5. **Accéder à l'application**
   - Ouvrir [http://localhost:3000](http://localhost:3000)
   - Tester avec : `http://localhost:3000?ref=VOTRE_REFERENCE`

## Déploiement sur Vercel

### Méthode 1 : Via v0 (Recommandée)

1. Cliquer sur le bouton **"Deploy"** dans l'interface v0
2. Configurer les variables d'environnement dans Vercel
3. L'application sera automatiquement déployée

### Méthode 2 : Via GitHub

1. Pousser le code sur GitHub
2. Connecter le repository à Vercel
3. Configurer les variables d'environnement
4. Déployer

### Variables d'environnement Vercel

Dans les paramètres Vercel, ajouter :

\`\`\`env
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
\`\`\`

## Structure de la base de données

Le système utilise une table `gestion_courier` :

\`\`\`sql
CREATE TABLE gestion_courier (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(255) UNIQUE NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente',
    created_at TIMESTAMP DEFAULT NOW(),
    update TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Utilisation

### Format d'URL

\`\`\`
https://votre-domaine.com?ref=REFERENCE_COURRIER
\`\`\`

### Réponses

- **Succès :** "Courrier marqué comme LU !"
- **Erreur :** "Référence manquante"

## API Endpoint

\`\`\`
GET /api/traiter?ref=REFERENCE_COURRIER
\`\`\`

Compatible avec l'API Flask existante.

## Technologies utilisées

- **Frontend :** Next.js 14, TypeScript, Tailwind CSS
- **Base de données :** PostgreSQL (via pg)
- **UI Components :** Shadcn/ui
- **Déploiement :** Vercel

## Scripts disponibles

\`\`\`bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Linting
\`\`\`

## Support

Pour toute question ou support technique, contactez l'équipe de développement.

---

© 2025 Vivo Energy - Développé par Eunice Achie
