// Gestion de ce qui doit apparaitre sur index.html lorsque admin est log.

// récupération des balises par leurs ID (login, logout et les filtres)
const logout = document.getElementById("logout-button");
const login = document.getElementById("login-button");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const blackBar = document.getElementById("black-bar");
const modalButton = document.getElementById("js-button-modal");

// Lorsque l'on click sur logout, permet de supprimer le token stocké dans le localStorage et de recharger la page
logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});
// récupère le token du localStorage, s'il n'y en a pas alors null, sinon elle renvoie le token
function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}
// cette fonction est appelée au chargement de la page, et utilise le token pour déterminer si l'utilisateur est connecté
// Si un token existe, alors cela masque le bouton "login", filtres et modale, sinon cela masque logout
function init() {
  const token = getToken();
  if (token) {
    console.log(filters);
    login.style.display = "none";
    filters.style.display = "none";
  } else {
    logout.style.display = "none";
    blackBar.style.display = "none";
    modalButton.style.display = "none";
  }
}

init();
