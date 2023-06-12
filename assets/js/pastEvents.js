let card = document.getElementById("box-cards")

function datos(event) {
return `<div class="cards-css1 card shadow" style="width: 15rem;">
<img src="${event.image}" class="card-img-top" alt="${event.name}">
<div class="card-body">
  <h5 class="card-title">${event.name}</h5>
  <p class="card-text">${event.description}</p>
  <div><a href="../pages/details.html?name=${event.name}" class="btn btn-primary">Details</a><br><br>
  <p>Price ${event.price}</p></div>
</div>
</div>`;
  }
    function imprimirDatos(events) {
      const fechaActual = (data.currentDate);
      card.innerHTML = '';
      let template = "";
      for (let evento of events) {
        let fechaEvento = (evento.date); 
        if (fechaEvento < fechaActual) {
          template += datos(evento);
        }
      }
      
      console.log(template);
      card.innerHTML += template;
    }
    
    imprimirDatos(data.events);

 //filtrar por categorias, empieza aca  
 const checkBox=document.getElementById("checkBoxDiv")

 //buscamos las categorias en data.js
 const categorias= data.events.map(events=>events.category)
 
 // categorias sin repetir osea 7
 const categoriasSinRepetir= new Set (categorias)
 
 //transformamos en array
 const arrayCategoriasSinRepetir = Array.from(categoriasSinRepetir)
 
 //Ejecuto la funcion
 imprimirCheckbox( arrayCategoriasSinRepetir, checkBox )
 
 
 //
 
 function crearCheck( category ){
   const div = document.createElement('DIV')
   div.classList.add( 'form-check' )
 
   const input = document.createElement( 'INPUT' )
   input.type = "checkbox"
   input.className = "form-check-input"
   input.value = category
   input.id = `${category}-check` //-> JS-check
   input.name = "category"
 
   const label = document.createElement('LABEL')
   label.className = "form-check-label"
   label.setAttribute('for',`${category}-check`)
   label.textContent = category
   label.style = "cursor:pointer"
 
   div.appendChild(input)
   div.appendChild(label)
 
   return div
 } 
 
 // una funcion que llevo los checkbox al dom //
 
 function imprimirCheckbox( categorias, elemento ){
 
   const fragment = document.createDocumentFragment()
 
   for (const category of categorias) {
       const div = crearCheck( category )
       fragment.appendChild( div )
   }
 
   elemento.appendChild( fragment )
 }  
 ///////////
 const checkboxes = checkBox.querySelectorAll(`input[type="checkbox"]`);
 let searchInput = document.getElementById("search-input");
 function filtrarCartas(){
   let categoriasSeleccionada = [];
   checkboxes.forEach(checkbox => {
       if (checkbox.checked){
           categoriasSeleccionada.push(checkbox.labels[0].innerText)
       }
   })
 
   let searchQuery = searchInput.value.toLowerCase().trim();
 
   if (categoriasSeleccionada.length > 0 || searchQuery !== ``) {
       let filteredEvents = data.events.filter((event) => {
           let categoryNameMatch = categoriasSeleccionada.length === 0 || categoriasSeleccionada.includes(event.category);
           let nameMatch = event.name.toLowerCase().includes(searchQuery);
           let descriptionMatch = event.description.toLowerCase().includes(searchQuery);
           return categoryNameMatch && (nameMatch || descriptionMatch);
       });
       imprimirDatos(filteredEvents);
   } else {
       imprimirDatos(data.events);
   }
 }
 
 checkboxes.forEach((checkbox) => {
   checkbox.addEventListener("change", filtrarCartas);
 });
 
 searchInput.addEventListener(`keyup`, filtrarCartas);
 window.addEventListener(`load`, () => {
   console.log(`Window loaded. Rendering all events.`);
   imprimirDatos(data.events);
 });


    