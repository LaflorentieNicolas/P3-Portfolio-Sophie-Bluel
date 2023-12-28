// initialisation de la variable works comme tableau vide afin de stocker les données récupérées depuis l'API
let works = [];
// définition de la fonction insertWorks qui prend le tableau d'objet works en paramètre
function insertWorks(works) {
  // sélectionne la div class gallery, afin de vider son contenu
  document.querySelector("div.gallery").innerHTML = "";
  works.forEach((work, index) => {
    // création des balises <figure>
    let figureBalise = document.createElement("figure");

    // création des balises <img src="" alt="">
    let image = document.createElement("img");
    image.setAttribute("src", work.imageUrl);
    image.setAttribute("alt", work.title);
    figureBalise.appendChild(image);

    // Création des légendes sous les photos
    let caption = document.createElement("figcaption");
    caption.textContent = work.title;
    figureBalise.appendChild(caption);

    // ajout des balises figure comme enfant de la balise HTML div gallery
    document.querySelector("div.gallery").appendChild(figureBalise);
  });
}

async function worksData() {
  const response = await fetch("http://localhost:5678/api/works");
  // si c'est ok le code continue sinon erreur
  if (response.ok) {
    // extraction des données JSON et est stockées sur la variable Works
    const data = await response.json();
    works = data;

    // itération tableau, boucle création des éléments
    works.forEach((work, index) => {
      let figureBalise = document.createElement("figure");

      let image = document.createElement("img");
      image.setAttribute("src", work.imageUrl);
      image.setAttribute("alt", work.title);
      figureBalise.appendChild(image);

      let caption = document.createElement("figcaption");
      caption.textContent = work.title;
      figureBalise.appendChild(caption);

      document.querySelector("div.gallery").appendChild(figureBalise);
    });
  } else {
    console.error("error");
  }
}

// Appel de la fonction
worksData();

// Récupération des catégories filtres sur l'API

fetch("http://localhost:5678/api/categories");

const filterTous = document.querySelector(".filter-tous");
const filterObjets = document.querySelector(".filter-objets");
const filterAppartements = document.querySelector(".filter-appartements");
const filterHotel = document.querySelector(".filter-hotel");

const filterButtons = [
  filterTous,
  filterObjets,
  filterAppartements,
  filterHotel,
];

filterObjets.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Objets") {
      return true;
    } else return false;
  });
  insertWorks(worksObjet);
});

filterAppartements.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Appartements") {
      return true;
    } else return false;
  });
  insertWorks(worksObjet);
});

filterHotel.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Hotels & restaurants") {
      return true;
    } else return false;
  });
  insertWorks(worksObjet);
});

filterTous.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (
      (work.category.name == "Appartements", "Objets", "Hotels & restaurants")
    ) {
      return true;
    } else return false;
  });
  insertWorks(worksObjet);
});

console.log(filterHotel);
