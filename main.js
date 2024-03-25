//Array de objetos literales
const vehiculos = [
    {i: 1, nombre: "Renault/Ford/Chevrolet/Volkswagen"},
    {i: 2, nombre: "motocicletas",},
];
const marcas = [
    {i: 1, nombre: "Renault/Ford"},
    {i: 2, nombre: "Chevrolet/Wolkswagen"}
];
const RenaultFord = [
    {i: 1, nombre: "Kwid 2021", precio: 11000000},
    {i: 2, nombre : "Renault Logan 2014", precio: 8000000},
    {i : 3, nombre: "Renault Logan 2015", precio: 8500000},
    {i: 4, nombre: "Renault megane 2011", precio: 6200000}
];
const ChevroletVolkswagen = [
    {i: 1, nombre: "Corsa 2008", precio: 4800000},
    {i: 2, nombre: "s10 2003", precio: 10000000},
    {i: 3, nombre: "Agile 2015", precio: 9500000},
    {i: 4, nombrde: "Cruze 2014", precio: 15000000}
];

//Método
function consultar() {
    iniciar = confirm("Bienvenido a FG-Automotores\nDesea consultar stock?\n");
    if (iniciar == true){
        consultarStock();
    } else {
        alert("Hasta luego, lo estaremos esperando");
    }
}

//Funciones flecha
const RecorrerVehiculos = categoria => {
    let itemsCategoria = categoria.map(
        (items) => items.i +" - "+items.nombre);
    return (itemsCategoria.join(`\n`))
};
const recorrerMarcas= categoria => {
    let vehículo = categoria.map(
        (items) => items.i +" --- "+items.nombre+" ===> $"+items.precio);
    return (vehículo.join(`\n`))
};

//funciones 
function consultarStock (){
    let categoria = prompt(`¿En qué tipo de vehículo está interesado?.\n${RecorrerVehiculos(vehiculos)}`);
    if (parseInt(categoria) === 1){
        let subCategoria = prompt(`Escoja una opción.\n\n${RecorrerVehiculos(marcas)}`);
        if (parseInt(subCategoria) === 1){
            let vehículo = prompt(`Ingresa el vehículo a solicitar.\n\n${recorrerMarcas(RenaultFord)}`);
            if (isNaN(parseInt(vehículo)) || (parseInt(vehículo) < 1 || parseInt(vehículo) > 4 )) {
                valorIncorrecto();
            } else {
                alert("Stock disponible")
                continuarConsultando();
            }
        }
        else if (parseInt(subCategoria) === 2){
            let vehículo = prompt(`Escoja una opción.\n\n${recorrerMarcas(ChevroletVolkswagen)}`);
            if (isNaN(parseInt(vehículo)) || (parseInt(vehículo) < 1 || parseInt(vehículo) > 4 )) {
                valorIncorrecto();
            } else {
                alert("Stock disponible")
                continuarConsultando();
            }
        }
        else {
            valorIncorrecto();
        }
    }
    else if (parseInt(categoria) === 2) {
        alert("Lo siento, de momento no tenemos stock");
        continuarConsultando();
    }
    else {
        valorIncorrecto();
    } 
}

function continuarConsultando (){
    let finalizar = prompt(`Que deseas hacer? \n\n 1 - Continuar consultando\n 2 - Finalizar`);
    if (parseInt(finalizar) === 1) {
        consultarStock();
    } else if (parseInt(finalizar) == 2) {
        consultar();
    } else {
        continuarConsultando();
    }
}

function valorIncorrecto() {
    let iniciar = confirm(`El valor ingresado no es una opcion valida, queres intentar nuevamente?`)
    if (iniciar == true){
        consultarStock();
    } else {
        alert("Hasta luego, estaremos esperando");
    }  
}

//Ejecutar
consultar();