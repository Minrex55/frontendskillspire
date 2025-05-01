document.addEventListener('DOMContentLoaded', function() {
    // Manejo de pestañas
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');
    const forgotPasswordContent = document.getElementById('forgot-password-content');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const backToLoginLink = document.getElementById('back-to-login');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
        forgotPasswordContent.classList.remove('active');
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerContent.classList.add('active');
        loginContent.classList.remove('active');
        forgotPasswordContent.classList.remove('active');
    });
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginContent.classList.remove('active');
        registerContent.classList.remove('active');
        forgotPasswordContent.classList.add('active');
        loginTab.classList.remove('active');
        registerTab.classList.remove('active');
    });
    
    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordContent.classList.remove('active');
        loginContent.classList.add('active');
        loginTab.classList.add('active');
    });
    
    // Mostrar/ocultar contraseñas
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Funciones de accesibilidad
    const contrastToggle = document.getElementById('contrast-toggle');
    const textSizeToggle = document.getElementById('text-size-toggle');
    const screenReaderHelp = document.getElementById('screen-reader-help');
    
    contrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
    
    textSizeToggle.addEventListener('click', function() {
        document.body.classList.toggle('large-text');
    });
    
    screenReaderHelp.addEventListener('click', function() {
        alert('Ayuda para lectores de pantalla: Esta página es totalmente accesible con lectores de pantalla. Use la tecla Tab para navegar entre los elementos y Enter para activarlos.');
    });
    
    // Validación de formularios
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');
    
    // Función para mostrar alertas
    function showAlert(type, message) {
        if (type === 'success') {
            successAlert.textContent = message;
            successAlert.style.display = 'block';
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 3000);
        } else {
            errorAlert.textContent = message;
            errorAlert.style.display = 'block';
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 3000);
        }
    }
    
    // Validación de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validación simple
        if (!email || !validateEmail(email)) {
            document.getElementById('login-email-error').style.display = 'block';
            return;
        } else {
            document.getElementById('login-email-error').style.display = 'none';
        }
        
        if (!password) {
            document.getElementById('login-password-error').style.display = 'block';
            return;
        } else {
            document.getElementById('login-password-error').style.display = 'none';
        }
        
        // Simulación de inicio de sesión exitoso
        showAlert('success', 'Inicio de sesión exitoso');
        
        // Para fines de demostración, simulamos redirección después de 2 segundos
        setTimeout(() => {
            showAlert('success', 'Redireccionando...');
        }, 2000);
    });
    
    // Validación de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        let isValid = true;
        
        // Validación de nombre
        if (!name) {
            document.getElementById('register-name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('register-name-error').style.display = 'none';
        }
        
        // Validación de email
        if (!email || !validateEmail(email)) {
            document.getElementById('register-email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('register-email-error').style.display = 'none';
        }
        
        // Validación de contraseña
        if (!password || password.length < 8) {
            document.getElementById('register-password-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('register-password-error').style.display = 'none';
        }
        
        // Validación de confirmación de contraseña
        if (password !== confirmPassword) {
            document.getElementById('register-confirm-password-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('register-confirm-password-error').style.display = 'none';
        }
        
        if (isValid) {
            // Simulación de registro exitoso
            showAlert('success', 'Registro exitoso. ¡Bienvenido!');
            
            // Para fines de demostración, simulamos redirección después de 2 segundos
            setTimeout(() => {
                showAlert('success', 'Redireccionando...');
            }, 2000);
        }
    });
    
    // Validación de recuperación de contraseña
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        
        if (!email || !validateEmail(email)) {
            document.getElementById('forgot-email-error').style.display = 'block';
            return;
        } else {
            document.getElementById('forgot-email-error').style.display = 'none';
        }
        
        // Simulación de envío exitoso
        showAlert('success', 'Se ha enviado un enlace de recuperación a tu correo electrónico');
        
        // Volver al formulario de inicio de sesión después de 3 segundos
        setTimeout(() => {
            loginTab.click();
        }, 3000);
    });
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
});