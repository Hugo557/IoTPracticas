var g = null;
var intervalo = 1000; // ms

document.addEventListener("DOMContentLoaded", function () {
    g = new JustGage({
        id: "gauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Temperatura (°C)",
        label: "°C",
        decimals: 2
    });

    getReading();
});

function getReading() {
    $.ajax({
        url: "/api/temperatura",
        method: "GET",
        success: function (data) {

            console.log("DATA RECIBIDA:", data);

            var temp = parseFloat(data.valor);   // ← CAMBIO IMPORTANTE

            if (isNaN(temp)) {
                $("#estado").text("Error: valor no numérico.");
            } else {
                g.refresh(temp);
                $("#valor-num").text(temp.toFixed(2) + " °C");
                $("#estado").text("Lectura correcta");
            }

            setTimeout(getReading, intervalo);
        },
        error: function (err) {
            console.log("ERROR", err);
            $("#estado").text("Error de conexión. Reintentando...");
            setTimeout(getReading, 3000);
        }
    });
}
