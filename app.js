// Datos extraídos del historial de chat
const data = {
    total_messages: 100000, 
    user1: { name: "Gabriel", count: 48500 },
    user2: { name: "Eimi", count: 51500 },
    top_emojis: ["♥️", "😭", "🙄", "🫦", "🐄"],
    hourly_activity: [1200, 1800, 800, 200, 50, 100, 150, 300, 500, 800, 1100, 1400, 1600, 1400, 1200, 1100, 1300, 1500, 1800, 2200, 2500, 2800, 3100, 2000]
};

function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
    // Inyectar Emojis
    const emojisContainer = document.getElementById("emojis-container");
    if(emojisContainer) emojisContainer.innerHTML = data.top_emojis.join(" ");

    // Configurar el gráfico con un degradado visual
    const chartCanvas = document.getElementById('timeChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(255, 75, 75, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 75, 75, 0.1)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
                datasets: [{
                    label: 'Mensajes',
                    data: data.hourly_activity,
                    backgroundColor: gradient,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { display: false },
                    x: { ticks: { color: '#fff' }, grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // Observador para activar animaciones al hacer scroll (Estilo Spotify)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dispara el pop-up de CSS
                entry.target.classList.add('visible'); 
                
                // Activar contador de mensajes totales
                if (entry.target.id === 'slide2') {
                    const totalMsgEl = document.getElementById('total-messages');
                    if (totalMsgEl && totalMsgEl.innerText === '0') {
                        animateValue("total-messages", 0, data.total_messages, 2500);
                    }
                }
                
                // Activar contador por usuario
                if (entry.target.id === 'slide3') {
                    const gabrielMsgEl = document.getElementById('gabriel-msg');
                    if (gabrielMsgEl && gabrielMsgEl.innerText === '0') {
                        animateValue("gabriel-msg", 0, data.user1.count, 2500);
                        animateValue("eimi-msg", 0, data.user2.count, 2500);
                    }
                }
                
                // Explosión de confeti solo en la pantalla final de los 15 meses
                if (entry.target.id === 'slide7' && !entry.target.hasAttribute('data-confetti')) {
                    entry.target.setAttribute('data-confetti', 'true');
                    createConfetti(entry.target);
                }
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% de la slide es visible

    // Vigilar todas las diapositivas
    document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
});

// Generador de Confeti Multidimensional
function createConfetti(container) {
    const emojis = ['❤️', '✨', '💕', '💖', '🎉', '🫶'];
    for (let i = 0; i < 70; i++) {
        let conf = document.createElement('div');
        conf.classList.add('heart-particle');
        conf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Tamaños aleatorios para crear un efecto 3D
        let size = Math.random() * 2.5 + 0.8; 
        conf.style.fontSize = `${size}rem`;
        conf.style.left = `${Math.random() * 100}vw`;
        conf.style.animationDuration = `${Math.random() * 3 + 2}s`; // Caen entre 2 y 5 segundos
        conf.style.animationDelay = `${Math.random() * 1.5}s`;
        
        // Los elementos más grandes se ven ligeramente borrosos simulando estar más cerca de la pantalla
        if (size > 2.5) conf.style.filter = 'blur(2px)'; 
        
        container.appendChild(conf);
    }
}
