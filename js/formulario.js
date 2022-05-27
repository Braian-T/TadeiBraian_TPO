const formulario = document.getElementById('formulario');
const input = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
    nombre: false,
    apellido: false,
    email: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            validarEmail2();
        break;
        case "email2":
            validarEmail2();
        break;
    };
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
        campos[campo] = false;
    }
}

const validarEmail2 = () => {
    const inputEmail1 = document.getElementById('email');
    const inputEmail2 = document.getElementById('email2');
    if(inputEmail1.value !== inputEmail2.value){
        document.getElementById(`grupo_email2`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_email2`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_email2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_email2 i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo_email2 .formulario_input-error`).classList.add('formulario_input-error-activo');
        campos['email'] = false;

    } else {
        document.getElementById(`grupo_email2`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_email2`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_email2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo_email2 i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo_email2 .formulario_input-error`).classList.remove('formulario_input-error-activo');
        campos['email'] = true;
    }
}

input.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos');
    if(campos.nombre && campos.apellido && campos.email && terminos.checked){
        formulario.reset();
        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
        }, 30000);
        document.querySelectorAll('formulario_grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario_grupo-correcto');
        });
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
    }
});