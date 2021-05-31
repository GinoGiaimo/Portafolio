//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


//Funciones

const limpiarHTML = () => {
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

const sincronizarStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

const eliminarCurso = (e) => {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

const agregarCurso = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const leerDatosCurso = curso => {
    const infoCurso = {
        // imagen: curso.querySelector('img').getAttribute('src')
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1   
    };

    //Existe el curso ?
    const existe = articulosCarrito.some(curse => curse.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map(cursito => {
            if(cursito.id === infoCurso.id){
                cursito.cantidad++;
                return cursito;
            } else {
                return cursito;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
        // articulosCarrito.push(infoCurso)
    }

    console.log(articulosCarrito);

    carritoHTML();
}

const carritoHTML = () => {
    
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100px">
            </td>

            <td>
                ${curso.titulo}
            </td>

            <td>
                ${curso.precio}
            </td>

            <td>
                ${curso.cantidad}
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>`;
        
            contenedorCarrito.appendChild(row);
    })

    sincronizarStorage();
}



//Eventos
 
listaCursos.addEventListener('click', agregarCurso);
carrito.addEventListener('click', eliminarCurso);
btnVaciarCarrito.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
})
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
})