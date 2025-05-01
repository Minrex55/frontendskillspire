// Toggle notifications panel
const notificationsToggle = document.getElementById('notifications-toggle');
const notificationsPanel = document.getElementById('notifications-panel');

notificationsToggle.addEventListener('click', function() {
    notificationsPanel.classList.toggle('active');
});

// Close notifications panel when clicking outside
document.addEventListener('click', function(event) {
    if (!notificationsToggle.contains(event.target)) {
        notificationsPanel.classList.remove('active');
    }
});

// Tab switching
const tabLinks = document.querySelectorAll('.sidebar .nav-item');
const contentSections = document.querySelectorAll('.content-section');

tabLinks.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs and content sections
        tabLinks.forEach(t => t.classList.remove('active'));
        contentSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding content section
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-section`).classList.add('active');
    });
});

// Modal handling
const addEventBtn = document.getElementById('add-event-btn');
const addEventModal = document.getElementById('add-event-modal');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const saveEventBtn = document.getElementById('save-event-btn');

addEventBtn.addEventListener('click', function() {
    addEventModal.classList.add('active');
    
    // Pre-fill with the currently selected date
    const activeDay = document.querySelector('.calendar-day.active');
    if (activeDay) {
        const dayNumber = activeDay.querySelector('.day-number').textContent;
        // Set the date value to the current month and year with the selected day
        const today = new Date();
        const dateValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
        document.getElementById('event-date').value = dateValue;
    }
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        addEventModal.classList.remove('active');
    });
});

// Close modal when clicking outside
addEventModal.addEventListener('click', function(event) {
    if (event.target === addEventModal) {
        addEventModal.classList.remove('active');
    }
});

// Store events data - Using day number as key to simplify
const events = {};

// Save event
saveEventBtn.addEventListener('click', function() {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;
    
    if (title && date) {
        // Extract day directly from the date input
        // Format is YYYY-MM-DD
        const dateParts = date.split('-');
        const day = parseInt(dateParts[2]); // This gives us the day part (DD)
        
        // Add event to the array
        if (!events[day]) {
            events[day] = [];
        }
        
        events[day].push({
            title: title,
            time: time,
            description: description
        });
        
        // Add the event indicator to the calendar day
        const calendarDays = document.querySelectorAll('.calendar-day');
        calendarDays.forEach(calendarDay => {
            const dayNumber = parseInt(calendarDay.querySelector('.day-number').textContent);
            if (dayNumber === day) {
                // Check if indicator already exists
                if (!calendarDay.querySelector('.events-indicator')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'events-indicator';
                    calendarDay.appendChild(indicator);
                }
            }
        });
        
        // If the day is currently selected, update the events list
        const activeDay = document.querySelector('.calendar-day.active');
        if (activeDay && parseInt(activeDay.querySelector('.day-number').textContent) === day) {
            updateEventsList(day);
        }
        
        alert('Evento guardado correctamente');
        addEventModal.classList.remove('active');
        
        // Reset form
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-time').value = '';
        document.getElementById('event-description').value = '';
    } else {
        alert('Por favor completa los campos requeridos');
    }
});

// Calendar day selection
const calendarDays = document.querySelectorAll('.calendar-day');

calendarDays.forEach(day => {
    day.addEventListener('click', function() {
        // Remove active class from all days
        calendarDays.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked day
        this.classList.add('active');
        
        // Get the selected day number
        const dayNumber = parseInt(this.querySelector('.day-number').textContent);
        
        // Update the event list for the selected day
        updateEventsList(dayNumber);
    });
});

// Function to update the events list for a specific day
function updateEventsList(dayNumber) {
    const eventDetailsContainer = document.querySelector('.event-details');
    eventDetailsContainer.innerHTML = '';
    
    // Add header
    const header = document.createElement('h3');
    header.textContent = `Eventos para ${dayNumber} de Abril`;
    eventDetailsContainer.appendChild(header);
    
    // Check if there are events for this day
    if (events[dayNumber] && events[dayNumber].length > 0) {
        // Add each event to the list
        events[dayNumber].forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.textContent = event.title;
            
            const eventTime = document.createElement('div');
            eventTime.className = 'event-time';
            eventTime.textContent = event.time || 'Todo el día';
            
            // If there's a description, add it
            if (event.description) {
                const eventDesc = document.createElement('div');
                eventDesc.className = 'event-description';
                eventDesc.style.fontSize = '0.85rem';
                eventDesc.style.marginTop = '0.25rem';
                eventDesc.textContent = event.description;
                eventCard.appendChild(eventTitle);
                eventCard.appendChild(eventTime);
                eventCard.appendChild(eventDesc);
            } else {
                eventCard.appendChild(eventTitle);
                eventCard.appendChild(eventTime);
            }
            
            eventDetailsContainer.appendChild(eventCard);
        });
    } else {
        // Default events for day 15 (as in the original HTML)
        if (dayNumber === 15) {
            // Add the default events
            const defaultEvents = [
                { title: 'Entrega de proyecto final', time: '9:00 - 10:00' },
                { title: 'Reunión de grupo', time: '14:30 - 15:30' }
            ];
            
            defaultEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                
                const eventTitle = document.createElement('div');
                eventTitle.className = 'event-title';
                eventTitle.textContent = event.title;
                
                const eventTime = document.createElement('div');
                eventTime.className = 'event-time';
                eventTime.textContent = event.time;
                
                eventCard.appendChild(eventTitle);
                eventCard.appendChild(eventTime);
                eventDetailsContainer.appendChild(eventCard);
            });
        } else {
            // Add a message when there are no events
            const noEvents = document.createElement('div');
            noEvents.className = 'no-events';
            noEvents.textContent = 'No hay eventos para este día';
            eventDetailsContainer.appendChild(noEvents);
        }
    }
}

// Initialize the events display for the current active day
document.addEventListener('DOMContentLoaded', function() {
    const activeDay = document.querySelector('.calendar-day.active');
    if (activeDay) {
        const dayNumber = parseInt(activeDay.querySelector('.day-number').textContent);
        updateEventsList(dayNumber);
    }
});

// Variables para manejar la sincronización
let connectedServices = {
    google: false,
    outlook: false,
    apple: false
};

let syncHistory = [];

// Botones de sincronización
const syncButtons = document.querySelectorAll('.sync-btn');
const syncNowButton = document.getElementById('sync-now');
const exportCalendarButton = document.getElementById('export-calendar');

// Modal de autenticación
const authModal = document.getElementById('auth-modal');
const serviceNameSpan = document.getElementById('service-name');
const authorizeBtn = document.getElementById('authorize-btn');
let currentService = '';

// Manejar clicks en botones de sincronización
syncButtons.forEach(button => {
    button.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        currentService = service;
        
        // Actualizar el texto del modal
        const serviceName = getServiceName(service);
        serviceNameSpan.textContent = serviceName;
        
        // Si ya está conectado, desconectar
        if (connectedServices[service]) {
            disconnectService(service);
        } else {
            // Mostrar modal de autenticación
            authModal.classList.add('active');
        }
    });
});

// Cerrar el modal de autenticación
document.querySelectorAll('#auth-modal .close-modal, #auth-modal .close-modal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        authModal.classList.remove('active');
    });
});

// Cerrar modal cuando se hace clic fuera
authModal.addEventListener('click', function(event) {
    if (event.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Manejar autorización de servicios
authorizeBtn.addEventListener('click', function() {
    const calendarName = document.getElementById('calendar-name').value;
    
    if (!calendarName) {
        alert('Por favor, proporciona un nombre para el calendario');
        return;
    }
    
    // Simular proceso de autenticación
    simulateAuthentication(currentService, calendarName);
    
    // Cerrar modal
    authModal.classList.remove('active');
});

// Sincronizar ahora
syncNowButton.addEventListener('click', function() {
    // Verificar si hay servicios conectados
    const hasConnectedServices = Object.values(connectedServices).some(connected => connected);
    
    if (!hasConnectedServices) {
        alert('No hay servicios de calendario conectados. Por favor, conecta al menos un servicio.');
        return;
    }
    
    // Simular sincronización
    simulateSyncProcess();
});

// Exportar calendario
exportCalendarButton.addEventListener('click', function() {
    // Simular exportación de archivo ICS
    simulateExportCalendar();
});

// Funciones de simulación
function simulateAuthentication(service, calendarName) {
    // Mostrar cargando
    const button = document.querySelector(`.sync-btn[data-service="${service}"]`);
    const originalText = button.textContent;
    button.textContent = 'Conectando...';
    button.disabled = true;
    
    // Simular retraso de red
    setTimeout(() => {
        // Marcar servicio como conectado
        connectedServices[service] = true;
        
        // Actualizar UI
        const serviceCard = button.closest('.service-card');
        serviceCard.classList.add('connected');
        
        const statusElement = serviceCard.querySelector('.service-status');
        statusElement.textContent = `Conectado (${calendarName})`;
        
        button.textContent = 'Desconectar';
        button.disabled = false;
        
        // Añadir a historial
        addToSyncHistory(`Conectado con ${getServiceName(service)} como "${calendarName}"`, 'success');
        
        // Hacer una sincronización inicial automática
        setTimeout(() => {
            simulateSyncProcess(service);
        }, 1000);
    }, 2000);
}

function disconnectService(service) {
    // Mostrar confirmación
    if (!confirm(`¿Estás seguro de que deseas desconectar ${getServiceName(service)}?`)) {
        return;
    }
    
    // Mostrar cargando
    const button = document.querySelector(`.sync-btn[data-service="${service}"]`);
    button.textContent = 'Desconectando...';
    button.disabled = true;
    
    // Simular retraso
    setTimeout(() => {
        // Marcar servicio como desconectado
        connectedServices[service] = false;
        
        // Actualizar UI
        const serviceCard = button.closest('.service-card');
        serviceCard.classList.remove('connected');
        
        const statusElement = serviceCard.querySelector('.service-status');
        statusElement.textContent = 'No conectado';
        
        button.textContent = 'Conectar';
        button.disabled = false;
        
        // Añadir a historial
        addToSyncHistory(`Desconectado de ${getServiceName(service)}`, 'info');
    }, 1500);
}

function simulateSyncProcess(specificService = null) {
    // Cambiar texto del botón
    syncNowButton.textContent = 'Sincronizando...';
    syncNowButton.disabled = true;
    
    // Determinar servicios a sincronizar
    const servicesToSync = specificService ? 
        [specificService] : 
        Object.keys(connectedServices).filter(service => connectedServices[service]);
    
    // Simular sincronización
    let sucessCount = 0;
    let totalToSync = servicesToSync.length;
    let syncedCount = 0;
    
    // Función para finalizar la sincronización
    const finishSync = () => {
        syncNowButton.textContent = 'Sincronizar ahora';
        syncNowButton.disabled = false;
        
        if (sucessCount === totalToSync) {
            addToSyncHistory(`Sincronización completada exitosamente con ${sucessCount} servicio(s)`, 'success');
        } else {
            addToSyncHistory(`Sincronización parcial: ${sucessCount} de ${totalToSync} servicio(s) sincronizados`, 'error');
        }
    };
    
    // Simular sincronización con cada servicio
    if (servicesToSync.length === 0) {
        finishSync();
        return;
    }
    
    servicesToSync.forEach(service => {
        // Simular tiempo variable y éxito/error aleatorio
        setTimeout(() => {
            // 90% probabilidad de éxito
            const success = Math.random() < 0.9;
            
            if (success) {
                sucessCount++;
                addToSyncHistory(`Sincronizado con ${getServiceName(service)} correctamente`, 'success');
            } else {
                addToSyncHistory(`Error al sincronizar con ${getServiceName(service)}`, 'error');
            }
            
            syncedCount++;
            if (syncedCount === totalToSync) {
                finishSync();
            }
        }, 1000 + Math.random() * 2000); // Entre 1-3 segundos
    });
}

function simulateExportCalendar() {
    // Simular descarga de archivo ICS
    alert('Se ha generado tu archivo de calendario.\nNormalmente aquí comenzaría la descarga de un archivo .ics que podrías importar en cualquier aplicación de calendario.');
    
    // Añadir a historial
    addToSyncHistory('Calendario exportado como archivo .ics', 'info');
}

// Función para añadir entradas al historial de sincronización
function addToSyncHistory(message, type = 'info') {
    // Eliminar mensaje de vacío si existe
    const emptyMessage = document.querySelector('.sync-log-empty');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Crear nueva entrada
    const logEntry = document.createElement('div');
    logEntry.className = `sync-log-entry ${type}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    logEntry.innerHTML = `
        <div class="sync-log-message">${message}</div>
        <div class="sync-log-date">${dateString} ${timeString}</div>
    `;
    
    // Añadir al log
    const syncLog = document.querySelector('.sync-log');
    syncLog.insertBefore(logEntry, syncLog.firstChild);
    
    // Limitar a 10 entradas
    const entries = document.querySelectorAll('.sync-log-entry');
    if (entries.length > 10) {
        entries[entries.length - 1].remove();
    }
    
    // Guardar en el historial
    syncHistory.unshift({
        message,
        type,
        timestamp: now.getTime()
    });
    
    // Limitar historial a 50 entradas
    if (syncHistory.length > 50) {
        syncHistory.pop();
    }
}

