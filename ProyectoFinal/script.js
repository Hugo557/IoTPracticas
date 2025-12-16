const DEVICE_ID = "TU_DEVICE_ID";
const TOKEN = "TU_TOKEN";

async function setMascota(tipo) {
    const res = await fetch(
        `https://api.particle.io/v1/devices/${DEVICE_ID}/setMascota`,
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `access_token=${TOKEN}&arg=${tipo}`
        }
    );

    document.getElementById("estado").textContent =
        "Mascota configurada: " + tipo;
}

async function dispensar() {
    await fetch(
        `https://api.particle.io/v1/devices/${DEVICE_ID}/dispensar`,
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `access_token=${TOKEN}&arg=ahora`
        }
    );

    document.getElementById("estado").textContent =
        "Agua dispensada";
}

const CAPACIDAD_TOTAL = 1000;

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

