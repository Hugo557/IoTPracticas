export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    let body = "";
    await new Promise(resolve => {
        req.on("data", chunk => body += chunk);
        req.on("end", resolve);
    });

    const json = JSON.parse(body || "{}");

    if (!json.horario) {
        return res.status(400).json({ error: "Falta 'horario' (HH:MM)" });
    }

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    const url = `https://api.particle.io/v1/devices/${deviceID}/setHorario`;

    try {
        const particleRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `access_token=${accessToken}&params=${json.horario}`
        });

        const data = await particleRes.json();
        return res.status(200).json({ ok: true, horario: json.horario, raw: data });

    } catch (error) {
        return res.status(500).json({ error: "Error conectando a Particle", detalle: String(error) });
    }
}
