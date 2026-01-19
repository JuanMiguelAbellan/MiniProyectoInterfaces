document.addEventListener("DOMContentLoaded", listeners)

function listeners(){
    button = document.querySelector(".enviar")
    input = document.querySelector("#campo")
    
    button.addEventListener("click", function(e){
        let text = input.value
        crearMensaje("mensaje_usuario", text)
        crearMensaje("mensaje_ia_wait")
    })

    input.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            let text = input.value
            crearMensaje("mensaje_usuario", text)
            getRespuesta(text)
        }
    })
}

function crearMensaje(clase, contenido){
    console.log(contenido);
    
    if(clase === "mensaje_ia_wait"){
        mensaje = document.createElement("p")
        span = document.createElement("span")
        mensaje.setAttribute("class", clase)
        mensaje.append(document.createElement("span"))
        document.querySelector(".emoji").before(mensaje)
        input.value = ""
    }else{
        mensaje = document.createElement("p")
        mensaje.textContent = contenido
        mensaje.setAttribute("class", clase)
        document.querySelector(".emoji").before(mensaje)
        input.value = ""
    }
}

function getRespuesta(pregunta){
    const URL = "http://localhost:8080/api"
    const options = {
        "Method": "get",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXBpdG81LnBlcGUuQGdtYWlsLmNvbSIsImlhdCI6MTc2ODgyODY4NiwiZXhwIjoxNzY4ODMyMjg2fQ.4Oe6OQfonkzOx7xdd5vtlDCu108d3bfwcpVyJYWXA8A",
        "Content-Type": "application/json"
    }
    fetch(URL+"/tareas", options)
    .then(response => {
        if(response.ok){
            return response.json()
        }else{
            throw new Error(response.statusText)
        }
    })
    .then(data => crearMensaje("mensaje_ia" , data))
    .catch(error => console.log(error))
}