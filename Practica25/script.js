async function enviarComando(comando) {
    const estado = document.getElementById("estado");
    estado.textContent = "Enviando comando...";

    try {
        const res = await fetch("/api/rele", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comando })
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

        if (res.ok && data.ok) {
            estado.textContent = `Comando enviado: ${comando.toUpperCase()}`;
        } else {
            estado.textContent = "Error enviando comando al servidor";
        }

    } catch (error) {
        estado.textContent = "Error conectando con el servidor";
        console.error("Error:", error);
    }
}
