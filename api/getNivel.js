export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ ok: false });
    }

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    if (!accessToken || !deviceID) {
        return res.status(500).json({ ok: false, error: "Env vars missing" });
    }

    try {
        const url = `https://api.particle.io/v1/devices/${deviceID}/aguaRestante`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ ok: false, error: data });
        }

        res.json({
            ok: true,
            nivel: data.result
        });

    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}
