
# HAI806I-Carpool-project

Ce projet développé en Angular et Node JS permet la mise en place d'un système de covoiturage pour mettre en relation conducteurs et voyageurs. Il permet toutes les fonctionnalités basique que l'on pourrait attendre d'une application comme celle-ci.




## Fonctionnalités

- Création de compte et authentification
- Changement d'informations du profile et mot de passe
- Création de covoiturage
- Recherche de covoiturage
- Système de réservation du covoiturage avec acceptation et rejet

## Installation

### Serveur

1. Récupérer le dossier SERVER présent dans l'archive.
2. Assurez-vous que le fichier db.ini est bien un niveau au dessus du dossier SERVER dans votre arborescence.
3. Naviguer dans le dossier SERVER
4. Installer les dépendances avec :
```bash
npm install
```
5. Lancer le serveur avec :
```bash
node server.js
```
6. Le serveur doit afficher : 
"Server listening on port 3000"

### Client

1. Récupérer le dossier CarPoule présent dans l'archive.
2. Naviguer dedans
3. Installer les dépendances avec :
```bash
npm install
```
4. Lancer le client avec :
```bash
ng serve -o
```

## Demo

Pour tester le projet vous pouvez vous créer un compte ou utiliser un compte existant. Cela vous permet en suite de créer un covoiturage. Une fois le trajet créé, vous pouvez trouver tous les covoiturages vous concernants sur la page My Trips (dont vous êtes le conducteur ou un passager). Un conducteur ne peut réserver de places dans son propre covoiturage alors pour tester vous pouvez vous connecter à un autre compte afin de rechercher le covoiturage précédemment créé et faire un réservation. Une fois faite, retourner sur le compte qui a créé le covoiturage et allé sur votre trajet. Vous verrez alors la demande de réservation innitiée par l'autre utilisateur que vous pouvez alors refuser ou accepter. 

### Comptes existants 


| Email | Mot de passe     |
| :-------- | :------- | 
| test@carpoule.fr      | azert |

## API
#### Endpoint
```bash
http://localhost:3000/
```
#### Test connexion

```http
  GET /
```

#### Récupérer tous les covoiturages

```http
  GET /search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | - | - |

#### Recherche de covoiturages par trajet

```http
  GET /search/${departure}/${arrival}&date=${date}&seat=${seat}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `departure`      | `string` | Ville de France avec majuscule |
| `arrival`      | `string` | Ville de France avec majuscule |
| `arrival`      | `string` | Ville de France avec majuscule |
| `date`      | `Date` | [OPTIONAL] Date de départ format yyyy-mm-dd |
| `seat`      | `int` | [OPTIONAL] Nombre de places nécessaires |

#### Récupération des infos d'un covoiturage

```http
  GET /carpool/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Identifiant d'un covoiturage |


#### Recherche des passagers en attente d'acceptation dans un covoiturage

```http
  GET /pending/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `id`      | `string` | Identifiant d'un covoiturage |


#### Acceptation d'un passager dans un covoiturage

```http
  POST /pending/accept
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `carpool_id`      | `string` | Identifiant d'un covoiturage |
| `passenger_id`      | `string` | Identifiant d'un passager |

#### Rejet d'un passager dans un covoiturage

```http
  POST /pending/reject
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `carpool_id`      | `string` | Identifiant d'un covoiturage |
| `passenger_id`      | `string` | Identifiant d'un passager |


#### Réservation d'un siège

```http
  POST /carpool/${id}/book
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `id`      | `string` | Identifiant d'un covoiturage |

#### Suppression d'un covoiturage

```http
  DELETE /carpool/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `id`      | `string` | Identifiant d'un covoiturage |

#### Création d'un covoiturage

```http
  POST /publish
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `departure`      | `string` | Ville de France de départ avec majuscule |
| `arrival`      | `string` | Ville de France d'arrivé avec majuscule |
| `date`      | `Date` | Date format yyyy-mm-dd |
| `seats`      | `int` | Nombre de sièges disponibles |
| `highway`      | `boolean` | true si utilisation d'autoroutes, false sinon |
| `price`      | `float` | Prix du trajet |
| `description`      | `string` | Description du trajet |

#### Création de compte

```http
  POST /signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | Email de l'utilisateur |
| `password`      | `string` | Mot de passe |
| `name`      | `string` | Nom |
| `firstname`      | `string` | Prénom |
| `birthdate`      | `Date` | Date de naissance format yyyy-mm-dd |
| `pref_smoking`      | `boolean` | true si pas dérangé par la fumée, false sinon |
| `pref_animals`      | `boolean` | true si pas dérangé par les animaux, false sinon |
| `pref_talk`      | `boolean` | true si pas dérangé pour discuter, false sinon |
| `phone`      | `string` | Numéro de téléphone |


#### Connexion

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | Email |
| `password`      | `string` | Mot de passe |

#### Récupération des infos du profile

```http
  GET /profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |


#### Modification du profile

```http
  POST /profile/edit
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `email`      | `string` | Email de l'utilisateur |
| `name`      | `string` | Nom |
| `firstname`      | `string` | Prénom |
| `birthdate`      | `Date` | Date de naissance format yyyy-mm-dd |
| `pref_smoking`      | `boolean` | true si pas dérangé par la fumée, false sinon |
| `pref_animals`      | `boolean` | true si pas dérangé par les animaux, false sinon |
| `pref_talk`      | `boolean` | true si pas dérangé pour discuter, false sinon |
| `phone`      | `string` | Numéro de téléphone |
| `brand`      | `string` | Marque du véhicule |
| `model`      | `string` | Modèle du véhicule |
| `color`      | `string` | Couleur du véhicule format "#xxxxx" |
| `registration`      | `string` | Immatriculation du véhicule |
| `card_num`      | `string` | Numéro de la carte de crédit |
| `card_cvc`      | `string` | CVC de la carte |
| `card_exp`      | `Date` | Date d'expiration de la carte format yyyy-mm-dd |

#### Modification du mot de passe

```http
  POST /profile/password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `password`      | `string` | Mot de passe actuel |
| `new_password`      | `string` | Nouveau mot de passe |


#### Récupération des infos pblique d'un utilisateur

```http
  POST /usersimple
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |
| `ids`      | `Array of string` |Tableau avec les ids des utilisateurs à récupérer |

#### Récupération des voyages concernant un utilisateur

```http
  GET /trips
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth`      | `cookie` | Cookie d'authentification |




## Auteurs

- [@gaiko19](https://github.com/Gaiko19)
- [@arnaudcs](https://github.com/ArnaudCs)
