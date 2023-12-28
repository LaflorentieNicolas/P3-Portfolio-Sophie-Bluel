async function worksData() {
  const response = await fetch("http://localhost:5678/api/works");
  // si c'est ok le code continue sinon erreur
  if (response.ok) {
    // extraction des données JSON et est stockées sur la variable Works
    const data = await response.json();
    works = data;

    // itération tableau, boucle création des éléments
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
  } else {
    console.error("error");
  }
}

// Appel de la fonction
worksData();
