import {
  imprimirDatos1,
  imprimirCheckbox,
  crearCheck,
  filtrarCartas,
} from "../js/module/function.js";

let card = document.getElementById("box-cards");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    imprimirDatos1(data, card);
    const checkBox = document.getElementById("checkBoxDiv");
    const categorias = data.events.map((event) => event.category);
    const categoriasSinRepetir = [...new Set(categorias)];
    imprimirCheckbox(categoriasSinRepetir, checkBox, crearCheck);
    const checkboxes = checkBox.querySelectorAll(`input[type="checkbox"]`);
    let searchInput = document.getElementById("search-input");
    function handleFiltrarCartas() {
      filtrarCartas(data, checkboxes, searchInput, imprimirDatos1, card);
    }
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleFiltrarCartas);
    });
    searchInput.addEventListener("keyup", handleFiltrarCartas);
  });
