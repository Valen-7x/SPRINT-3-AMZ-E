 import {
    imprimirTabla,
    imprimirTabla2,
    imprimirTabla3,
    
  } from './module/function.js'
 

    fetch('https://mindhub-xj03.onrender.com/api/amazing') 
    .then(response => response.json())
    .catch(err => { console.log("Error"); })
    .then(data => {   
      
      imprimirTabla(data.events);
      imprimirTabla2(data.events,data.currentDate);
      imprimirTabla3(data.events,data.currentDate);
    });
    
  













