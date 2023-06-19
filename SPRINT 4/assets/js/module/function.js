//*MAIN */
export function imprimirDatos1(data, card) {
  card.innerHTML = "";
  let template = "";
  for (let evento of data.events) {
    template += datos1(evento);
  }
  card.innerHTML += template;
}
export function datos1(event) {
  return `<div class="cards-css1 card shadow" style="width: 15rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <div class="div-btn-price">
        <a href="./pages/details.html?name=${event.name}" class="btn btn-primary">Details</a><br><br>
        <p>Price ${event.price}</p>
      </div>
    </div>
  </div>`;
}
//*UPCOMING EVENTS */
export function imprimirDatos2(data, card) {
  const fechaActual = data.currentDate;
  card.innerHTML = "";
  let template = "";
  for (let evento of data.events) {
    let fechaEvento = evento.date;
    if (fechaEvento > fechaActual) {
      template += datos(evento);
    }
  }
  console.log(template);
  card.innerHTML += template;
}
//*PAST EVENTS / UPCOMING*/
export function datos(event) {
  return `<div class="cards-css1 card shadow" style="width: 15rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <div class="div-btn-price">
        <a href="../pages/details.html?name=${event.name}" class="btn btn-primary">Details</a><br><br>
        <p>Price ${event.price}</p>
      </div>
    </div>
  </div>`;
}
/*PAST-EVENTS */
export function imprimirDatos(data, card) {
  console.log(data);
  const fechaActual = data.currentDate;
  console.log(fechaActual);
  card.innerHTML = "";
  let template = "";
  for (let evento of data.events) {
    let fechaEvento = evento.date;
    if (fechaEvento < fechaActual) {
      template += datos(evento);
    }
  }
  card.innerHTML += template;
}
export function crearCheck(category) {
  const div = document.createElement("div");
  div.classList.add("form-check");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "form-check-input";
  input.value = category;
  input.id = `${category}-check`;
  input.name = "category";

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", `${category}-check`);
  label.textContent = category;
  label.style.cursor = "pointer";

  div.appendChild(input);
  div.appendChild(label);

  return div;
}
export function imprimirCheckbox(categorias, elemento, crearCheck) {
  const fragment = document.createDocumentFragment();
  for (const category of categorias) {
    const div = crearCheck(category);
    fragment.appendChild(div);
  }
  elemento.appendChild(fragment);
}
export function filtrarCartas(
  data,
  checkboxes,
  searchInput,
  imprimirDatos,
  card
) {
  let categoriasSeleccionadas = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      categoriasSeleccionadas.push(checkbox.labels[0].innerText);
    }
  });
  let searchQuery = searchInput.value.toLowerCase().trim();
  if (categoriasSeleccionadas.length > 0 || searchQuery !== "") {
    let filteredEvents = data.events.filter((event) => {
      let categoryNameMatch =
        categoriasSeleccionadas.length === 0 ||
        categoriasSeleccionadas.includes(event.category);
      let nameMatch = event.name.toLowerCase().includes(searchQuery);
      let descriptionMatch = event.description
        .toLowerCase()
        .includes(searchQuery);
      return categoryNameMatch && (nameMatch || descriptionMatch);
    });
    imprimirDatos(
      { events: filteredEvents, currentDate: data.currentDate },
      card
    );
  } else {
    imprimirDatos(data, card);
  }
}
//*  STATS    *//
const table1 = document.getElementById("tabloski1");
const table2 = document.getElementById("tabloski2");
const table3 = document.getElementById("tabloski3");
export function tabla1(event) {
  return `
          <thead>
            <tr>
              <th>Events statistics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Events with the highest percentage of attendance</td>
              <td>Events with the lowest percentage of attendance</td>
              <td>Event with larger capacity</td>
            </tr>
            <tr>
              <td id="highestAttendanceEvent"><p></p></td>
              <td id="lowestAttendanceEvent"><p></p></td>
              <td id="largerCapacityEvent"><p></p></td>
            </tr>
          </tbody>
        `;
}

