export default async function handler(req, res) {

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    if (!accessToken || !deviceID) {
        return res.status(500).json({
            ok: false,
            error: "Variables privadas no configuradas"
        });
    }

    const urlHora = `https://api.particle.io/v1/devices/${deviceID}/horaProg`;
    const urlMin = `https://api.particle.io/v1/devices/${deviceID}/minutoProg`;

    try {
        const resHora = await fetch(urlHora, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        const horaJson = await resHora.json();

        const resMin = await fetch(urlMin, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        const minJson = await resMin.json();

        return res.status(200).json({
            ok: true,
            hora: Number(horaJson.result),
            minuto: Number(minJson.result)
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Error leyendo horario del dispositivo",
            detalle: String(error)
        });
    }
}
