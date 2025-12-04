async function alimentarAhora() {
    const estado = document.getElementById("estado");
    estado.textContent = "Enviando comando de alimentación...";

    try {
        const res = await fetch("/api/alimentar", {
            method: "POST"
        });

        const data = await res.json();
        console.log("Respuesta /api/alimentar:", data);

        if (res.ok) {
            estado.textContent = "¡Alimentación realizada!";
        } else {
            estado.textContent = "Error al alimentar (servidor).";
        }
    } catch (err) {
        console.error(err);
        estado.textContent = "Error de conexión al servidor.";
    }
}

async function guardarHorario() {
    const estado = document.getElementById("estado");
    const input = document.getElementById("horaInput");
    const hora = input.value;   // formato "HH:MM"

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

        if (res.ok) {
            estado.textContent = "Horario guardado: " + hora;
            document.getElementById("progHora").textContent = hora;
        } else {
            estado.textContent = "Error al guardar horario.";
        }
    } catch (err) {
        console.error(err);
        estado.textContent = "Error de conexión al guardar horario.";
    }
}

async function cargarHorarioActual() {
    const progHora = document.getElementById("progHora");
    const estado = document.getElementById("estado");

    try {
        const res = await fetch("/api/getHorario");
        const data = await res.json();
        console.log("Respuesta /api/getHorario:", data);

        if (res.ok && data.hora !== undefined && data.minuto !== undefined) {
            // Formatear HH:MM con cero a la izquierda
            const hh = String(data.hora).padStart(2, "0");
            const mm = String(data.minuto).padStart(2, "0");
            progHora.textContent = `${hh}:${mm}`;
        } else {
            progHora.textContent = "Sin horario programado";
        }
    } catch (err) {
        console.error(err);
        estado.textContent = "No se pudo leer el horario actual.";
        progHora.textContent = "Error";
    }
}

document.getElementById("btnFeed").addEventListener("click", alimentarAhora);
document.getElementById("btnGuardar").addEventListener("click", guardarHorario);

// Al cargar la página, leer horario actual del Photon
cargarHorarioActual();
