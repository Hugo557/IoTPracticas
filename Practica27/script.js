// 🔧 CONFIGURACIÓN
const accessToken = "f7751b64be0d7336072087457f745e9262d55580";
const deviceID = "0a10aced202194944a067818";

const urlTemp = `https://api.particle.io/v1/devices/${deviceID}/gradosC`;
const urlHumedad = `https://api.particle.io/v1/devices/${deviceID}/porcentajeA1`;

// -------- FUNCIONES DE LECTURA --------

function leerTemperatura() {
  $.ajax({
    url: urlTemp,
    method: "GET",
    headers: { "Authorization": "Bearer " + accessToken },
    success: data => {
      const temp = parseFloat(data.result);
      if (!isNaN(temp)) gTemp.refresh(temp);
    },
    error: err => console.error("Error Temp:", err)
  });
}

function leerHumedad() {
  $.ajax({
    url: urlHumedad,
    method: "GET",
    headers: { "Authorization": "Bearer " + accessToken },
    success: data => {
      const hum = parseFloat(data.result);
      if (!isNaN(hum)) gHumedad.refresh(hum);
    },
    error: err => console.error("Error Humedad:", err)
  });
}

// -------- CREACIÓN DE GAUGES --------

$(function () {
  gTemp = new JustGage({
    id: "gaugeTemp",
    value: 0,
    min: 0,
    max: 50,
    label: "°C",
    pointer: true,
    gaugeColor: "#e0e0e0",
    levelColors: ["#33cc33", "#ffcc00", "#ff3300"]
  });

  gHumedad = new JustGage({
    id: "gaugeHumedad",
    value: 0,
    min: 0,
    max: 100,
    label: "%",
    pointer: true,
    gaugeColor: "#e0e0e0",
    levelColors: ["#0099ff", "#66ccff", "#0033cc"]
  });

  leerTemperatura();
  leerHumedad();

  setInterval(leerTemperatura, 1200);
  setInterval(leerHumedad, 1200);
});
