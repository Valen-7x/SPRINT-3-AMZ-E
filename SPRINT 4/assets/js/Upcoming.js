import {
  imprimirDatos2,
  imprimirCheckbox,
  crearCheck,
  filtrarCartas,
} from "./module/function.js";

let card = document.getElementById("box-cards");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    imprimirDatos2(data, card);
    const checkBox = document.getElementById("checkBoxDiv");
    const categorias = data.events.map((event) => event.category);
    const categoriasSinRepetir = [...new Set(categorias)];
    imprimirCheckbox(categoriasSinRepetir, checkBox, crearCheck);
    const checkboxes = checkBox.querySelectorAll(`input[type="checkbox"]`);
    let searchInput = document.getElementById("search-input");
    function handleFiltrarCartas() {
      filtrarCartas(data, checkboxes, searchInput, imprimirDatos2, card);
    }
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleFiltrarCartas);
    });
    searchInput.addEventListener("keyup", handleFiltrarCartas);
  });
