import { mostrarAlerta, validarObj } from './funciones.js';
import { nuevoCliente } from './API.js';

(function() {
    const formulario = document.querySelector('#formulario');

    let validarCliente = (e) => {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        if(validarObj(cliente)){
            mostrarAlerta('Todos los campos son obligatorios');
            return;
         } else {
             nuevoCliente(cliente);
         }

        // if(nombre == '' || email == '' || telefono == '' || empresa ==''){
        //     mostrarAlerta('Todos los campos son obligatorios');
        // }else {

        // }

    }

    formulario.addEventListener('submit', validarCliente);
})();