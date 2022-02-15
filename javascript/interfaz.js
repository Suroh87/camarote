window.onload = iniciar;
var cargaNavio = [];
var puntosProvisiones;
function iniciar () {
	creaEstructura();

}

function creaEstructura() {
	var contenedorGeneral = creaNodo('div','contenedorGeneral',document.body);
	contenedorGeneral.className='contenedorGeneral';

	var contenedorConsumo = creaNodo('div','contenedorConsumo',contenedorGeneral);
	contenedorConsumo.className='contenedorConsumo';

	var contenedorCarga = creaNodo('div','contenedorCarga',contenedorGeneral);
	contenedorCarga.className='contenedorCarga';

	creaConsumo();

	creaCarga();

	creaModalModCarga();
}

function creaConsumo() {
	var form = creaNodo('form','form',document.getElementById('contenedorConsumo'));
	form.setAttribute('method','post');
	form.setAttribute('name','form');
	form.className='formulario';

	var fieldsetconsumo= creaNodo('fieldset','fieldsetconsumo',form);
	fieldsetconsumo.className='fieldset';

	var legendConsumo = creaNodo('legend','legendConsumo',fieldsetconsumo);
	legendConsumo.innerHTML = 'calculador de consumo de vituallas ';
	
	
	var lab1= creaNodo('label','lab1',fieldsetconsumo);
	lab1.setAttribute('for','tripulacion');
	lab1.innerHTML='A bordo: ';
	lab1.className='label';

	var tripulacion=creaNodo('input','tripulacion',fieldsetconsumo);
	tripulacion.setAttribute('type','number');
	tripulacion.setAttribute('name','tripulacion');
	tripulacion.placeholder='personas a bordo';
	tripulacion.className='inputNumber';

	var lab2= creaNodo('label','lab2',fieldsetconsumo);
	lab2.setAttribute('for','dias');
	lab2.innerHTML='Dias de viaje: ';
	lab2.className='label';

	var dias=creaNodo('input','dias',fieldsetconsumo);
	dias.setAttribute('type','number');
	dias.setAttribute('name','dias');
	dias.placeholder='Dias que dura el viaje';
	dias.className='inputNumber';

	var calcular= creaNodo('div','calcular',fieldsetconsumo);
	calcular.innerHTML='CALCULAR';
	calcular.className = 'button';
	calcular.onclick=calcularConsumo;

	var aplicar= creaNodo('div','aplicar',fieldsetconsumo);
	aplicar.innerHTML='APLICAR';
	aplicar.className = 'button';
	aplicar.onclick =guardarContCargaCalculado;

	var resultado = creaNodo('div','resultado',fieldsetconsumo);
};

function calcularConsumo() {
	var personas= document.getElementById('tripulacion').value;
	var dias= document.getElementById('dias').value;
/*
La tripulación de los barcos debe alimentarse y beber; una de las principales preocupaciones de todo capitán es asegurarse de que su barco está convenientemente aprovisionado.
Para no complicar mucho las cosas, las provisiones se adquirirán en cómodos “puntos” genéricos, evitando así tener que llevar el control de cada barril de agua y tajada de salazón. 
Cada punto representa suficiente comida y agua (junto con otras necesidades) para una persona a bordo del barco y pueden adquirirse a un precio de 1 € por “ración de navío”.
Esto incluye fruta capaz de mantener a raya el escorbuto. Cada quinientos puntos de provisiones ocupan un espacio de carga. Todos los navíos (excepto los botes y paraolas) incluyen
espacio para quinientos puntos de provisiones, pero puedes utilizar más espacios de carga en su transporte si quieres. Ten en cuenta que las provisiones no son lo mismo 
que los “alimentos” que puedes comprar o vender en los puertos de Caribdus. Como provisiones hablamos de galleta, tasajo y agua, mientras que los alimentos son frutas exóticas, 
pan, grano, vino y otros productos de lujo.
En momentos de necesidad un espacio de carga dedicado a alimentos se puede canibalizar como provisiones, en cuyo caso proporcionará cincuenta unidades.
*/
	var resultado= document.getElementById('resultado');
	puntosProvisiones = personas*dias;
	resultado.innerHTML ="<b>"+personas+ "</b> personas a bordo consumirian un total de: <b>"+ puntosProvisiones+"</b> puntos de Provisiones.</br>Esto supondrá <b>"
	+(puntosProvisiones/500)+"</b> unidades de carga. (cada unidad de carga de raciones son 500 puntos de Provisiones.)";

}

