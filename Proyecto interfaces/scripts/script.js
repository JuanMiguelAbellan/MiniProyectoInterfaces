document.addEventListener("DOMContentLoaded", listeners)

function listeners(){
    let button = document.querySelector(".enviar")
    let input = document.querySelector("#campo")
    
    button.addEventListener("click", function(e){
        let text = input.value
        crearMensaje("mensaje_usuario", text)
        crearMensaje("mensaje_ia_wait")
        setTimeout(()=>{getRespuesta(text)}, 5000)
    })

    input.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            let text = input.value
            crearMensaje("mensaje_usuario", text)
            crearMensaje("mensaje_ia_wait")
            setTimeout(()=>{getRespuesta(text)}, 5000)
        }
    })

    let btnModo = document.querySelector("#modo");
    let body = document.body;
    let nav = document.querySelector("nav")
    let chats= document.querySelector(".chats")
    let conversacion = document.querySelector(".conversacion")

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.setAttribute("class", "oscuro")
    }

    btnModo.addEventListener('click', () => {
        if (localStorage.getItem('dark-mode') == 'enable') {
            body.setAttribute("class", "oscuro")
            nav.setAttribute("class", "oscuro")
            chats.setAttribute("class", "chats-oscuro")
            conversacion.setAttribute("class", "conversacion-oscuro")
            localStorage.setItem('dark-mode', 'disabled')
        } else {
            localStorage.setItem('dark-mode', 'enable');
            body.setAttribute("class", "claro")
            nav.setAttribute("class", "claro")
            chats.setAttribute("class", "chats")
            conversacion.setAttribute("class", "conversacion")
        }
        });
}

function cmabiarModo(){

}

function crearMensaje(clase, contenido){
    let input = document.querySelector("#campo")
    
    if(clase === "mensaje_ia_wait"){
        let mensaje = document.createElement("p")
        mensaje.setAttribute("class", clase)
        mensaje.append(document.createElement("span"))
        document.querySelector(".mensajes").appendChild(mensaje)
        input.value = ""
    }else if(clase === "mensaje_ia"){
        let mensaje = document.createElement("p")
        document.querySelector(".mensaje_ia_wait").remove()
        mensaje.textContent = contenido
        mensaje.setAttribute("class", clase)
        document.querySelector(".mensajes").appendChild(mensaje)
        input.value = ""
    }else{
        let mensaje = document.createElement("p")
        mensaje.textContent = contenido
        mensaje.setAttribute("class", clase)
        document.querySelector(".mensajes").appendChild(mensaje)
        input.value = ""
    }
}

function getRespuesta(pregunta){
    return crearMensaje("mensaje_ia", "Hola bienvenido a IaDocs")
    // const URL = "http://localhost:4000/api/ai/generate"
    // const myHeaders = new Headers();
    // const json = {
    //     "prompt": pregunta
    // };
    // myHeaders.append(
    //     "Content-Type", "application/json"
    // )
    // const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     redirect: 'follow',
    //     body: JSON.stringify(json)
    // };
    // fetch(URL, requestOptions)
    // .then(response => {
    //     if(response.ok){
    //         return response.json()
    //     }else{
    //         throw new Error(response.statusText)
    //     }
    // })
    // .then(data => crearMensaje("mensaje_ia", data.response))
    // .catch(error => console.log(error))
}
