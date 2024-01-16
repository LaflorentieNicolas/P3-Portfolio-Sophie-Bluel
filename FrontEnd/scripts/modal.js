const APIWORKS_URL = "http://localhost:5678/api/works";

const modalWrapper = document.getElementById("modal-wrapper");

// récupére la modale associée à l'attribut href de l'HTML
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));

  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
};

const closeModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(
    e.target.dataset.target || e.target.getAttribute("href")
  );
  if (target) {
    target.style.display = "none";
    target.setAttribute("aria-hidden", "true");
    target.removeAttribute("aria-modal");
  }
};
// Récupération du bouton pour ouvrir la modale
document.getElementById("js-button-modal").addEventListener("click", openModal);

document
  .querySelector("#button-close-modal")
  .addEventListener("click", closeModal);

// Ajout d'un événement de clic à l'objet window pour fermer la modal en cliquant en dehors
window.addEventListener("click", function (e) {
  console.log("cli");
  const modal = document.getElementById("modal");

  // Vérifiez si l'élément cliqué est en dehors de la modal et de son contenu
  if (e.target === modal) {
    closeModal(e);
  }
});

// Ajout d'un événement de clic à l'élément modal pour empêcher la propagation du clic
document.getElementById("modal").addEventListener("click", function (e) {
  e.stopPropagation();
});

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
    datas.forEach((work) => {
      const figure = document.createElement("figure");
      const figureCaption = document.createElement("modal-figcaption");
      const figureImage = document.createElement("img");
      const deleteIcon = document.createElement("i");

      figureImage.classList.add("modal-image");
      figureImage.src = work.imageUrl;
      figureImage.alt = work.title;
      figure.className = work.category.name;

      deleteIcon.className = "fa-regular fa-trash-can";
      deleteIcon.dataset.id = work.id;
      worksContainer.appendChild(figure);
      figure.appendChild(figureImage);
      figure.appendChild(figureCaption);
      figure.appendChild(deleteIcon);

      deleteIcon.addEventListener("click", function (event) {
        event.preventDefault();
        deleteProjectById(work.id);
      });
    });
  });

// Modale suppression d'un projet

const errorMessageModal = document.getElementById("error-modal-message");
const DELETE_ERROR = "Erreur de suppression.";

function deleteProjectById(projectId) {
  const token = localStorage.getItem("token");
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce projet ?"
  );

  if (confirmation) {
    fetch(`${APIWORKS_URL}/${projectId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La suppression du projet a échoué.");
        }

        const removeModalProject = document.querySelector(
          `figure[data-id="${projectId}"]`
        );

        if (removeModalProject) {
          removeModalProject.remove();

          const removeGalleryProject = document.querySelector(
            `figure[data-id="${projectId}"]`
          );

          if (removeGalleryProject) {
            removeGalleryProject.remove();
          } else {
            errorMessageModal.textContent = DELETE_ERROR;
          }
        } else {
          errorMessageModal.textContent = DELETE_ERROR;
        }
      })
      .catch((error) => console.error(error));
  }
}

// Modal ajouter des projets
const modalUploadProjectContainer = document.getElementById(
  "modal-upload-project-container"
);
const addProjectButton = document.getElementById("add-project-button");
const backButton = document.getElementById("back-button");

addProjectButton.addEventListener("click", function () {
  modalWrapper.style.display = "none";
  modalUploadProjectContainer.style.display = "flex";
});

backButton.addEventListener("click", function () {
  modalWrapper.style.display = "flex";
  modalUploadProjectContainer.style.display = "none";
});
