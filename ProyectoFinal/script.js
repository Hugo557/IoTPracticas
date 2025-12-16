// =============================
// CONFIGURACIÓN PARTICLE
// =============================
const DEVICE_ID = "TU_DEVICE_ID";
const TOKEN = "TU_ACCESS_TOKEN";

// =============================
// CONSTANTES
// =============================
const CAPACIDAD_TOTAL = 1000;

// Cantidades por mascota
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
        await fetch(
            `https://api.particle.io/v1/devices/${DEVICE_ID}/setMascota`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `access_token=${TOKEN}&arg=${tipo}`
            }
        );

        document.getElementById("estado").textContent =
            "Mascota seleccionada: " + tipo;

    } catch (err) {
        console.error(err);
        document.getElementById("estado").textContent =
            "Error al configurar mascota";
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
        const res = await fetch(
            `https://api.particle.io/v1/devices/${DEVICE_ID}/dispensar`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `access_token=${TOKEN}&arg=ahora`
            }
        );

        const data = await res.json();

        if (res.ok) {
            document.getElementById("estado").textContent =
                "Agua dispensada correctamente";

            // Actualizar nivel desde el Photon
            await cargarNivel();
            await agregarHistorial();

        } else {
            document.getElementById("estado").textContent =
                "Error al dispensar";
        }

    } catch (err) {
        console.error(err);
        document.getElementById("estado").textContent =
            "Error de conexión con el dispositivo";
    }
}

// =============================
// OBTENER NIVEL DE AGUA
// =============================
async function cargarNivel() {
    try {
        const res = await fetch(
            `https://api.particle.io/v1/devices/${DEVICE_ID}/aguaRestante?access_token=${TOKEN}`
        );
        const data = await res.json();

        if (res.ok) {
            actualizarNivel(data.result);
        }
    } catch (err) {
        console.error("Error leyendo nivel:", err);
    }
}


// =============================
// ACTUALIZAR BARRA VISUAL
// =============================
function actualizarNivel(ml) {

    const porcentaje = (ml / CAPACIDAD_TOTAL) * 100;
    const barra = document.getElementById("barraNivel");

    barra.style.width = porcentaje + "%";
    document.getElementById("textoNivel").textContent = ml + " ml";

    if (ml <= 200) {
        barra.classList.add("bajo");
    } else {
        barra.classList.remove("bajo");
    }
}

// =============================
// FORMATO HORA AM/PM
// =============================
function formatearAMPM(hora24, minuto) {

    let sufijo = "AM";
    let h = hora24;

    if (h >= 12) sufijo = "PM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;

    return `${String(h).padStart(2, "0")}:${String(minuto).padStart(2, "0")} ${sufijo}`;
}

// =============================
// AGREGAR HISTORIAL
// =============================
async function agregarHistorial() {

    try {
        const res = await fetch("/api/getHora");
        const data = await res.json();

        if (!data.ok) return;

        const hora = formatearAMPM(data.hora, data.minuto);
        const ml = cantidades[mascotaActual];

        const tabla = document.getElementById("tablaHistorial");
        const fila = tabla.insertRow(1);

        fila.insertCell(0).textContent = hora;
        fila.insertCell(1).textContent = mascotaActual;
        fila.insertCell(2).textContent = ml + " ml";

    } catch (err) {
        console.error("Error en historial:", err);
    }
}

// =============================
// RELLENAR DEPÓSITO
// =============================
async function rellenar() {

    try {
        await fetch(
            `https://api.particle.io/v1/devices/${DEVICE_ID}/rellenar`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `access_token=${TOKEN}`
            }
        );

        await cargarNivel();

        document.getElementById("estado").textContent =
            "Depósito rellenado";

    } catch (err) {
        console.error(err);
        document.getElementById("estado").textContent =
            "Error al rellenar";
    }
}

// =============================
// INICIALIZACIÓN
// =============================
document.addEventListener("DOMContentLoaded", () => {
    cargarNivel();
});
