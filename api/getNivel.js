export default async function handler(req, res) {

    try {
        const url = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/aguaRestante`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.PARTICLE_ACCESS_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ ok: false, error: data });
        }

        res.json({
            ok: true,
            nivel: data.result   // ← ESTE ES EL DATO BUENO
        });

    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}