export function imprimirTabla(events) {
  table1.innerHTML = tabla1();
/*highestPercentage es una variable que se inicializa en 0 y
 se utiliza para almacenar el porcentaje más alto encontrado hasta el momento. */
  let highestPercentage = 0;
 /*eventWithHighestPercentage es una variable que se inicializa como nula
  y se utiliza para almacenar el evento asociado al porcentaje más alto. */
  let eventWithHighestPercentage = null;
  /*lowestPercentage es una variable que se inicializa en Infinito 
  (un valor extremadamente grande) y se utiliza para almacenar el porcentaje más bajo encontrado hasta el momento. */
  let lowestPercentage = Infinity;
  let eventWithLowestPercentage = null;
  let largerCapacity = 0;
  let eventWithLargerCapacity = null;

  for (let evento of events) {
    const percentageAttendance = (
      (evento.assistance / evento.capacity) *
      100
    ).toFixed(2);

    if (parseFloat(percentageAttendance) > highestPercentage) {
      highestPercentage = parseFloat(percentageAttendance);
      eventWithHighestPercentage = evento;
    }

    if (parseFloat(percentageAttendance) < lowestPercentage) {
      lowestPercentage = parseFloat(percentageAttendance);
      eventWithLowestPercentage = evento;
    }

    if (evento.capacity > largerCapacity) {
      largerCapacity = evento.capacity;
      eventWithLargerCapacity = evento;
    }
  }

  if (eventWithHighestPercentage) {
    const highestAttendanceEvent = document.getElementById(
      "highestAttendanceEvent"
    );
    highestAttendanceEvent.innerHTML = `${eventWithHighestPercentage.name} - ${highestPercentage}%`;
  }

  if (eventWithLowestPercentage) {
    const lowestAttendanceEvent = document.getElementById(
      "lowestAttendanceEvent"
    );
    lowestAttendanceEvent.innerHTML = `${eventWithLowestPercentage.name} - ${lowestPercentage}%`;
  }

  if (eventWithLargerCapacity) {
    const largerCapacityEvent = document.getElementById("largerCapacityEvent");
    largerCapacityEvent.innerHTML = `${eventWithLargerCapacity.name} - Capacity: ${eventWithLargerCapacity.capacity}`;
  }
}
/* ******************************************************************************* */
export function tabla2(events, currentDate) {
  const categoriesSet = new Set();
  let template = `
      <thead>
        <tr>
          <th>Upcoming events statistics by category</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentage of attendance</td>
        </tr>
      `;
  // Filtrar eventos futuros
  const upcomingEvents = events.filter((event) => {
    const currentDate1 = new Date(currentDate);
    const eventDate = new Date(event.date);
    return eventDate > currentDate1;
  });
  // Obtener categorías únicas de eventos futuros
  upcomingEvents.forEach((event) => {
    categoriesSet.add(event.category);
  });
  // Generar filas de la tabla para cada categoría única
  categoriesSet.forEach((category) => {
    /*Filtro los eventos futuros, en eventos con la misma categoria */
    const categoryEvents = upcomingEvents.filter(
      (event) => event.category === category
    );
    console.log(categoryEvents);
    /* reduzco categoria events y la acumulo en un total */
    const revenues = categoryEvents.reduce(
      (total, event) =>
        total +
        (event.assistance
          ? event.assistance * event.price
          : event.price * event.estimate),
      0
    );
    console.log(revenues);
    const averageAttendance = (
      categoryEvents.reduce(
        (total, event) =>
          total +
          (event.assistance
            ? (event.assistance * 100) / event.capacity
            : (event.estimate * 100) / event.capacity),
        0
      ) / categoryEvents.length
    ).toFixed(2);
    template += `
        <tr>
          <td>${category}</td>
          <td>$ ${revenues.toLocaleString()}</td>
          <td>${averageAttendance}%</td>
        </tr>
      `;
  });
  template += `
      </tbody>
      `;
  return template;
}

export function imprimirTabla2(events, currentDate) {
  table2.innerHTML = tabla2(events, currentDate);
}
/*************************************************************************************** */
export function tabla3(events, currentDate) {
  const categoriesSet = new Set();
  let template = `
          <thead>
            <tr>
              <th>Past events statistics by category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Categories</td>
              <td>Revenues</td>
              <td>Percentage of attendance</td>
            </tr>
          `;
  // Filtrar eventos pasados
  const pastEvents = events.filter((event) => {
    const currentDate3 = new Date(currentDate);
    const eventDate = new Date(event.date);
    return eventDate < currentDate3;
  });
  // Obtener categorías únicas de eventos pasados
  pastEvents.forEach((event) => {
    categoriesSet.add(event.category);
  });
  // Generar filas de la tabla para cada categoría única
  categoriesSet.forEach((category) => {
    /* Filtro los eventos futuros, en eventos con la misma categoría */
    const categoryEvents2 = pastEvents.filter(
      (event) => event.category === category
    );
    console.log(categoryEvents2);
    /* Reduzco categoria events y la acumulo en un total */
    const revenues = categoryEvents2.reduce(
      (total, event) =>
        total +
        (event.assistance
          ? event.assistance * event.price
          : event.price * event.estimate),
      0
    );
    console.log(revenues);
    const averageAttendance = (
      categoryEvents2.reduce(
        (total, event) =>
          total +
          (event.assistance
            ? (event.assistance * 100) / event.capacity
            : (event.estimate * 100) / event.capacity),
        0
      ) / categoryEvents2.length
    ).toFixed(2);
    template += `
            <tr >
              <td>${category}</td>
              <td>$ ${revenues.toLocaleString()}</td>
              <td>${averageAttendance}%</td>
            </tr>
          `;
  });
  template += `
          </tbody>
          `;
  return template;
}

export function imprimirTabla3(events, currentDate) {
  table3.innerHTML = tabla3(events, currentDate);
}
