let imageIdCounter = 0;
let totalLikes = 0;

function createImageCard(imageUrl = null, title = null) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.dataset.id = imageIdCounter++;
    
    card.innerHTML = `
        <img src="${imageUrl || `https://picsum.photos/300/200?random=${Math.random()}`}" 
             alt="${title || 'Красивое фото'}" loading="lazy">
        <div class="card-content">
            <h3>${title || `Фото ${imageIdCounter}`}</h3>
            <div class="card-actions">
                <button class="like-btn" data-action="like">❤️ 0</button>
                <button class="delete-btn" data-action="delete">🗑️ Удалить</button>
            </div>
        </div>
    `;
    
    return card;
}

function addImageCard(imageUrl = null, title = null) {
    const gallery = document.getElementById('gallery');
    const card = createImageCard(imageUrl, title);
    gallery.appendChild(card);
}

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    
    gallery.addEventListener('click', function(event) {
        const target = event.target.closest('button');
        if (!target) return;
        
        const card = target.closest('.image-card');
        const cardId = card.dataset.id;
        
        if (target.dataset.action === 'like') {
            const likeBtn = target;
            const match = likeBtn.textContent.match(/(\d+)/);
            const currentLikes = match ? parseInt(match[1]) : 0;
            
            if (likeBtn.classList.contains('liked')) {
                likeBtn.textContent = `❤️ ${currentLikes - 1}`;
                likeBtn.classList.remove('liked');
                totalLikes--;
            } else {
                likeBtn.textContent = `❤️ ${currentLikes + 1}`;
                likeBtn.classList.add('liked');
                totalLikes++;
            }
            
            document.getElementById('total-likes').textContent = totalLikes;
        }
        
        if (target.dataset.action === 'delete') {
            card.remove();
        }
    });
    
    document.getElementById('add-image-btn').addEventListener('click', function() {
        const title = prompt('Название фото:') || `Фото ${imageIdCounter + 1}`;
        const url = prompt('URL изображения (или Enter для случайного):') || null;
        addImageCard(url, title);
    });
});