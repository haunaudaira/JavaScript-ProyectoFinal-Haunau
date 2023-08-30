
// SessionStorage Nombre de Usuario
function btningresar(){
    const usuarioActual = document.getElementById('nombreUsuario').value
    sessionStorage.setItem('usuarioActual', usuarioActual);
    sessionStorage.innerHTML = usuarioActual

    if (usuarioActual == ""){
        Swal.fire('Por favor, para continuar ingrese su nombre')
    }else{
        setTimeout( function() { window.location.href = "pages/admn.html"; }, 500 );
    }
}

