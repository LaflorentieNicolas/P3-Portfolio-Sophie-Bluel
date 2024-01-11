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
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal
    .querySelector("#button-close-modal")
    .removeEventListener("click", closeModal);
};
// Récupération du bouton pour ouvrir la modal
document.getElementById("js-button-modal").addEventListener("click", openModal);

// fermer la modale avec le bouton clavier Esc
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal(e);
  }
});

// ----------Création modale gallerie-------//

const worksContainer = document.getElementById("modal-gallery");

const reponses = fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((datas) => {
    datas.forEach((works) => {
      const figure = document.createElement("figure");
      const figureCaption = document.createElement("modal-figcaption");
      const figureImage = document.createElement("img");
      const deleteIcon = document.createElement("i");

      figureImage.classList.add("modal-image");
      figureImage.src = works.imageUrl;
      figureImage.alt = works.title;
      figure.className = works.category.name;

      deleteIcon.className = "fa-regular fa-trash-can";

      worksContainer.appendChild(figure);
      figure.appendChild(figureImage);
      figure.appendChild(figureCaption);
      figure.appendChild(deleteIcon);
    });
  });
