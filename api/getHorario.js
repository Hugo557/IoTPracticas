export default async function handler(req, res) {

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    const urlHora = `https://api.particle.io/v1/devices/${deviceID}/horaProg?access_token=${accessToken}`;
    const urlMin = `https://api.particle.io/v1/devices/${deviceID}/minutoProg?access_token=${accessToken}`;

    try {
        const resHora = await fetch(urlHora);
        const horaJson = await resHora.json();

        const resMin = await fetch(urlMin);
        const minJson = await resMin.json();

        return res.status(200).json({
            ok: true,
            hora: horaJson.result,
            minuto: minJson.result
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: "Error leyendo horario del dispositivo",
            detalle: String(error)
        });
    }
}