function creaCarga() {
	var form2 = creaNodo('form','form',document.getElementById('contenedorCarga'));
	form2.setAttribute('method','post');
	form2.setAttribute('name','form');
	form2.className='formulario';

	var fieldsetCarga= creaNodo('fieldset','fieldsetCarga',form2);
	fieldsetCarga.className='fieldset';

	var legendCarga = creaNodo('legend','legendCarga',fieldsetCarga);
	legendCarga.innerHTML = 'Gestor de carga';
	
	
	var lab1= creaNodo('label','lab1',fieldsetCarga);
	lab1.setAttribute('for','capacidadCarga');
	lab1.innerHTML='Capacidad del navío:';
	lab1.className='label';

	var capacidadCarga=creaNodo('input','capacidadCarga',fieldsetCarga);
	capacidadCarga.setAttribute('type','number');
	capacidadCarga.setAttribute('name','capacidadCarga');
	capacidadCarga.placeholder='Capacidad de carga:';
	capacidadCarga.className='inputNumber';

	var lab2= creaNodo('label','lab2',fieldsetCarga);
	lab2.setAttribute('for','filas');
	lab2.innerHTML='Filas: ';
	lab2.className='label';

	var filas=creaNodo('input','filas',fieldsetCarga);
	filas.setAttribute('type','number');
	filas.setAttribute('name','filas');
	filas.placeholder='filas a mostrar';
	filas.className='inputNumber';

	var visualizar= creaNodo('div','visualizar',fieldsetCarga);
	visualizar.innerHTML='VISUALIZAR';
	visualizar.className = 'button';
	visualizar.onclick = interfazCargamento;

	var guardar= creaNodo('div','guardar',fieldsetCarga);
	guardar.innerHTML='GUARDAR';
	guardar.className = 'button';
	guardar.onclick = guardarCargamento;

	var cargar= creaNodo('input','cargar',fieldsetCarga);
	cargar.innerHTML='CARGAR';
	cargar.className = 'button salto';
	cargar.setAttribute('type','file');
	cargar.onchange = cargarCargamento;

/*
	var visualizar2= creaNodo('div','visualizar2',fieldsetCarga);
	visualizar2.innerHTML='VISUALIZAR';
	visualizar2.className = 'button';
	visualizar2.onclick = carga;
*/


	var contenedorCargaVisual = creaNodo('div','contenedorCargaVisual',document.getElementById('contenedorCarga'));
	contenedorCargaVisual.className='contenedorCargaVisual';


}

function guardarCargamento() {

	var fichaJson = JSON.stringify(cargaNavio);
	
	descarga("CARGAMENTO.json",fichaJson);

}

function cargarCargamento(e) {
	var archivo = e.target.files[0];
	if (!archivo) {
	    return;
	 }

  var lector = new FileReader();
 
  lector.onload = function(e) {
  	while(cargaNavio.length!=0){
   		cargaNavio.pop();
   	}
    var contenido = e.target.result;
	cargaNavio = JSON.parse(contenido);
   };
  
  lector.readAsText(archivo);

  window.setTimeout(carga, 500);

}

function carga() {
	console.log ("CARGA");

contenedorCargaVisual = document.getElementById('contenedorCargaVisual');
	while (contenedorCargaVisual.lastElementChild) {
    	contenedorCargaVisual.removeChild(contenedorCargaVisual.lastElementChild);
  	}

	var capacidadCarga = cargaNavio.length;
	var filas = document.getElementById('filas').value;
	if (filas==0 || filas<1){
		filas=1;
	}
	var columnas = (cargaNavio.length/filas).toFixed(0);
	var cont=1;
	console.log(cargaNavio.length);

	for (var i = 0; i <filas ; i++) {
		for (var j = 0; j < columnas; j++) {
			if (cont>capacidadCarga) {
				break;
			}
			var carga = creaNodo('div','carga '+cont, document.getElementById('contenedorCargaVisual'));
			carga.className='carga ';
			carga.innerHTML=cargaNavio[(cont-1)].Posicion+"</br>"+cargaNavio[cont-1].Contenido+"</br>"+cargaNavio[cont-1].Cantidad;
			carga.onclick=modCarga;
			carga.numero=cont;
			cont++;
		
			
			if (j==0) {
				carga.className+='salto';
			}
		}
	}
}


