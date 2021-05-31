import {obtenerCliente, editarCliente} from './API.js';
import { mostrarAlerta, validarObj } from './funciones.js';

(function(){
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');




    document.addEventListener('DOMContentLoaded', async ()=>{
        const parametros = new URLSearchParams(window.location.search);

        const idCliente = parseInt(parametros.get('id'));

        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);

        const formulario = document.querySelector('#formulario');

        formulario.addEventListener('submit', validarCliente);
    });

    let mostrarCliente = (cliente) => {
        console.log(cliente);
        const {nombre, empresa, email, telefono, id} = cliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        idInput.value = id;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;

    }

    let validarCliente = (e) => {
        e.preventDefault();

        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: parseInt(idInput.value)
        }

        if(validarObj(cliente)){
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }else {
            editarCliente(cliente);
        }
    }


    
})();