//Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')

//Variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//Listeners
eventListeners()

function eventListeners() {

    document.addEventListener('DOMContentLoaded', iniciarApp())

    //Campos formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)

    //Enviar email
    formulario.addEventListener('submit', enviarEmail)




}




//Funciones

function iniciarApp() {
    //desactivamos el email
    btnEnviar.disable = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


function validarFormulario(e) {

    if (e.target.value.length > 0) {

        //Elimina los errores
        const error = document.querySelector('p.error')
        error ? error.remove() : null


        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-green-500')
        
    } else {


        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')

    }


    //Validamos el email

    if (e.target.type === 'email') {

        
        if (er.test(e.target.value)) {

            //Elimina los errores
            console.log('eq')
            const error = document.querySelector('p.error')
            error ? error.remove() : null

            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-green-500')
            

        } else {
            console.log('eqsss')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('El mail no es válido')

        }

    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        //desactivamos el email
        btnEnviar.disable = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } 
}


//Función probar error
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'error', 'text-center')

    const errores = document.querySelectorAll('.error')

    errores.length === 0 ? formulario.appendChild(mensajeError) :  null   
}

//Enviar
function enviarEmail(e) {
    
    e.preventDefault()
    
    //Mostrar el espiner

    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

 
    setTimeout(() => {
        spinner.style.display = 'none'
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envió correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() => {parrafo.remove()
             resetearFormulario()}, 2000)
      
        
    }, 1000)


}


//Resestar formulario
function resetearFormulario(e) {
    formulario.reset()
    iniciarApp()
    email.classList.remove('border-green-500')
    asunto.classList.remove('border-green-500')
    mensaje.classList.remove( 'border-green-500')
    

}