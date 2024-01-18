const APIWORKS_URL = "http://localhost:5678/api/works";

const modalWrapper = document.getElementById("modal-wrapper");
const modalContainer = document.getElementById("modal");

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
    closeModal(modalContainer);
  });

// Fermer la modal en cliquant à l'extérieur
window.addEventListener("click", function (e) {
  if (e.target === modalContainer) {
    closeModal(modalContainer);
  }
});

// Fermer la modal avec le bouton clavier Esc
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal(modalContainer);
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

// ----------Modal 2 ajouter des projets----------

// Container de la modal 2
const modalUploadProjectContainer = document.getElementById(
  "modal-upload-project-container"
);
// Récupération du bouton "Ajouter une photo" présent sur modal 1"
const addProjectButton = document.getElementById("add-project-button");
// Récupération du bouton <- de la modal 2
const backButton = document.getElementById("back-button");
// Récupération du bouton "+ Ajouter une photo"

// Aller sur la modal 2 en clickant sur le bouton "Ajouter une photo" présent sur la modal 1
addProjectButton.addEventListener("click", function () {
  modalWrapper.style.display = "none";
  modalUploadProjectContainer.style.display = "flex";
});

// Revenir sur la modal 1 en utilisant le bouton <- ça change le display de la modal 2 en none la 1 en flex
backButton.addEventListener("click", function () {
  modalWrapper.style.display = "flex";
  modalUploadProjectContainer.style.display = "none";
});

////////////////////////////////////////////////////////////
const projectPictureInput = document.getElementById("project-picture-input");
const dropProjectContainer = document.getElementById("drop-project-container");

projectPictureInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    // Cacher les balises enfants de dropProjectContainer si un fichier est sélectionné
    dropProjectContainer.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        child.style.display = "none";
      }
    });

    // Créer un objet FileReader pour lire le contenu du fichier
    const reader = new FileReader();

    reader.onload = function (e) {
      const thumbnailImage = document.createElement("img");
      thumbnailImage.src = e.target.result;
      thumbnailImage.alt = "Thumbnail";
      thumbnailImage.classList.add("thumbnail-image");

      // Appliquer les styles à l'aperçu de l'image pour qu'il rentre dans le container drop-project-container
      thumbnailImage.style.maxHeight = "100%";
      thumbnailImage.style.width = "auto";

      // Ajouter l'aperçu de l'image dans le container
      dropProjectContainer.appendChild(thumbnailImage);
    };

    // Charger le contenu du fichier en tant que Data URL
    reader.readAsDataURL(file);
  }
});
