# Portfolio - Sophie Bluel

## Scénario

Dans ce projet, je suis développeur front-end pour l'agence ArchiWebos.  
Ma mission est de travailler sur la conception du site portfolio d'une architecte d'intérieur.  
Avec l'aide des designs Figma, du code back-end et du kanban, je dois concevoir, tester et implémenter de nouvelles fonctionnalités.

---

## Outils

- **Node.js**
- **Documentation d'une API avec Swagger**

---

## Ressources

- **Figma** : [Sophie Bluel - Desktop](https://www.figma.com/design/kfKHknHySoTibZfdolGAX6/Sophie-Bluel---Desktop?node-id=0-1&p=f)  
- **Code du projet** : [GitHub - Portfolio Sophie Bluel](https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel)  
- **Kanban** : [Notion - Kanban](https://openclassrooms.notion.site/da3bb5863a554b34ba1a8df90d4c99af?v=df7f8dcccd9f4917a664a559f00b7ccb)

---

## Étapes du projet

### Étape 1 : Affichage dynamique des projets

1. Faire appel à l'API avec la méthode `fetch` pour récupérer dynamiquement les projets de l'architecte (précédemment intégrés en dur dans le HTML).
2. Utiliser JavaScript pour ajouter les travaux récupérés à la galerie.
3. Supprimer le code HTML correspondant et le remplacer par du JavaScript.

**Objectif :**  
Les projets provenant du back-end doivent s'afficher dans la galerie, avec la possibilité de filtrer par catégorie grâce à un menu généré dynamiquement.


### Étape 2 : Création de la page de connexion "Admin"

1. Créer la page de connexion de l'architecte en suivant la maquette Figma.  
2. Si un identifiant utilisateur ou un mot de passe est incorrect, afficher un message d'erreur.  
3. En cas de connexion valide :  
   - Stocker le token d'authentification.  
   - Rediriger l'utilisateur vers la page principale avec des options supplémentaires "Admin" (par exemple, la possibilité de modifier la galerie).


### Étape 3 : Gestion des modifications dans la galerie

1. Lorsqu'on clique sur "modifier", une modal s'ouvre permettant de supprimer des photos et de mettre à jour la galerie.  
2. L'onglet "ajouter une photo" ouvre une autre modal permettant d'ajouter :  
   - Un projet  
   - Un titre  
   - Une catégorie  
