export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ ok: false });

  const url = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}`;

  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.PARTICLE_ACCESS_TOKEN}`
    }
  });

  const data = await r.json();

  if (!data.variables || !data.variables.aguaRestante) {
    return res.status(500).json({ ok: false, error: "Variable no encontrada" });
  }

  res.json({
    ok: true,
    nivel: data.variables.aguaRestante.value
  });
}
