var gTemp = null;
var gHum = null;

document.addEventListener("DOMContentLoaded", function () {

    gTemp = new JustGage({
        id: "gaugeTemp",
        value: 0,
        min: 0,
        max: 50,
        title: "Temperatura",
        label: "°C",
        decimals: 1
    });

    gHum = new JustGage({
        id: "gaugeHum",
        value: 0,
        min: 0,
        max: 100,
        title: "Humedad",
        label: "%",
        decimals: 1
    });

    obtenerTemperatura();
    obtenerHumedad();
});

// ---- TEMPERATURA ----
function obtenerTemperatura() {
    $.ajax({
        url: "/api/temperatura",
        method: "GET",
        success: function (data) {
            var temp = parseFloat(data.valor);
            gTemp.refresh(temp);
            $("#valor-temp").text(temp.toFixed(1) + " °C");
            setTimeout(obtenerTemperatura, 1200);
        },
        error: function () {
            $("#valor-temp").text("Error");
            setTimeout(obtenerTemperatura, 3000);
        }
    });
}

// ---- HUMEDAD ----
function obtenerHumedad() {
    $.ajax({
        url: "/api/humedad",
        method: "GET",
        success: function (data) {
            var hum = parseFloat(data.valor);
            gHum.refresh(hum);
            $("#valor-hum").text(hum.toFixed(1) + " %");
            setTimeout(obtenerHumedad, 1200);
        },
        error: function () {
            $("#valor-hum").text("Error");
            setTimeout(obtenerHumedad, 3000);
        }
    });
}
