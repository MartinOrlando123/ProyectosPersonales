const orden = []
const platos = [
  {
    id:1,nombre:"Pollo Asado", precio:1200
  },
  {
    id:2,nombre:"Papas Fritas", precio:500
  },
  {
    id:3,nombre:"Ensalada", precio:300
  },
];
const elementosDelDOM = function(){
  const divDeComidas = document.getElementById("comidas");
  const divDeOrdenes = document.getElementById("ordenes_agregadas");
  const totalDeComidas = document.getElementById("precio_total");
  const propinaSugerida = document.getElementById("propina_sugerida");
  const divDePlatos = document.getElementById("platos");
  return{
    divDeComidas, divDeOrdenes, totalDeComidas, propinaSugerida, divDePlatos
  };
}();
const funcionesDePantalla = (function(){
  const transformarAEtiquetas = (objeto)=> `
    <div className="carta_de_comida">
    <div className="cabeza_de_carta">
    <h3>${objeto.nombre}</h3>
    </div>
    <div className="pie_de_carta">${objeto.precio}</div>
    <button id="agregar_a_orden">Agregar</button>
    </div>
  `;
  const mostrarEnPantalla = (div)=>(string)=>{
    div.innerHTML="";
    div.innerHTML=string;

  };
    const reducirEtiquetas = (acc,item)=>`${acc+item}`;
  const modificarArray =(fn)=>(div)=>(array)=>{
    if(array.lenght===0)return;
    const stringDeEtiquetas =array.map(fn).reduce(reducirEtiquetas)
    mostrarEnPantalla(div)(stringDeEtiquetas);
  }
  const transformarEtiquetasDeOrden= (objeto)=>`<div className="carta_de_ordenes">
  <h3>${objeto.nombre}${objeto.precio}</h3>
  </div>`;
  const modificarArrayDePlatos = modificarArray(transformarAEtiquetas)
  const modificarArrayDeOrdenes = modificarArray(transformarEtiquetasDeOrden)
  return {
    modificarArrayDeOrdenes,
    modificarArrayDePlatos,
    mostrarEnPantalla,
  };
})();

const {
  divDeComidas, divDeOrdenes, totalDeComidas, propinaSugerida, divDePlatos
} = elementosDelDOM;

const agregarAOrden = item=>array=>{
  array.push(item);
};
const encontrarPlato = (nombre)=>platos.find((item)=>item.nombre===nombre);
const sumarTotalDeComida=(array)=>array.reduce((acc,item)=>acc+parseInt(item.precio), 0);
const obtenerPropina = porcentaje=>valor=> valor*porcentaje/100;
const obtener10=obtenerPropina(10);
const obtener20=obtenerPropina(20);
const obtener45=obtenerPropina(45);
const manejarElClick = (e)=>{
  if(e.target.id ==='agregar_a_orden'){
    const nombreDelPlato = e.target.parentElement.childNodes[1].childNodes[1].innerText;
    agregarAOrden(encontrarPlato(nombreDelPlato))(orden);
    funcionesDePantalla.modificarArrayDeOrdenes(divDeOrdenes)(orden);
    funcionesDePantalla.mostrarEnPantalla(totalDeComidas)(sumarTotalDeComida(orden));
    funcionesDePantalla.mostrarEnPantalla(propinaSugerida)(obtener20(sumarTotalDeComida(orden)));
  }

};
divDePlatos.onclick = manejarElClick;
funcionesDePantalla.modificarArrayDePlatos(divDeComidas)(platos);
