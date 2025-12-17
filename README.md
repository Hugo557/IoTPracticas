🌐 IoT Prácticas & Proyecto Final

Particle Photon 2 · APIs · Frontend Web · Vercel

Repositorio que concentra todas las prácticas desarrolladas durante la materia de IoT, así como el Proyecto Final, integrando hardware, firmware, APIs REST y visualización web.

📌 Contenido del Repositorio

El proyecto está organizado por prácticas incrementales, donde cada una introduce nuevos conceptos de IoT, hasta llegar a un sistema funcional completo.


<pre>
IOTPRACTICAS/
├── api/                          # APIs para comunicación con Particle Cloud
│   ├── alimentar.js
│   ├── dispensar.js
│   ├── getHorario.js
│   ├── getNivel.js
│   ├── humedad.js
│   ├── rele.js
│   ├── rellenar.js
│   ├── setHorario.js
│   ├── setMascota.js
│   └── temperatura.js
├── Practica24/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── Practica25/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── Practica26/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── Practica27/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── Practica35/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── ProyectoFinal/                # Sistema completo IoT
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── index.html                    # Página principal
├── styles.css
├── README.md
├── .env                          # Variables de entorno (no se sube)
├── .gitignore
└── vercel.json                   # Configuración de despliegue
</pre>

🧠 Temas Vistos

A lo largo del repositorio se trabajan los siguientes conceptos:

🔌 Hardware & Firmware

Particle Photon 2

Control de:

Relé (bomba de agua)

LEDs de estado

Botón físico

Buzzer pasivo (PWM)

Medición por tiempo → volumen (ml)

☁️ IoT & Cloud

Particle Cloud

Particle.function()

Particle.variable()

Comunicación HTTP entre Web ↔ Photon

Sincronización de tiempo (Particle.syncTime())

💾 Persistencia

Uso de EEPROM

Tipo de mascota

Horarios programados

Cantidad de agua restante

🌐 Frontend Web

HTML + CSS + JavaScript

Dashboards simples

Botones de acción manual

Indicadores de estado

Comunicación con APIs mediante fetch()

⚙️ Backend / APIs

Endpoints en JavaScript

Separación de responsabilidades por API

Manejo de respuestas y estados

🚀 Despliegue

Hosting en Vercel

Variables de entorno

Configuración con vercel.json

🐾 Proyecto Final – Dispensador Inteligente de Agua

Sistema IoT diseñado para dispensar agua automáticamente a mascotas, con las siguientes características:

✅ Funcionalidades

Selección de tipo de mascota

Cantidad de agua configurable (ml)

Dispensado automático por horario

Dispensado manual (botón físico y web)

Indicadores visuales (LEDs)

Alerta sonora (buzzer)

Persistencia de datos aun sin energía

📊 Lógica de Medición

La cantidad de agua se calcula por tiempo de activación de la bomba, usando una calibración:

ml = tiempo (segundos) × ML_POR_SEGUNDO

🛠️ Tecnologías Utilizadas

Hardware: Particle Photon 2

Firmware: C++ (Particle Device OS)

Frontend: HTML, CSS, JavaScript

Backend: JavaScript (APIs)

Cloud: Particle Cloud

Hosting: Vercel

🔒 Variables de Entorno

Este proyecto utiliza un archivo .env (no incluido) con:

PARTICLE_TOKEN=tu_token
PARTICLE_DEVICE_ID=tu_device_id

🎯 Objetivo Académico

Aplicar los conceptos de Internet de las Cosas integrando:

Hardware

Programación embebida

Comunicación en la nube

Interfaces web

Persistencia y automatización

👨‍💻 Autor

Hugo Emilio Espinoza Tun
Jesús Contreras Castillo
Ingeniería en Sistemas Computacionales
Instituto Tecnológico de Saltillo