function interfazCargamento () {

	contenedorCargaVisual = document.getElementById('contenedorCargaVisual');
	while (contenedorCargaVisual.lastElementChild) {
    	contenedorCargaVisual.removeChild(contenedorCargaVisual.lastElementChild);
  	}
  	while(cargaNavio.length!=0){
   		cargaNavio.pop();
   	}

	var capacidadCarga = document.getElementById('capacidadCarga').value;
	var filas = document.getElementById('filas').value;
	if (filas==0 || filas<1){
		filas=1;
	}
	var columnas = capacidadCarga/filas;

	var cont=1;

	for (var i = 0; i <filas ; i++) {
		for (var j = 0; j < columnas; j++) {
			if (cont>capacidadCarga) {
				break;
			}
			var carga = creaNodo('div','carga '+cont, document.getElementById('contenedorCargaVisual'));
			carga.className='carga ';
			
			carga.onclick=modCarga;
			carga.numero=cont;
			cont++;
			var contenedor = {Posicion:(cont-1),Contenido:"Vacio",Cantidad:"0"};
			cargaNavio.push(contenedor);
			carga.innerHTML=contenedor.Posicion+"</br>"+contenedor.Contenido+"</br>"+contenedor.Cantidad;
			if (j==0) {
				carga.className+='salto';
			}
		}
	}

	console.log(cargaNavio);
}

function creaModalModCarga () {
	var modal = creaNodo('div','modal',document.body); 
	modal.className='modal ';
	var cierre = creaNodo('div','cierre',modal); 
	cierre.className='cierre';
	cierre.innerHTML='X';
	cierre.onclick=cierreModal;

	var lab0= creaNodo('label','lab0',modal);
	lab0.setAttribute('for','posicion');
	lab0.innerHTML='Posición: ';
	lab0.className='label';


	var posicion= creaNodo('input','posicion',modal);
	posicion.setAttribute('type','number');
	posicion.setAttribute('name','posicion');
	posicion.placeholder='posición de la carga:';
	posicion.className='inputNumber';
	posicion.setAttribute('min',1);
	


	var lab1= creaNodo('label','lab1',modal);
	lab1.setAttribute('for','selContenidoCarga');
	lab1.innerHTML='Contenido: ';
	lab1.className='label';

	var selContenidoCarga=creaNodo('select','selContenidoCarga',modal);
		selContenidoCarga.setAttribute('name','selContenidoCarga');
		selContenidoCarga.className = 'selector';

	var lab2= creaNodo('label','lab2',modal);
	lab2.setAttribute('for','cantidad');
	lab2.innerHTML='Cantidad: ';
	lab2.className='label';

	var cantidad= creaNodo('input','cantidad',modal);
	cantidad.setAttribute('type','number');
	cantidad.setAttribute('name','cantidad');
	cantidad.placeholder='Cantidad:';
	cantidad.className='inputNumber';

	var guardar= creaNodo('div','guardar',modal);
	guardar.innerHTML='GUARDAR';
	guardar.className = 'button';
	guardar.onclick = guardarContCarga;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {          
		if (this.readyState == 4 && this.status == 200) {
			tiposCarga=JSON.parse(this.responseText);

				for (var i = 0; i < tiposCarga.length; i++) {
					
					var tipo = creaNodo('option','tipo',selContenidoCarga);
					tipo.innerHTML=tiposCarga[i];
				}
				
		}
	};
	xhttp.open("GET","json/tiposCarga.json", true);
	xhttp.send();
}

function guardarContCarga () {


	var posicion = document.getElementById('posicion');
	var pos=posicion.value;
	var selContenidoCarga = document.getElementById('selContenidoCarga').value;
	var cantidad = document.getElementById('cantidad').value;
	var contenedor={Posicion:pos,Contenido:selContenidoCarga,Cantidad:cantidad};
	
		cargaNavio[pos-1]=contenedor;
	
	var carga= document.getElementById('carga '+pos);

	carga.innerHTML=cargaNavio[(pos-1)].Posicion+"</br>"+cargaNavio[pos-1].Contenido+"</br>"+cargaNavio[pos-1].Cantidad;

console.log(cargaNavio);


}

function guardarContCargaCalculado () {
	console.log(cargaNavio)

for (var i = cargaNavio.length - 1; i >= 0; i--) {
	if(cargaNavio[i].Contenido=="Provisiones"){
		console.log("Restando Provisiones");
		cargaNavio[i].Cantidad=cargaNavio[i].Cantidad-puntosProvisiones;
		//window.setTimeout(carga, 500);
		carga();
		return;
	}
}
alert("No hay Provisiones en la carga del barco");

}
function modCarga() {

    var modal = document.getElementById('modal');
    modal.className='modal visible';
  	
  	var max = document.getElementById('capacidadCarga').value;
	console.log(max);
    
    var posicion=document.getElementById('posicion');
    posicion.setAttribute('max',max);
	posicion.value=this.numero;

	

	
}

function cierreModal() {
	var modal = document.getElementById('modal');
    modal.className='modal ';

}
function creaNodo(tipo,id, padre) {
	var ele = document.createElement(tipo);
    padre.appendChild(ele);
    ele.id=id;
    return ele;
}
