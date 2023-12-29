const API_WORKS = "http://localhost:5678/api/works";
// initialisation de la variable works comme tableau vide afin de stocker les données récupérées depuis l'API
let works = [];
// définition de la fonction insertWorks qui prend le tableau d'objet works en paramètre

const filterTous = document.querySelector("#filter-tous");
const filterObjets = document.querySelector("#filter-objets");
const filterAppartements = document.querySelector("#filter-appartements");
const filterHotel = document.querySelector("#filter-hotel");

function filterWorks(works) {
  // sélectionne la div class gallery, afin de vider son contenu
  document.querySelector("div.gallery").innerHTML = "";
  works.forEach((work) => {
    // création des balises <figure>
    addWorkToDom(work);
  });
}

async function getWorks() {
  const response = await fetch(API_WORKS);
  // si c'est ok le code continue sinon erreur
  if (response.ok) {
    // extraction des données JSON et est stockées sur la variable Works
    const data = await response.json();
    works = data;
    return data;
  }
}

function addWorkToDom(work) {
  let figureBalise = document.createElement("figure");

  let image = document.createElement("img");
  image.setAttribute("src", work.imageUrl);
  image.setAttribute("alt", work.title);
  figureBalise.appendChild(image);

  let caption = document.createElement("figcaption");
  caption.textContent = work.title;
  figureBalise.appendChild(caption);
  document.querySelector("div.gallery").appendChild(figureBalise);
}

async function worksData() {
  const works = await getWorks();
  // itération tableau, boucle création des éléments
  works.forEach((work) => {
    addWorkToDom(work);
  });
}

filterObjets.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Objets") {
      return true;
    } else return false;
  });
  console.log(worksObjet);
  filterWorks(worksObjet);
});

filterAppartements.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Appartements") {
      return true;
    } else return false;
  });
  filterWorks(worksObjet);
});

filterHotel.addEventListener("click", () => {
  console.log(works);
  let worksObjet = works.filter((work) => {
    if (work.category.name == "Hotels & restaurants") {
      return true;
    } else return false;
  });
  filterWorks(worksObjet);
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
  filterWorks(worksObjet);
});

console.log(filterHotel);

// Appel de la fonction
worksData();
