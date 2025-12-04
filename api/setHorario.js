export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Método no permitido" });
    }

    // Leer body
    let body = "";
    await new Promise(resolve => {
        req.on("data", chunk => body += chunk);
        req.on("end", resolve);
    });

    const { horario } = JSON.parse(body);
    if (!horario) {
        return res.status(400).json({ ok: false, error: "Falta horario" });
    }

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    const url = `https://api.particle.io/v1/devices/${deviceID}/setHorario`;

    const particleRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `access_token=${accessToken}&args=${horario}`
    });

    const result = await particleRes.json();

    return res.status(200).json({ ok: true, raw: result });
}
