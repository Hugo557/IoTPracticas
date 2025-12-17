export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false });
    }

    try {
        const url = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/dispensar`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `access_token=${process.env.PARTICLE_ACCESS_TOKEN}&arg=ahora`
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ ok: false, error: data });
        }

        res.json({ ok: true, data });

    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}
export default function handler(req, res) {
  res.json({
    device: process.env.PARTICLE_DEVICE_ID,
    token: process.env.PARTICLE_ACCESS_TOKEN ? "OK" : "NO TOKEN"
  });
}