// Función auxiliar para obtener el nombre completo del servicio
function getServiceName(serviceId) {
    const names = {
        'google': 'Google Calendar',
        'outlook': 'Outlook Calendar',
        'apple': 'Apple Calendar'
    };
    
    return names[serviceId] || serviceId;
}

// Inicializar la sección cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Establecer texto de los botones de sincronización
    syncButtons.forEach(button => {
        const service = button.getAttribute('data-service');
        button.textContent = connectedServices[service] ? 'Desconectar' : 'Conectar';
    });
    
    // Añadir una entrada inicial al historial
    setTimeout(() => {
        addToSyncHistory('Sistema de sincronización inicializado', 'info');
    }, 500);
});

// Variables para edición
let currentEditingDay = null;
let currentEditingIndex = null;

function updateEventsList(dayNumber) {
    const eventDetailsContainer = document.querySelector('.event-details');
    eventDetailsContainer.innerHTML = '';

    const header = document.createElement('h3');
    header.textContent = `Eventos para ${dayNumber} de Abril`;
    eventDetailsContainer.appendChild(header);

    if (events[dayNumber] && events[dayNumber].length > 0) {
        events[dayNumber].forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            const eventTitle = document.createElement('div');
            eventTitle.className = 'event-title';
            eventTitle.textContent = event.title;

            const eventTime = document.createElement('div');
            eventTime.className = 'event-time';
            eventTime.textContent = event.time || 'Todo el día';

            if (event.description) {
                const eventDesc = document.createElement('div');
                eventDesc.className = 'event-description';
                eventDesc.style.fontSize = '0.85rem';
                eventDesc.style.marginTop = '0.25rem';
                eventDesc.textContent = event.description;
                eventCard.appendChild(eventDesc);
            }

            // Botón Editar
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.className = 'edit-btn';
            editBtn.style.marginRight = '5px';
            editBtn.addEventListener('click', () => {
                document.getElementById('event-title').value = event.title;
                document.getElementById('event-date').value = `2024-04-${String(dayNumber).padStart(2, '0')}`;
                document.getElementById('event-time').value = event.time;
                document.getElementById('event-description').value = event.description;

                currentEditingDay = dayNumber;
                currentEditingIndex = index;

                addEventModal.classList.add('active');
            });

            // Botón Eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de eliminar este evento?')) {
                    events[dayNumber].splice(index, 1);
                    updateEventsList(dayNumber);
                }
            });

            const actionsContainer = document.createElement('div');
            actionsContainer.style.marginTop = '0.5rem';
            actionsContainer.appendChild(editBtn);
            actionsContainer.appendChild(deleteBtn);

            eventCard.appendChild(eventTitle);
            eventCard.appendChild(eventTime);
            eventCard.appendChild(actionsContainer);

            eventDetailsContainer.appendChild(eventCard);
        });
    } else {
        const noEvents = document.createElement('div');
        noEvents.className = 'no-events';
        noEvents.textContent = 'No hay eventos para este día';
        eventDetailsContainer.appendChild(noEvents);
    }
}
saveEventBtn.addEventListener('click', () => {
    const title = document.getElementById('event-title').value;
    const date = new Date(document.getElementById('event-date').value);
    const day = date.getDate();
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    const newEvent = { title, time, description };

    if (currentEditingDay !== null && currentEditingIndex !== null) {
        // Reemplaza el evento editado
        events[currentEditingDay][currentEditingIndex] = newEvent;
        currentEditingDay = null;
        currentEditingIndex = null;
    } else {
        // Nuevo evento
        if (!events[day]) events[day] = [];
        events[day].push(newEvent);
    }

    updateEventsList(day);
    addEventModal.classList.remove('active');
});
cancelEventBtn.addEventListener('click', () => {
    currentEditingDay = null;
    currentEditingIndex = null;
    addEventModal.classList.remove('active');
});


// Debugging - Uncomment to see events object in console
// window.addEventListener('click', function() {
//     console.log('Current events:', events);
// });