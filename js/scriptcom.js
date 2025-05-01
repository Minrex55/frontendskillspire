const contactos = document.querySelectorAll('.peopleconteiner');
                const contactosData = {};
            
                contactos.forEach((contacto, index) => {
                    const nombreElem = contacto.querySelector('.namep h1');
                    const nombre = nombreElem.textContent;
            
                    // Contenedor de botones
                    const iconContainer = document.createElement("div");
                    iconContainer.innerHTML = `
                        <button onclick="togglePin(${index})" class="fijado" id="pin-${index}" title="Fijar">
                            <i data-feather="bookmark"></i>
                        </button>
                        <button onclick="toggleFav(${index})" class="favorito" id="fav-${index}" title="Favorito">
                            <i data-feather="star"></i>
                        </button>
                    `;
                    iconContainer.style.float = "right";
                    iconContainer.style.marginTop = "-25px";
            
                    nombreElem.parentNode.appendChild(iconContainer);
            
                    contactosData[index] = {
                        nombre: nombre,
                        fijado: false,
                        favorito: false,
                        elemento: contacto
                    };
                });
            
                function togglePin(id) {
    contactosData[id].fijado = !contactosData[id].fijado;
    const btn = document.getElementById(`pin-${id}`);
    
    // Agrega o quita clase de color
    if (contactosData[id].fijado) {
        btn.classList.add("activo-pin");
    } else {
        btn.classList.remove("activo-pin");
    }
}

function toggleFav(id) {
    contactosData[id].favorito = !contactosData[id].favorito;
    const btn = document.getElementById(`fav-${id}`);
    
    // Agrega o quita clase de color
    if (contactosData[id].favorito) {
        btn.classList.add("activo-fav");
    } else {
        btn.classList.remove("activo-fav");
    }
}

            
                function mostrarTodos() {
                    for (const id in contactosData) {
                        contactosData[id].elemento.style.display = "flex";
                    }
                }
            
                function mostrarFavoritos() {
                    for (const id in contactosData) {
                        contactosData[id].elemento.style.display = contactosData[id].favorito ? "flex" : "none";
                    }
                }
            
                function mostrarFijados() {
                    for (const id in contactosData) {
                        contactosData[id].elemento.style.display = contactosData[id].fijado ? "flex" : "none";
                    }
                }
            
                function filtrarContactos() {
                    const input = document.getElementById("searchInput").value.toLowerCase();
                    for (const id in contactosData) {
                        const nombre = contactosData[id].nombre.toLowerCase();
                        contactosData[id].elemento.style.display = nombre.includes(input) ? "flex" : "none";
                    }
                }
            
                function sincronizar() {
                    location.reload();
                    alert("Sincronización completa ✅");
                }
                
            
                // Reemplazar íconos al cargar por primera vez
               // Datos de ejemplo para los chats
const chatData = {
    "Profesor Antonio 6°3": [
        { sender: "contact", text: "Hola, recuerda que mañana hay que entregar el proyecto de ciencias", time: "10:30" },
        { sender: "user", text: "Gracias por recordármelo profesor, ya lo estoy terminando", time: "10:45" },
        { sender: "contact", text: "Recuerda enviar la tarea por el sistema antes de las 23:59", time: "11:00" }
    ],
    "Directora Ana": [
        { sender: "contact", text: "Se les recuerda a todos los padres que mañana hay reunión a las 18:00", time: "14:20" },
        { sender: "contact", text: "La reunión será en el auditorio principal", time: "14:21" },
        { sender: "user", text: "Muchas gracias directora, ahí estaremos", time: "15:30" }
    ],
    "Profesora María 6°3": [
        { sender: "contact", text: "Para mañana deben traer los materiales para el taller de arte", time: "09:15" },
        { sender: "user", text: "¿Qué materiales necesitamos profesora?", time: "09:30" },
        { sender: "contact", text: "Cartulinas, tijeras, pegamento y colores", time: "09:45" }
    ],
    "Profesor Hector 6°3": [
        { sender: "contact", text: "El examen de matemáticas será el viernes", time: "13:10" },
        { sender: "user", text: "¿Qué temas entran en el examen?", time: "13:30" },
        { sender: "contact", text: "Álgebra, geometría y estadística básica", time: "13:45" }
    ],
    "Director Perez": [
        { sender: "contact", text: "Se suspenden las clases mañana por mantenimiento", time: "16:00" },
        { sender: "user", text: "Entendido, gracias por avisar", time: "16:15" }
    ],
    "Compañera Valery": [
        { sender: "contact", text: "¿Entendiste la tarea de física?", time: "18:20" },
        { sender: "user", text: "Más o menos, ¿te puedo llamar para que me expliques?", time: "18:25" },
        { sender: "contact", text: "Claro, dame 10 minutos", time: "18:26" }
    ],
    "Compañero Jacob": [
        { sender: "contact", text: "¿Vienes al partido de fútbol este sábado?", time: "20:10" },
        { sender: "user", text: "Sí, ¿a qué hora es?", time: "20:15" },
        { sender: "contact", text: "A las 10:00 en la cancha principal", time: "20:20" }
    ]
};

// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    const contactElements = document.querySelectorAll('.peopleconteiner');
    const chatMessages = document.getElementById('chat-messages');
    const currentContactName = document.getElementById('current-contact-name');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    // Función para cargar el chat de un contacto
    function loadChat(contactName) {
        // Actualizar nombre del contacto actual
        currentContactName.textContent = contactName;
        
        // Limpiar mensajes actuales
        chatMessages.innerHTML = '';
        
        // Si existe chat para este contacto
        if (chatData[contactName]) {
            // Cargar mensajes
            chatData[contactName].forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                
                if (message.sender === 'user') {
                    messageElement.classList.add('message-sent');
                } else {
                    messageElement.classList.add('message-received');
                }
                
                messageElement.innerHTML = `
                    ${message.text}
                    <div class="message-time">${message.time}</div>
                `;
                
                chatMessages.appendChild(messageElement);
            });
        } else {
            // Si no hay mensajes para este contacto
            chatMessages.innerHTML = '<div class="message-info">No hay mensajes con este contacto</div>';
        }
        
        // Scroll hasta el final
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Agregar eventos click a los contactos
    contactElements.forEach(contact => {
        contact.addEventListener('click', function() {
            // Quitar clase active de todos los contactos
            contactElements.forEach(c => c.classList.remove('active'));
            
            // Añadir clase active al contacto seleccionado
            this.classList.add('active');
            
            // Obtener nombre del contacto
            const contactName = this.querySelector('.namep h1').textContent;
            
            // Cargar chat
            loadChat(contactName);
        });
    });
    
    // Función para enviar mensaje
    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;
        
        const contactName = currentContactName.textContent;
        
        // Verificar que hay un contacto seleccionado
        if (contactName === 'Selecciona un contacto') {
            alert('Por favor, selecciona un contacto primero');
            return;
        }
        
        // Crear nuevo mensaje
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const newMessage = {
            sender: 'user',
            text: text,
            time: time
        };
        
        // Añadir mensaje a los datos
        if (!chatData[contactName]) {
            chatData[contactName] = [];
        }
        chatData[contactName].push(newMessage);
        
        // Añadir mensaje al chat
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'message-sent');
        messageElement.innerHTML = `
            ${text}
            <div class="message-time">${time}</div>
        `;
        chatMessages.appendChild(messageElement);
        
        // Limpiar input
        messageInput.value = '';
        
        // Scroll hasta el final
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simular respuesta después de 1-3 segundos
        setTimeout(() => {
            const responses = [
                "Entendido, gracias por avisar.",
                "Perfecto, hablamos luego.",
                "Ok, nos vemos mañana.",
                "Recibido, gracias por la información."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseTime = `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`;
            
            const responseMessage = {
                sender: 'contact',
                text: randomResponse,
                time: responseTime
            };
            
            chatData[contactName].push(responseMessage);
            
            const responseElement = document.createElement('div');
            responseElement.classList.add('message', 'message-received');
            responseElement.innerHTML = `
                ${randomResponse}
                <div class="message-time">${responseTime}</div>
            `;
            chatMessages.appendChild(responseElement);
            
            // Scroll hasta el final
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, Math.random() * 2000 + 1000);
    }
    
    // Evento para enviar mensaje
    sendButton.addEventListener('click', sendMessage);
    
    // Enviar mensaje al presionar Enter
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Actualizar íconos Feather después de cargar el DOM
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
  
// JavaScript para la funcionalidad del panel de configuraciones
document.addEventListener('DOMContentLoaded', function() {
    // Tema oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                console.log('Cambiando a tema claro');
                // Aquí iría la lógica para cambiar a tema claro
                document.body.classList.add('light-theme');
            } else {
                console.log('Cambiando a tema oscuro');
                // Aquí iría la lógica para cambiar a tema oscuro
                document.body.classList.remove('light-theme');
            }
        });
    }

    // Activar/desactivar notificaciones
    const notificationToggle = document.getElementById('notification-toggle');
    if (notificationToggle) {
        notificationToggle.addEventListener('change', function() {
            if (this.checked) {
                console.log('Notificaciones activadas');
                // Aquí iría la lógica para activar notificaciones
            } else {
                console.log('Notificaciones desactivadas');
                // Aquí iría la lógica para desactivar notificaciones
            }
        });
    }

    // Botones de opciones
    const settingButtons = document.querySelectorAll('.setting-button');
    settingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            console.log(`Opción seleccionada: ${buttonText}`);
            
            // Simulación de acciones para cada botón
            switch(buttonText) {
                case 'Nuevo chat':
                    alert('Funcionalidad de nuevo chat (simulada)');
                    break;
                case 'Nuevo grupo':
                    alert('Funcionalidad de nuevo grupo (simulada)');
                    break;
                case 'Cerrar sesión':
                    if(confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                        console.log('Cerrando sesión...');
                        // Aquí iría la lógica para cerrar sesión
                    }
                    break;
                default:
                    alert(`Funcionalidad "${buttonText}" (simulada)`);
            }
        });
    });

    // Actualizar íconos Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Funcionalidad para categorías de chat
document.addEventListener('DOMContentLoaded', function() {
    // Asignar categorías a los contactos existentes
    const contactCategories = {
        "Profesor Antonio 6°3": ["clase", "6-3"],
        "Directora Ana": ["nivel", "directivos"],
        "Profesora María 6°3": ["clase", "6-3"],
        "Profesor Hector 6°3": ["clase", "6-3"],
        "Director Perez": ["nivel", "directivos"],
        "Compañera Valery": ["clase", "6-3"],
        "Compañero Jacob": ["clase", "6-3"]
    };
    
    // Asignar data-attributes a los contactos
    contactos.forEach(contacto => {
        const nombre = contacto.querySelector('.namep h1').textContent;
        if (contactCategories[nombre]) {
            contacto.dataset.category = contactCategories[nombre][0];
            contacto.dataset.subcategory = contactCategories[nombre][1];
        }
    });
    
    // Funcionalidad para los tabs de categorías
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Quitar clase active de todos los tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Añadir clase active al tab seleccionado
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filtrar contactos por categoría
            contactos.forEach(contacto => {
                if (category === 'all' || contacto.dataset.category === category) {
                    contacto.style.display = 'flex';
                } else {
                    contacto.style.display = 'none';
                }
            });
        });
    });
});

