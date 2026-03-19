 backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── geo.service.js
│   │   ├── mail.service.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validate.middleware.js
│   │
│   ├── validations/
│   │   ├── auth.schema.js
│   │
│   └── app.js
│
├── server.js
├── .env
└── package.json



BD : 

CREATE DATABASE vivrecard_db;

USE vivrecard_db;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  verification_token VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  last_seen DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

exit;



vivre-card-app │ ├── app │ ├── index.js │ ├── login.js │ ├── register.js │ ├── map.js │ ├── profile.js │ └── logout.js │ ├── components │ ├── Button.js │ ├── InputField.js │ └── Loading.js │ ├── services │ ├── api.js │ ├── authService.js │ └── userService.js │ ├── store │ └── authStore.js │ ├── utils │ └── validation.js

navigation
//==========================================// npm install @react-navigation/native npm install @react-navigation/native-stack npm install @react-navigation/bottom-tabs

//========================================//

le projet
//==========================================//

npx expo install react-native-screens react-native-safe-area-context

//==========================================//

Les formulation
//==========================================//

npm install react-hook-form npm install zod npm install @hookform/resolvers

//==========================================//

API
//==========================================// npm install axios ou yarn add axios //==========================================//

State management ### (equivalent UseContext || redux)
//==========================================//

npm install zustand


//=============================================//
Pour lancer front : npx expo start --tunnel



//===============================================//
Pour builder le projet : 
ALler sur Expo.dev et me logger.
Cliquer sur New project ou selectionner un projet deja créer
ligne de commande pour init un new projet, aller sur le dossier fornt du projet et ecrire  :

 eas build -p android -- profil preview

ensuite mettre la ligne de code que Expo me donne , dans ce projet ca donne ca : 
eas init --id 6e112c65-7c27-4cf8-a218-f71db57c3000

Ensuite tous valider par default.

une fois terminal terminer, retourner sur Expo, aller dans le projet et installer l'APK, il se telechargera sur le PC et ensuite le mettre sur telephone.