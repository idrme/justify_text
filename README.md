# Introduction
Petit projet de conception d'une API REST avec node.js (Express). L'utilisateur doit envoyer son email au format JSON à la route /api/token pour obtenir un cookie contenant un token.
A partir de ce token, il sera possible d'effectuer des requetes vers /api/justify pour justifier un texte.
La limite de mots est limité à 80 000 par jours et par token.

## Exemple
```
/api/justify :
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

/api/token :
{"email":"example@example.com"}
```
