
const contenedor= document.getElementById('card-details')
/*esta constante nos crea un nuevo url search params que nos muestra el search*/
const params= new URLSearchParams(location.search)
/*aca estamos guardando el name de la url*/
const nombre= params.get('name')

/*constante que almacena una funcion con un metodo de orden superior que itera uno por uno comparando el name con el parametro name de la constante nombre*/
const detailsEncontrados = data.events.find(events => events.name === nombre)

    contenedor.innerHTML= `
    <img id="details" src="${detailsEncontrados.image}">
    <div class="decription-details">
    <h4>${detailsEncontrados.category}</h4>
    <p>${detailsEncontrados.date}</p>
    <p>
    ${detailsEncontrados.description}<br>
    </p>
    <p>
    Capacity:  ${detailsEncontrados.capacity}
    </p>
    <p>
    Place: ${detailsEncontrados.place}
    </p>
    <p>
    Price:${detailsEncontrados.price}
    </p>
    </div>
    `
