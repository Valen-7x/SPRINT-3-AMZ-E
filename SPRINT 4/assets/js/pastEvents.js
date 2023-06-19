import {
  datos,
  imprimirDatos,
  imprimirCheckbox,
  crearCheck,
  filtrarCartas,
} from "./module/function.js";

let card = document.getElementById("box-cards");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    imprimirDatos(data, card);
    // Filtrar por categorías
    const checkBox = document.getElementById("checkBoxDiv");
    const categorias = data.events.map((event) => event.category);
    const categoriasSinRepetir = [...new Set(categorias)];
    imprimirCheckbox(categoriasSinRepetir, checkBox, crearCheck);
    const checkboxes = checkBox.querySelectorAll(`input[type="checkbox"]`);
    let searchInput = document.getElementById("search-input");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        filtrarCartas(data, checkboxes, searchInput, imprimirDatos, card);
      });
    });
    searchInput.addEventListener("keyup", () => {
      filtrarCartas(data, checkboxes, searchInput, imprimirDatos, card);
    });
  });
