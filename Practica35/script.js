// =====================================================================
//  ENVIAR COMANDO DE ALIMENTACIÓN MANUAL
// =====================================================================
async function alimentarAhora() {
    const estado = document.getElementById("estado");
    estado.textContent = "Enviando comando de alimentación...";

    try {
        const res = await fetch("/api/alimentar", { method: "POST" });
        const data = await res.json();

        console.log("Respuesta /api/alimentar:", data);

        if (res.ok && data.ok) {
            estado.textContent = "¡Alimentación realizada!";
        } else {
            estado.textContent = "Error al alimentar.";
        }

    } catch (err) {
        console.error(err);
        estado.textContent = "Error de conexión al servidor.";
    }
}



// =====================================================================
//  GUARDAR NUEVO HORARIO EN EL PHOTON
// =====================================================================
async function guardarHorario() {
    const estado = document.getElementById("estado");
    const input = document.getElementById("horaInput");
    const hora = input.value;   // Formato "HH:MM"

    if (!hora) {
        alert("Selecciona una hora primero.");
        return;
    }

    estado.textContent = "Guardando horario...";

    try {
        const res = await fetch("/api/setHorario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ horario: hora })
        });

        const data = await res.json();
        console.log("Respuesta /api/setHorario:", data);

        if (res.ok && data.ok) {
            estado.textContent = "Horario guardado correctamente.";

            // Actualizar en pantalla
            document.getElementById("progHora").textContent = hora;

        } else {
            estado.textContent = "No se pudo guardar el horario.";
        }

    } catch (err) {
        console.error(err);
        estado.textContent = "Error de conexión al guardar horario.";
    }
}



// =====================================================================
//  CARGAR HORARIO ACTUAL DEL PHOTON (desde las variables horaProg y minutoProg)
// =====================================================================
async function cargarHorarioActual() {
    const progHora = document.getElementById("progHora");
    const estado = document.getElementById("estado");

    try {
        const res = await fetch("/api/getHorario");
        const data = await res.json();

        console.log("Respuesta /api/getHorario:", data);

        if (res.ok && data.ok) {
            const h = data.hora;
            const m = data.minuto;

            if (h >= 0 && m >= 0) {
                const hh = String(h).padStart(2, "0");
                const mm = String(m).padStart(2, "0");
                progHora.textContent = `${hh}:${mm}`;
            } else {
                progHora.textContent = "Sin horario programado";
            }
        } else {
            progHora.textContent = "Error al leer horario";
        }

    } catch (err) {
        console.error(err);
        estado.textContent = "No se pudo leer el horario actual.";
        progHora.textContent = "Error";
    }
}



// =====================================================================
// EVENTOS
// =====================================================================
document.getElementById("btnFeed").addEventListener("click", alimentarAhora);
document.getElementById("btnGuardar").addEventListener("click", guardarHorario);

// Al cargar la página, leer horario actual del Photon
cargarHorarioActual();
