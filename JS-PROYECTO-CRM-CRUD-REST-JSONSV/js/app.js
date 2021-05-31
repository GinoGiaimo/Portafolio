import { obtenerClientes, eliminarCliente } from "./API.js";

(function(){
    const listado = document.querySelector('#listado-clientes');

    let mostrarClientes = async() => {
        const clientes = await obtenerClientes();
        console.log(clientes);

        clientes.forEach(cliente => {
            const {nombre, email, telefono, empresa, id} = cliente;

            const row = document.createElement('tr');

            row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

            listado.appendChild(row);
        });
    }

    let confirmarEliminar = (e) => {
        if(e.target.classList.contains('eliminar')) {
            const clienteid = parseInt(e.target.dataset.cliente);
            //console.log(Number.isInteger(clienteid));
            
            const confirmar = confirm('¿Deseas eliminar este registro?');

            if(confirmar){
                eliminarCliente(clienteid);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', mostrarClientes);
    document.addEventListener('click', confirmarEliminar);
})();