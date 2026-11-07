document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE NAVEGACIÓN Y SCROLL SPY ---
    const secciones = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para actualizar la línea dorada al hacer scroll
    window.addEventListener('scroll', () => {
        let actual = '';

        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop;
            // Ajustamos el offset para que cambie un poco antes de llegar a la sección
            if (scrollY >= seccionTop - 150) {
                actual = seccion.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('activo');
            if (link.getAttribute('href').includes(actual)) {
                link.classList.add('activo');
            }
        });
    });

    // --- LÓGICA DE FILTROS DE EXPERIENCIA ---
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetas = document.querySelectorAll('.tarjeta-exp');

    if(botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesFiltro.forEach(btn => btn.classList.remove('activo'));
                boton.classList.add('activo');

                const filtroSeleccionado = boton.getAttribute('data-filtro');

                tarjetas.forEach(tarjeta => {
                    const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

                    if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) {
                        tarjeta.style.display = 'flex';
                        setTimeout(() => {
                            tarjeta.style.opacity = '1';
                            tarjeta.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        tarjeta.style.opacity = '0';
                        tarjeta.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            tarjeta.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- LÓGICA DEL MODAL DE CERTIFICACIONES ---
    const btnAbrirModal = document.getElementById('abrir-certificaciones');
    const modalCertificaciones = document.getElementById('modal-certificaciones');
    const btnCerrarModal = document.getElementById('cerrar-modal');

    // Función para abrir el modal
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', () => {
            modalCertificaciones.style.display = 'flex';
            // Prevenir scroll en el body cuando el modal está abierto
            document.body.style.overflow = 'hidden'; 
        });
    }

    // Función para cerrar el modal desde la 'X'
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modalCertificaciones.style.display = 'none';
            // Restaurar scroll
            document.body.style.overflow = 'auto'; 
        });
    }

    // Función para cerrar el modal haciendo clic fuera de la caja blanca
    window.addEventListener('click', (event) => {
        if (event.target === modalCertificaciones) {
            modalCertificaciones.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- LÓGICA DE COPIAR CORREO ---
    const btnCopiar = document.getElementById('btn-copiar-correo');
    const textoCorreo = document.getElementById('texto-correo').innerText;
    const toastMensaje = document.getElementById('mensaje-copiado');

    if (btnCopiar) {
        btnCopiar.addEventListener('click', async () => {
            try {
                // Escribir en el portapapeles del sistema
                await navigator.clipboard.writeText(textoCorreo);
                
                // Mostrar el mensaje de éxito
                toastMensaje.classList.add('mostrar');
                
                // Ocultar el mensaje después de 2.5 segundos
                setTimeout(() => {
                    toastMensaje.classList.remove('mostrar');
                }, 2500);
            } catch (err) {
                console.error('No se pudo copiar el correo: ', err);
            }
        });
    }
});