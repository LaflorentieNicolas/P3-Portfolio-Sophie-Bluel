// Stocke de l'URL de l'API sur une constante
const API_WORKS = "http://localhost:5678/api/works";
// Création d'un tableau vide afin de stocker les données de l'API
let works = [];
// Sélection des éléments filtres par ID dans le DOM
const filterTous = document.getElementById("filter-tous");
const filterObjets = document.getElementById("filter-objets");
const filterAppartements = document.getElementById("filter-appartements");
const filterHotel = document.getElementById("filter-hotel");
// Création d'une fonction permettant de vider le contenu des éléments se trouvant dans la classe "gallery"
function clearWorks() {
  document.querySelector("div.gallery").innerHTML = "";
}
// Création dans le DOM des balises figure, img, figcaption, en remplacement de ce qui a été supprimé en HTML
function addWorkToDom(work) {
  let figureBalise = document.createElement("figure");

  let image = document.createElement("img");
  image.setAttribute("src", work.imageUrl);
  image.setAttribute("alt", work.title);
  figureBalise.appendChild(image);
  figureBalise.setAttribute("data-id", work.id);

  let caption = document.createElement("figcaption");
  caption.textContent = work.title;
  figureBalise.appendChild(caption);
  document.querySelector("div.gallery").appendChild(figureBalise);
}
// Fonction permettant de filtrer les images par catégories,
// et appelle la fonction addWorkToDom afin de les afficher
function filterWorksByCategory(categoryName) {
  clearWorks();

  const filteredWorks = works.filter(
    (work) => work.category.name === categoryName
  );
  filteredWorks.forEach((work) => {
    addWorkToDom(work);
  });
}
// Récupération des données depuis l'API par la fonction utilisant fetch
// Cette fonction nous retourne les données récupérées après les avoir stockées dans le tableau works
async function getWorks() {
  const response = await fetch(API_WORKS);

  try {
    const data = await response.json();
    works = data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
// Avec cette fonction nous appellons getWorks pour récupérer les données,
// puis utilise forEach pour appeler addWorkToDom pour chaque objets
async function worksData() {
  const works = await getWorks();

  works.forEach((work) => {
    addWorkToDom(work);
  });
}
// Permet de filtrer les photos lorsque l'on click sur l'un des 4 choix possibles
filterObjets.addEventListener("click", () => {
  filterWorksByCategory("Objets");
});

filterAppartements.addEventListener("click", () => {
  filterWorksByCategory("Appartements");
});

filterHotel.addEventListener("click", () => {
  filterWorksByCategory("Hotels & restaurants");
});

filterTous.addEventListener("click", () => {
  clearWorks();
  works.forEach((work) => {
    addWorkToDom(work);
  });
});

// Appel de la fonction
worksData();
