document.addEventListener('DOMContentLoaded', () => {
    let loggedIn = false;
    let currentIndex = 0;
    let selectedAvatar = '🤖';

    // Elementos del DOM
    const items = document.querySelectorAll('.xmb-item');
    const loginScreen = document.getElementById('login-screen');
    const setupScreen = document.getElementById('setup-screen');
    const dashboard = document.getElementById('xmb-dashboard');
    const usersContainer = document.getElementById('users-container');
    const activeUserDisplay = document.getElementById('active-user-display');
    const clock = document.getElementById('clock');
    
    const setupUsername = document.getElementById('setup-username');
    const btnCreateUser = document.getElementById('btn-create-user');
    const btnAddUser = document.getElementById('btn-add-user');
    const avatarOpts = document.querySelectorAll('.avatar-opt');

    // Reloj en tiempo real
    function updateClock() {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Gestor de LocalStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('nexus_os_users') || '[]');
    }

    function saveUsers(users) {
        localStorage.setItem('nexus_os_users', JSON.stringify(users));
    }

    // Cargar tarjetas de usuario
    function renderUsers() {
        const users = getUsers();
        usersContainer.innerHTML = '';

        if (users.length === 0) {
            loginScreen.classList.add('hidden');
            setupScreen.classList.remove('hidden');
            return;
        }

        users.forEach((u, idx) => {
            const card = document.createElement('button');
            card.className = `user-card flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${idx === 0 ? 'border-white bg-white/10 scale-105' : 'border-transparent bg-white/5'} hover:bg-white/10 transition-all cursor-pointer`;
            card.innerHTML = `
                <div class="w-24 h-24 rounded-lg bg-blue-600 flex items-center justify-center text-4xl border border-white/20">
                    ${u.avatar}
                </div>
                <span class="font-bold text-sm tracking-wide text-white">${u.username}</span>
            `;

            card.addEventListener('click', () => loginUser(u));
            usersContainer.appendChild(card);
        });
    }

    // Iniciar Sesión
    function loginUser(user) {
        loggedIn = true;
        activeUserDisplay.innerText = `${user.avatar} ${user.username}`;
        if (typeof audio !== 'undefined') audio.playSelect();
        
        loginScreen.classList.add('opacity-0', 'pointer-events-none');
        setupScreen.classList.add('hidden');
        dashboard.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Cambio de Avatar en Setup
    avatarOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarOpts.forEach(b => b.classList.replace('border-white', 'border-transparent'));
            btn.classList.replace('border-transparent', 'border-white');
            selectedAvatar = btn.dataset.avatar;
        });
    });

    // Guardar Nuevo Usuario
    btnCreateUser.addEventListener('click', () => {
        const username = setupUsername.value.trim();
        if (!username) {
            alert('Por favor ingresa un nombre de usuario.');
            return;
        }

        const users = getUsers();
        const newUser = { id: Date.now(), username, avatar: selectedAvatar };
        users.push(newUser);
        saveUsers(users);

        setupScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        renderUsers();
        loginUser(newUser);
    });

    // Botón para agregar más usuarios
    btnAddUser.addEventListener('click', () => {
        setupUsername.value = '';
        loginScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
    });

    // Actualizar XMB Carousel
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

    // Navegación Teclado
    document.addEventListener('keydown', (e) => {
        if (!loggedIn) {
            if (e.key === 'Enter') {
                const users = getUsers();
                if (users.length > 0) loginUser(users[0]);
            }
            return;
        }

        if (e.key === 'ArrowRight') {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                if (typeof audio !== 'undefined') audio.playMove();
                updateCarousel();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                if (typeof audio !== 'undefined') audio.playMove();
                updateCarousel();
            }
        } else if (e.key === 'Enter') {
            if (typeof audio !== 'undefined') audio.playSelect();
            const activeTitle = items[currentIndex].querySelector('h3').innerText;
            alert(`Ejecutando: ${activeTitle}`);
        }
    });

    // Inicializar
    renderUsers();
});
