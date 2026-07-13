# Tatorh Fashion

Boutique e-commerce mobile-first de robes et tenues africaines confectionnées sur demande à Lomé.

Le MVP comprend :

- un catalogue public avec filtres et recherche ;
- des fiches produit avec photos, vidéo, tailles et couleurs ;
- une sélection locale faisant office de panier ;
- l’enregistrement des commandes dans Supabase avant l’ouverture de WhatsApp ;
- une administration protégée pour gérer les articles, les médias et les commandes.

## 1. Prérequis

- Node.js 20 ou supérieur ;
- npm ;
- un projet Supabase ;
- un numéro WhatsApp capable de recevoir les commandes.

Vérifier les versions installées :

```bash
node --version
npm --version
```

## 2. Installation locale

Installer les dépendances :

```bash
npm install
```

Le projet accepte aussi bien `.env` que `.env.local`. Pour une configuration locale qui ne doit jamais être commitée, `.env.local` reste préférable :

```powershell
Copy-Item .env.example .env.local
```

Si un fichier `.env` est déjà configuré, il n’est pas nécessaire de le remplacer.

## 3. Variables d’environnement

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxx
NEXT_PUBLIC_WHATSAPP_NUMBER=22890000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` reste accepté pour les anciens projets Supabase. Une seule des deux clés `PUBLISHABLE_KEY` ou `ANON_KEY` est nécessaire ; la clé publiable est utilisée en priorité.

Où trouver ces informations dans Supabase :

1. Ouvrir le projet Supabase.
2. Aller dans **Project Settings → API Keys**.
3. Copier l’URL du projet dans `NEXT_PUBLIC_SUPABASE_URL`.
4. Copier la clé **Publishable** dans `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

Le numéro WhatsApp doit être au format international, sans `+`, espace ni tiret. Exemple pour le Togo : `22890123456`.

Ne jamais placer une clé `service_role` dans une variable `NEXT_PUBLIC_*`. Cette clé donne des privilèges serveur et ne doit pas être exposée au navigateur.

Après toute modification de `.env` ou `.env.local`, arrêter puis redémarrer le serveur Next.js.

## 4. Initialiser la base Supabase

Le fichier [`supabase/schema.sql`](supabase/schema.sql) crée :

- les tables `products` et `orders` ;
- les contraintes et règles RLS ;
- le bucket Storage public `products` ;
- les règles d’upload réservées aux utilisateurs authentifiés ;
- les six produits fictifs de démarrage.

Pour l’exécuter :

1. Dans Supabase, ouvrir **SQL Editor**.
2. Créer une nouvelle requête.
3. Copier tout le contenu de `supabase/schema.sql`.
4. Cliquer sur **Run**.
5. Vérifier dans **Table Editor** que `products` et `orders` existent.
6. Vérifier dans **Storage** que le bucket `products` existe et est public.

Le script peut être rejoué : les règles sont recréées proprement et les produits ne sont pas dupliqués grâce à leur slug unique.

## 5. Créer le compte administrateur

Il n’existe volontairement aucune page d’inscription publique. Le compte de la propriétaire doit être créé dans Supabase :

1. Ouvrir **Authentication → Users**.
2. Cliquer sur **Add user** puis **Create new user**.
3. Renseigner l’adresse email et un mot de passe fort.
4. Créer le compte comme déjà confirmé, ou confirmer ensuite son adresse email.
5. Dans les réglages Authentication, désactiver les nouvelles inscriptions publiques si ce projet ne doit avoir qu’une seule administratrice.

Les identifiants créés ici sont ceux à saisir sur la page de connexion du site. Il ne faut pas utiliser le mot de passe du compte Supabase Dashboard.

## 6. Démarrer l’application

```bash
npm run dev
```

Ouvrir ensuite :

