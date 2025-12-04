export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    if (!accessToken || !deviceID) {
        return res.status(500).json({ error: "Variables privadas no configuradas" });
    }

    const url = `https://api.particle.io/v1/devices/${deviceID}/alimentar`;

    try {
        const particleRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `access_token=${accessToken}&params=1`
        });

        const data = await particleRes.json();
        return res.status(200).json({ ok: true, raw: data });

    } catch (error) {
        return res.status(500).json({ error: "Error conectando a Particle", detalle: String(error) });
    }
}
