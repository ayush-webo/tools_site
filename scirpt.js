
    const toolSearch = document.getElementById('toolSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    // 1. Live Search & Category Filter Logic
    function filterTools() {
        const searchTerm = toolSearch.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        toolCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const category = card.querySelector('.category').innerText;
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "flex";
                card.style.opacity = "1";
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
            }
        });
    }

    // 2. Search Input Event
    toolSearch.addEventListener('input', filterTools);

    // 3. Category Button Event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTools();
        });
    });

    // 4. "Favorite" Functionality (Saves to Browser)
    toolCards.forEach((card, index) => {
        // Create favorite button dynamically
        const favBtn = document.createElement('button');
        favBtn.innerHTML = '♥';
        favBtn.className = 'fav-btn';
        card.appendChild(favBtn);

        // Check if already favorited in localStorage
        if (localStorage.getItem(`fav-tool-${index}`) === 'true') {
            favBtn.classList.add('is-active');
        }

        favBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = favBtn.classList.toggle('is-active');
            localStorage.setItem(`fav-tool-${index}`, isActive);
        });
    });