- site public : [http://localhost:3000](http://localhost:3000) ;
- catalogue : [http://localhost:3000/collection](http://localhost:3000/collection) ;
- connexion admin : [http://localhost:3000/admin/login](http://localhost:3000/admin/login) ;
- administration : [http://localhost:3000/admin](http://localhost:3000/admin).

Une visite directe de `/admin`, `/admin/produits` ou `/admin/commandes` sans session redirige automatiquement vers `/admin/login`. Une administratrice déjà connectée qui ouvre `/admin/login` est redirigée vers le dashboard.

Sur Windows, si PowerShell refuse d’exécuter `npm.ps1`, utiliser :

```powershell
npm.cmd run dev
```

## 7. Utiliser l’administration

Après la connexion sur `/admin/login` :

- `/admin` affiche le nombre d’articles et les commandes en attente ;
- `/admin/produits` liste les articles et permet de les modifier ou supprimer ;
- `/admin/produits/nouveau` permet de créer un article ;
- `/admin/commandes` permet de faire passer une commande de `en_attente` à `confirmee`, `livree` ou `annulee`.

Les photos acceptées sont JPG, PNG ou WebP. Les vidéos doivent être au format MP4 et ne pas dépasser 50 Mo. Les fichiers sont stockés dans le bucket `products`, sous les dossiers `images/` et `videos/`.

## 8. Tester l’application de bout en bout

### Test du parcours cliente

1. Ouvrir `/collection`.
2. Tester la recherche et les filtres de catégorie.
3. Ouvrir une fiche produit.
4. Cliquer sur **Ajouter à ma sélection**.
5. Ouvrir **Ma sélection** depuis l’icône du panier.
6. Modifier la quantité et vérifier que le total est recalculé.
7. Renseigner un nom, une ville et éventuellement un téléphone.
8. Cliquer sur **Envoyer ma commande sur WhatsApp**.
9. Vérifier que WhatsApp ou WhatsApp Web s’ouvre avec les articles, le total, le nom et la ville préremplis.
10. Dans Supabase **Table Editor → orders**, vérifier qu’une ligne a été créée avec le statut `en_attente`.

Pour éviter d’envoyer un vrai message pendant les tests, utiliser temporairement son propre numéro dans `NEXT_PUBLIC_WHATSAPP_NUMBER`. L’enregistrement Supabase a lieu avant la redirection vers WhatsApp.

### Test du suivi administrateur

1. Ouvrir `/admin/login` dans un autre navigateur ou une fenêtre privée.
2. Se connecter avec l’utilisateur créé dans Supabase Authentication.
3. Ouvrir **Commandes**.
4. Vérifier que la commande de test est présente.
5. Passer son statut à **Confirmée**, puis vérifier la valeur dans Supabase.
6. Passer ensuite son statut à **Livrée** ou **Annulée**.
7. Se déconnecter et vérifier qu’un retour direct sur `/admin` redirige vers la connexion.

### Test de la gestion des produits et médias

1. Ouvrir `/admin/produits/nouveau`.
2. Créer un produit avec au moins une photo et, si possible, une petite vidéo MP4.
3. Vérifier sa présence dans **Table Editor → products**.
4. Vérifier les fichiers dans **Storage → products → images/videos**.
5. Ouvrir `/collection` et vérifier que l’article et ses médias sont visibles publiquement.
6. Modifier son prix ou son statut de nouveauté depuis l’admin.
7. Vérifier la modification sur le site public.
8. Supprimer le produit de test depuis `/admin/produits`.

La suppression d’un produit supprime actuellement la ligne en base, mais ne nettoie pas automatiquement ses anciens fichiers Storage. Ce nettoyage pourra être ajouté dans une évolution ultérieure.

### Test sur téléphone réel

Le téléphone et l’ordinateur doivent être connectés au même réseau Wi-Fi.

```bash
npm run dev -- --hostname 0.0.0.0
```

Ouvrir ensuite sur le téléphone l’adresse réseau affichée par Next.js, par exemple `http://192.168.1.20:3000`. Si elle est inaccessible, autoriser Node.js dans le pare-feu Windows pour le réseau privé.

Vérifier au minimum :

- le menu mobile ;
- les filtres horizontaux ;
- les cartes produit ;
- l’ajout et la modification des quantités ;
- le formulaire WhatsApp ;
- la création et la modification d’un produit depuis l’admin mobile.

## 9. Vérifications techniques

```bash
npm run lint
npm run build
npm run start
```

`npm run start` doit être lancé après un build réussi et permet de tester la version de production sur `http://localhost:3000`.

## 10. Déploiement Vercel

1. Importer le dépôt dans Vercel.
2. Ajouter les mêmes variables d’environnement dans **Project Settings → Environment Variables**.
3. Remplacer `NEXT_PUBLIC_SITE_URL` par le domaine de production, par exemple `https://tatorh-fashion.vercel.app`.
4. Déployer.
5. Tester à nouveau la connexion admin, un upload et une commande WhatsApp en production.

Supabase doit autoriser l’URL de production dans **Authentication → URL Configuration** :

- **Site URL** : domaine principal de production ;
- **Redirect URLs** : domaine de production et, pour le développement, `http://localhost:3000/**`.

## 11. Résolution des problèmes courants

### La connexion admin échoue

- vérifier que l’utilisateur existe dans **Authentication → Users** ;
- vérifier que son email est confirmé ;
- utiliser son email et son mot de passe Auth, pas les identifiants du dashboard ;
- vérifier que l’URL et la clé Supabase appartiennent au même projet ;
- redémarrer Next.js après une modification du fichier d’environnement...

### `/admin` ne redirige pas vers la connexion

L’application se considère en mode démo si l’URL ou la clé Supabase manque. Vérifier que `NEXT_PUBLIC_SUPABASE_URL` et l’une des clés `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont bien renseignées, puis redémarrer le serveur.

### La commande ouvre WhatsApp mais n’apparaît pas dans Supabase

- vérifier que `supabase/schema.sql` a été exécuté ;
- vérifier la table `orders` et la règle RLS **Creation de commande publique** ;
- consulter la console du navigateur pour voir l’erreur retournée par Supabase.

### L’upload échoue

- vérifier que le bucket `products` existe ;
- vérifier que l’utilisateur admin est connecté ;
- vérifier les règles Storage créées par `schema.sql` ;
- utiliser une image JPG/PNG/WebP ou une vidéo MP4 de moins de 50 Mo.

### Aucun produit Supabase ne s’affiche

Si la table est vide ou inaccessible, l’application utilise les produits fictifs comme solution de repli. Vérifier les lignes de `products` et la règle RLS **Lecture publique des produits**.
