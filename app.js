// Datos extraídos del historial de chat
const data = {
    total_messages: 2315,
    user1: { name: "Gabriel", count: 1054 },
    user2: { name: "Eimi", count: 1261 },
    top_emojis: ["♥️", "😭", "🙄", "🫦", "🐄"],
    hourly_activity: [120, 180, 80, 20, 5, 10, 15, 30, 50, 80, 110, 140, 160, 140, 120, 110, 130, 150, 180, 220, 250, 280, 310, 200]
};

function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
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
    animateValue("total-messages", 0, data.total_messages, 2000);
    animateValue("gabriel-msg", 0, data.user1.count, 2000);
    animateValue("eimi-msg", 0, data.user2.count, 2000);

    document.getElementById("emojis-container").innerHTML = data.top_emojis.join(" ");

    const ctx = document.getElementById('timeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
            datasets: [{
                label: 'Mensajes',
                data: data.hourly_activity,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4
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
});
