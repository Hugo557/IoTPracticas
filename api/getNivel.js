export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ ok: false });
    }

    try {
        const url = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/aguaRestante?access_token=${process.env.PARTICLE_ACCESS_TOKEN}`;

        const response = await fetch(url);
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
