// récupére la modale associée à l'attribut href de l'HTML
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));

  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  const modal = target;

  modal
    .querySelector("#button-close-modal")
    .addEventListener("click", closeModal);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal
    .querySelector("#button-close-modal")
    .removeEventListener("click", closeModal);
};

const buttonModal = document.getElementById("js-button-modal");

buttonModal.addEventListener("click", openModal);

// fermer la modale avec Esc
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal(e);
  }
});

// fermer en cliquant à l'exterieur de la modale
const modalWrapper = document.getElementById("modal-wrapper");
const bodyHTML = document.querySelector("body");
// modalWrapper.addEventListener("click", modalClick);

function modalClick(e) {
  console.log("allo");
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}
bodyHTML.addEventListener("click", closeModal);

// ----------Création modale gallerie-------

const imagesModalContainer = document.getElementById("modal-gallery");

const reponses = fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((datas) => {
    datas.forEach((works) => {
      const figure = document.createElement("modal-figure");
      const figureCaption = document.createElement("modal-figcaption");
      const figureImage = document.createElement("img");
      const deleteIcon = document.createElement("i");

      figureImage.classList.add("modal-image");
      figureImage.src = works.imageUrl;
      figureImage.alt = works.title;
      figure.className = works.category.name;

      deleteIcon.className = "fa-regular fa-trash-can";

      imagesModalContainer.appendChild(figure);
      figure.appendChild(figureImage);
      figure.appendChild(figureCaption);
      figure.appendChild(deleteIcon);
    });
  });

// const API_WORKS = "http://localhost:5678/api/works";
// async function getWorks() {
//   const response = await fetch(API_WORKS);

//   try {
//     const data = await response.json();
//     works = data;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
// function addWorkToDom(work) {
//   let figureBalise = document.createElement("figure");

//   let image = document.createElement("img");
//   image.setAttribute("src", work.imageUrl);
//   image.setAttribute("alt", work.title);
//   figureBalise.appendChild(image);

//   let caption = document.createElement("figcaption");
//   caption.textContent = work.title;
//   figureBalise.appendChild(caption);
//   document.querySelector("div.gallery").appendChild(figureBalise);
// }
