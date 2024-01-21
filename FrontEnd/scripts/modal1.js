const APIWORKS_URL = "http://localhost:5678/api/works";

const modalWrapper = document.getElementById("modal-wrapper");
const modalContainer = document.getElementById("modal");
const modalUploadProjectContainer = document.getElementById("modal2");
// ouverture de la modal en clickant sur la balise href
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));

  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
};

const closeModal = function (target) {
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.removeAttribute("aria-modal");
};

// Récupération du bouton pour ouvrir la modal
document.getElementById("js-button-modal").addEventListener("click", openModal);

// Fermer la modal 1 "galerie" avec la croix
document
  .querySelector("#button-close-modal-1")
  .addEventListener("click", function (e) {
    e.preventDefault();
    closeModal(modalContainer);
  });

// Fermer la modal 2 "ajout photo" avec la croix
document
  .querySelector("#button-close-modal-2")
  .addEventListener("click", function (e) {
    e.preventDefault();
    closeModal(modalUploadProjectContainer);
  });

// Fermer la modal en cliquant à l'extérieur
window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    closeModal(modalContainer);
  }
  if (e.target === modalUploadProjectContainer) {
    closeModal(modalUploadProjectContainer);
  }
});

// Fermer la modal avec le bouton clavier Esc
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal(modalContainer);
    closeModal(modalUploadProjectContainer);
  }
});

// ----------Création modale gallerie----------//

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
      figure.setAttribute("data-id", work.id);

      deleteIcon.addEventListener("click", function (event) {
        event.preventDefault();
        deleteProjectById(work.id);
      });
    });
  });

// Modale 1 suppression d'un projet

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
