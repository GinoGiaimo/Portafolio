if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('Se registro correctamente', registrado))
        .catch(error => console.log('SW no soportado'))
}