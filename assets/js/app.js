document.addEventListener('DOMContentLoaded', () => {
    let loggedIn = false;
    let currentIndex = 0;
    const items = document.querySelectorAll('.xmb-item');
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('xmb-dashboard');
    const clock = document.getElementById('clock');

    // Reloj en tiempo real
    function updateClock() {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Actualizar selección visual del XMB
    function updateCarousel() {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active', 'scale-110', 'border-white', 'shadow-2xl');
                item.classList.remove('opacity-80', 'border-transparent');
            } else {
                item.classList.remove('active', 'scale-110', 'border-white', 'shadow-2xl');
                item.classList.add('opacity-80', 'border-transparent');
            }
        });
    }

    // Controles por teclado
    document.addEventListener('keydown', (e) => {
        if (!loggedIn) {
            if (e.key === 'Enter') {
                loggedIn = true;
                audio.playSelect();
                loginScreen.classList.add('opacity-0', 'pointer-events-none');
                dashboard.classList.remove('opacity-0', 'pointer-events-none');
            }
            return;
        }

        if (e.key === 'ArrowRight') {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                audio.playMove();
                updateCarousel();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                audio.playMove();
                updateCarousel();
            }
        } else if (e.key === 'Enter') {
            audio.playSelect();
            const activeTitle = items[currentIndex].querySelector('h3').innerText;
            alert(`Iniciando: ${activeTitle}`);
        }
    });
});
