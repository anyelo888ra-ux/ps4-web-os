document.addEventListener('DOMContentLoaded', () => {
    let loggedIn = false;
    let currentIndex = 0;
    let selectedAvatar = '🤖';
    let currentAppOpen = null;

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

    const appModal = document.getElementById('app-modal');
    const appTitle = document.getElementById('app-title');
    const appBody = document.getElementById('app-body');
    const closeAppBtn = document.getElementById('close-app');

    // Reloj
    function updateClock() {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // LocalStorage de Usuarios
    function getUsers() {
        return JSON.parse(localStorage.getItem('nexus_os_users') || '[]');
    }
    function saveUsers(users) {
        localStorage.setItem('nexus_os_users', JSON.stringify(users));
    }

    // LocalStorage de Juegos/Apps publicados en la Store
    function getPublishedGames() {
        return JSON.parse(localStorage.getItem('nexus_published_games') || '[]');
    }
    function savePublishedGames(games) {
        localStorage.setItem('nexus_published_games', JSON.stringify(games));
    }

    // Cargar juegos publicados al carrusel XMB
    function loadCustomGamesToXMB() {
        const carousel = document.getElementById('carousel');
        // Remover juegos personalizados previos para evitar duplicados
        document.querySelectorAll('.custom-xmb-game').forEach(el => el.remove());

        const games = getPublishedGames();
        games.forEach(game => {
            const item = document.createElement('div');
            item.className = 'xmb-item custom-xmb-game min-w-[180px] h-[180px] bg-purple-900 rounded-lg p-4 flex flex-col justify-between border-2 border-transparent hover:border-white/50 transition-all opacity-80 cursor-pointer';
            item.setAttribute('data-app', 'custom-game');
            item.setAttribute('data-html', game.htmlContent);
            item.innerHTML = `
                <span class="text-4xl">🚀</span>
                <div>
                    <h3 class="font-bold text-lg leading-tight">${game.title}</h3>
                    <p class="text-[10px] text-purple-300">Por ${game.author}</p>
                </div>
            `;
            carousel.appendChild(item);
        });
        // Actualizar lista de elementos seleccionables
        items = document.querySelectorAll('.xmb-item');
    }

    let items = document.querySelectorAll('.xmb-item');

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

    function loginUser(user) {
        loggedIn = true;
        activeUserDisplay.innerText = `${user.avatar} ${user.username}`;
        if (typeof audio !== 'undefined') audio.playSelect();
        loginScreen.classList.add('opacity-0', 'pointer-events-none');
        setupScreen.classList.add('hidden');
        dashboard.classList.remove('opacity-0', 'pointer-events-none');
        loadCustomGamesToXMB();
    }

    avatarOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarOpts.forEach(b => b.classList.replace('border-white', 'border-transparent'));
            btn.classList.replace('border-transparent', 'border-white');
            selectedAvatar = btn.dataset.avatar;
        });
    });

    btnCreateUser.addEventListener('click', () => {
        const username = setupUsername.value.trim();
        if (!username) return alert('Ingresa un nombre de usuario.');
        const users = getUsers();
        const newUser = { id: Date.now(), username, avatar: selectedAvatar };
        users.push(newUser);
        saveUsers(users);
        setupScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        renderUsers();
        loginUser(newUser);
    });

    btnAddUser.addEventListener('click', () => {
        setupUsername.value = '';
        loginScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
    });

    function updateCarousel() {
        items = document.querySelectorAll('.xmb-item');
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

    // Abrir aplicaciones con UI real
    function openApp(appType, customData = null) {
        currentAppOpen = appType;
        if (typeof audio !== 'undefined') audio.playSelect();
        appModal.classList.remove('opacity-0', 'pointer-events-none');

        if (appType === 'nexus-pass') {
            appTitle.innerText = '⚡ NEXUS Pass - Beneficios';
            appBody.innerHTML = `
                <div class="flex flex-col gap-4">
                    <h4 class="text-xl font-bold text-amber-400">¡Disfruta de tu NEXUS Pass activo!</h4>
                    <p class="text-sm text-slate-300">Tienes acceso a temas exclusivos, avatares personalizados y prioridad en servidores de IA.</p>
                    <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-xs text-amber-300 font-bold">Estado: Suscripción Activa (3 días restantes)</span>
                    </div>
                </div>
            `;
        } else if (appType === 'nexus-store') {
            renderNexusStoreUI();
        } else if (appType === 'nexus-ai') {
            appTitle.innerText = '🤖 NEXUS.AI - Asistente Virtual';
            appBody.innerHTML = `
                <div class="flex flex-col h-full justify-between gap-4">
                    <div class="bg-slate-950 p-4 rounded-xl flex-1 overflow-y-auto border border-white/10 flex flex-col gap-3">
                        <div class="bg-indigo-950/60 p-3 rounded-lg text-sm max-w-[80%] border border-indigo-500/30">
                            ¡Hola! Soy NEXUS.AI integrado en tu consola web. ¿En qué te puedo ayudar hoy?
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <input type="text" placeholder="Escribe tu mensaje..." class="flex-1 bg-slate-950 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                        <button class="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-lg font-bold text-sm transition cursor-pointer">Enviar</button>
                    </div>
                </div>
            `;
        } else if (appType === 'default-game') {
            appTitle.innerText = '🎮 FLAP DASH';
            appBody.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <div class="text-6xl">🕹️</div>
                    <h4 class="text-2xl font-bold">FLAP DASH Arcade</h4>
                    <p class="text-sm text-slate-400 max-w-md">Un juego clásico estilo plataforma corriendo de forma nativa en tu navegador.</p>
                    <button class="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition cursor-pointer">Jugar Ahora</button>
                </div>
            `;
        } else if (appType === 'custom-game') {
            appTitle.innerText = '🚀 Juego Personalizado';
            appBody.innerHTML = `<div class="w-full h-full">${customData}</div>`;
        }
    }

    // Interfaz de NEXUS Store y Publicación
    function renderNexusStoreUI() {
        const isPublishRoute = window.location.pathname.includes('/nexus-store/publish') || window.location.hash === '#/nexus-store/publish';
        
        appTitle.innerText = '🛍️ NEXUS Store & Publicación';
        appBody.innerHTML = `
            <div class="flex flex-col gap-6">
                <div class="flex gap-4 border-b border-white/10 pb-4">
                    <button id="tab-store" class="font-bold text-sm px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">Explorar Juegos</button>
                    <button id="tab-publish" class="font-bold text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer">Publicar Juego (HTML)</button>
                </div>

                <div id="store-view" class="space-y-4">
                    <h4 class="font-bold text-lg text-slate-200">Juegos de la Comunidad</h4>
                    <div id="community-games-list" class="grid grid-cols-2 gap-4">
                        <!-- Dinámico -->
                    </div>
                </div>

                <div id="publish-view" class="hidden space-y-4">
                    <h4 class="font-bold text-lg text-slate-200">Publicar tu Juego en la Store</h4>
                    <p class="text-xs text-slate-400">Sube tu código HTML/JS/CSS completo para que aparezca directamente en el carrusel de NEXUS.OS.</p>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="block text-xs font-bold text-slate-300 mb-1">Título del Juego</label>
                            <input type="text" id="pub-title" placeholder="Ej: Super Cube Runner" class="w-full bg-slate-950 border border-white/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-300 mb-1">Código HTML del Juego</label>
                            <textarea id="pub-html" rows="6" placeholder="<div style='color:white; text-align:center;'><h1>¡Mi Juego!</h1></div>" class="w-full bg-slate-950 border border-white/20 rounded-lg px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <button id="btn-submit-game" class="w-full bg-emerald-600 hover:bg-emerald-500 font-bold text-sm py-3 rounded-lg transition cursor-pointer shadow-lg shadow-emerald-600/30">
                            Publicar en https://ps4-web.vercel.app/nexus-store/publish
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Lógica de Tabs dentro de la Store
        const tabStore = document.getElementById('tab-store');
        const tabPublish = document.getElementById('tab-publish');
        const storeView = document.getElementById('store-view');
        const publishView = document.getElementById('publish-view');
        const gamesList = document.getElementById('community-games-list');

        function loadCommunityGames() {
            const games = getPublishedGames();
            gamesList.innerHTML = games.length === 0 ? '<p class="text-xs text-slate-500 col-span-2">No hay juegos publicados aún. ¡Sé el primero en publicar uno!</p>' : '';
            games.forEach((g, idx) => {
                const card = document.createElement('div');
                card.className = 'bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col justify-between gap-3';
                card.innerHTML = `
                    <div>
                        <h5 class="font-bold text-white">${g.title}</h5>
                        <span class="text-[10px] text-slate-400">Autor: ${g.author}</span>
                    </div>
                    <button class="play-pub-game bg-blue-600 hover:bg-blue-500 text-xs font-bold py-2 rounded-lg transition cursor-pointer" data-index="${idx}">Jugar</button>
                `;
                gamesList.appendChild(card);
            });

            document.querySelectorAll('.play-pub-game').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const game = games[e.target.dataset.index];
                    openApp('custom-game', game.htmlContent);
                });
            });
        }
        loadCommunityGames();

        tabStore.addEventListener('click', () => {
            tabStore.className = 'font-bold text-sm px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer';
            tabPublish.className = 'font-bold text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer';
            storeView.classList.remove('hidden');
            publishView.classList.add('hidden');
        });

        tabPublish.addEventListener('click', () => {
            tabPublish.className = 'font-bold text-sm px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer';
            tabStore.className = 'font-bold text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer';
            publishView.classList.remove('hidden');
            storeView.classList.add('hidden');
        });

        document.getElementById('btn-submit-game').addEventListener('click', () => {
            const title = document.getElementById('pub-title').value.trim();
            const htmlContent = document.getElementById('pub-html').value.trim();
            const users = getUsers();
            const author = users.length > 0 ? users[0].username : 'Anónimo';

            if (!title || !htmlContent) {
                alert('Por favor completa todos los campos.');
                return;
            }

            const games = getPublishedGames();
            games.push({ title, htmlContent, author });
            savePublishedGames(games);

            alert('¡Juego publicado exitosamente en la NEXUS Store!');
            loadCustomGamesToXMB();
            loadCommunityGames();
            tabStore.click();
        });
    }

    function closeAppModal() {
        appModal.classList.add('opacity-0', 'pointer-events-none');
        currentAppOpen = null;
    }

    closeAppBtn.addEventListener('click', closeAppModal);

    // Controles por Teclado
    document.addEventListener('keydown', (e) => {
        if (!loggedIn) {
            if (e.key === 'Enter') {
                const users = getUsers();
                if (users.length > 0) loginUser(users[0]);
            }
            return;
        }

        // Si hay una app abierta, dejar cerrar con Escape
        if (currentAppOpen) {
            if (e.key === 'Escape') closeAppModal();
            return;
        }

        items = document.querySelectorAll('.xmb-item');

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
            const activeItem = items[currentIndex];
            const appType = activeItem.getAttribute('data-app');
            
            if (appType === 'custom-game') {
                openApp('custom-game', activeItem.getAttribute('data-html'));
            } else {
                openApp(appType);
            }
        }
    });

    renderUsers();
});
