// =============================
// CONSTANTES
// =============================
const CAPACIDAD_TOTAL = 1000;

const cantidades = {
    gato: 75,
    chico: 150,
    mediano: 250,
    grande: 400
};

let mascotaActual = null;

// =============================
// SELECCIONAR MASCOTA
// =============================
async function setMascota(tipo) {
    mascotaActual = tipo;

    try {
        const res = await fetch("/api/setMascota", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mascota: tipo })
        });

        if (res.ok) {
            document.getElementById("estado").textContent =
                "Mascota seleccionada: " + tipo;
        } else {
            throw new Error();
        }

    } catch {
        document.getElementById("estado").textContent =
            "Error al seleccionar mascota";
    }
}

// =============================
// DISPENSAR AGUA
// =============================
async function dispensar() {

    if (!mascotaActual) {
        document.getElementById("estado").textContent =
            "Selecciona una mascota primero";
        return;
    }

    try {
        const res = await fetch("/api/dispensar", { method: "POST" });
        const data = await res.json();

        if (!res.ok) throw new Error();

        document.getElementById("estado").textContent =
            "Agua dispensada correctamente";

        await cargarNivel();
        agregarHistorial();

    } catch {
        document.getElementById("estado").textContent =
            "Error al dispensar agua";
    }
}

// =============================
// NIVEL DE AGUA
// =============================
async function cargarNivel() {
    try {
        const res = await fetch("/api/getNivel");
        const data = await res.json();

        if (res.ok) {
            actualizarNivel(data.nivel);
        }
    } catch (err) {
        console.error("Error nivel:", err);
    }
}

function actualizarNivel(ml) {
    const porcentaje = (ml / CAPACIDAD_TOTAL) * 100;
    const barra = document.getElementById("barraNivel");

    barra.style.width = porcentaje + "%";
    document.getElementById("textoNivel").textContent = ml + " ml";

    if (ml <= 200) barra.classList.add("bajo");
    else barra.classList.remove("bajo");
}

// =============================
// HISTORIAL
// =============================
function agregarHistorial() {

    const ahora = new Date();
    const hora = ahora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const tabla = document.getElementById("tablaHistorial");
    const fila = tabla.insertRow(1);

    fila.insertCell(0).textContent = hora;
    fila.insertCell(1).textContent = mascotaActual;
    fila.insertCell(2).textContent = cantidades[mascotaActual] + " ml";
}

// =============================
// HORARIO
// =============================
async function guardarHorario() {
    const hora = document.getElementById("horaInput").value;

    if (!hora) return alert("Selecciona una hora");

    try {
        const res = await fetch("/api/setHorario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ horario: hora })
        });

        if (res.ok) {
            document.getElementById("estado").textContent =
                "Horario guardado";
            cargarHorarioActual();
        }

    } catch {
        document.getElementById("estado").textContent =
            "Error al guardar horario";
    }
}

async function cargarHorarioActual() {
    try {
        const res = await fetch("/api/getHorario");
        const data = await res.json();

        if (res.ok && data.hora >= 0) {
            document.getElementById("progHora").textContent =
                `${data.hora}:${String(data.minuto).padStart(2, "0")}`;
        }
    } catch {}
}

// =============================
// RELLENAR DEPÓSITO (LÓGICO)
// =============================
async function rellenar() {

    try {
        const res = await fetch("/api/rellenar", { method: "POST" });
        const data = await res.json();

        if (!res.ok) throw new Error();

        actualizarNivel(data.nivel);

        document.getElementById("estado").textContent =
            "Depósito rellenado (1000 ml)";

    } catch {
        document.getElementById("estado").textContent =
            "Error al rellenar depósito";
    }
}

// =============================
// INICIALIZACIÓN
// =============================
document.addEventListener("DOMContentLoaded", () => {
    cargarNivel();
    cargarHorarioActual();
});
