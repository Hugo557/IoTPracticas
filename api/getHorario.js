export default async function handler(req, res) {
    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    if (!accessToken || !deviceID) {
        return res.status(500).json({ error: "Variables privadas no configuradas" });
    }

    try {
        const urlHora = `https://api.particle.io/v1/devices/${deviceID}/horaProg?access_token=${accessToken}`;
        const urlMin = `https://api.particle.io/v1/devices/${deviceID}/minutoProg?access_token=${accessToken}`;

        const hRes = await fetch(urlHora);
        const mRes = await fetch(urlMin);

        const hora = await hRes.json();
        const minuto = await mRes.json();

        return res.status(200).json({
            ok: true,
            hora: hora.result,
            minuto: minuto.result
        });

    } catch (err) {
        return res.status(500).json({ error: "Error leyendo horario", detalle: String(err) });
    }
}
