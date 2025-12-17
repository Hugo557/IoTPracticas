export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const url = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/rellenar`;

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `access_token=${process.env.PARTICLE_ACCESS_TOKEN}&arg=ok`
  });

  const data = await r.json();
  res.json({ ok: r.ok, nivel: data.return_value });
}
