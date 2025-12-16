// =============================
// MODO SIMULACIÓN (SIN PHOTON)
// =============================

const CAPACIDAD_TOTAL = 1000;
let nivelAgua = 1000;
let mascotaActual = "Ninguna";

// Cantidades por mascota
const cantidades = {
    gato: 75,
    chico: 150,
    mediano: 250,
    grande: 400
};

// -----------------------------
// Seleccionar mascota
// -----------------------------
function setMascota(tipo) {
    mascotaActual = tipo;
    document.getElementById("estado").textContent =
        "Mascota seleccionada: " + tipo;
}

// -----------------------------
// Dispensar agua (simulado)
// -----------------------------
function dispensar() {

    if (!cantidades[mascotaActual]) {
        document.getElementById("estado").textContent =
            "Selecciona una mascota primero";
        return;
    }

    const ml = cantidades[mascotaActual];

    if (nivelAgua <= 0) {
        document.getElementById("estado").textContent =
            "Depósito vacío";
        return;
    }

    nivelAgua -= ml;
    if (nivelAgua < 0) nivelAgua = 0;

    actualizarNivel(nivelAgua);

    document.getElementById("estado").textContent =
        `Dispensado ${ml} ml (${mascotaActual})`;
}

// -----------------------------
// Actualizar barra visual
// -----------------------------
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

function rellenar() {
    nivelAgua = CAPACIDAD_TOTAL;
    actualizarNivel(nivelAgua);

    document.getElementById("estado").textContent =
        "Depósito rellenado (1000 ml)";
}

// -----------------------------
// Inicialización
// -----------------------------
actualizarNivel(nivelAgua);
