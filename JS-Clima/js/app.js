const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


buscarClima = (e) => {
    e.preventDefault();

    //Validacion de campos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad == '' || pais == ''){
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    //Consulta a la API
    consultarApi(ciudad, pais);
}


mostrarError = (msj) => {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-5', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');    
        
        alerta.innerHTML = `<strong class="font-bold">Error!</strong>
                            <span class="block">${msj}</span> `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove()
        }, 5000);
    } 
}

consultarApi = (ciudad, pais) => {
    const appId = 'c3407127c39032515a44568d92f30ff5';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinnerFunction(); 

    fetch(url).then(respuesta => {
        return respuesta.json();
    }).then(datos => {
        limpiarHTML();
        if(datos.cod == "404"){
            mostrarError('Ciudad no encontrada');
            return;
        } else {
            mostrarClima(datos);
        }
    })
}

mostrarClima = (datos) => {
    const {name, main:{temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombre = document.createElement('p');
    nombre.textContent = `Clima en ${name}`;
    nombre.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.classList.add('text-xl');
    tempMax.innerHTML = `<br>Max: ${max} &#8451`;

    const tempMin = document.createElement('p');
    tempMin.classList.add('text-xl');
    tempMin.innerHTML = `Min: ${min} &#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

kelvinACentigrados = (grados) => {
    return parseInt(grados - 273.15);
}


limpiarHTML = () => {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

spinnerFunction = () => {

    limpiarHTML();
    const divSpin = document.createElement('div');
    divSpin.classList.add('spinner');

    resultado.appendChild(divSpin);
}