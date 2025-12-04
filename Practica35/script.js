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
//  CONVERTIR 24 HORAS → FORMATO AM/PM SOLO PARA MOSTRAR
// =====================================================================
function formatearAMPM(hora24, minuto) {

    let sufijo = "AM";
    let h = hora24;

    if (h >= 12) sufijo = "PM";
    if (h === 0) h = 12;           // 00:00 → 12 AM
    else if (h > 12) h = h - 12;   // 13–23 → 1–11 PM

    const hh = String(h).padStart(2, "0");
    const mm = String(minuto).padStart(2, "0");

    return `${hh}:${mm} ${sufijo}`;
}



// =====================================================================
//  GUARDAR NUEVO HORARIO EN EL PHOTON (24 HORAS)
// =====================================================================
async function guardarHorario() {
    const estado = document.getElementById("estado");
    const input = document.getElementById("horaInput");
    const hora = input.value;  // formato "HH:MM"

    if (!hora) {
        alert("Selecciona una hora primero.");
        return;
    }

    estado.textContent = "Guardando horario...";

    try {
        const res = await fetch("/api/setHorario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ horario: hora })
        });

        const data = await res.json();
        console.log("Respuesta /api/setHorario:", data);

        if (res.ok && data.ok) {

            // Convertir a AM/PM para mostrarlo
            const [H, M] = hora.split(":").map(Number);
            document.getElementById("progHora").textContent = formatearAMPM(H, M);

            estado.textContent = "Horario guardado correctamente.";

        } else {
            estado.textContent = "No se pudo guardar el horario.";
        }

    } catch (err) {
        console.error(err);
        estado.textContent = "Error de conexión al guardar horario.";
    }
}



// =====================================================================
//  CARGAR HORARIO ACTUAL DEL PHOTON Y MOSTRARLO COMO AM/PM
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
                progHora.textContent = formatearAMPM(h, m);
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
