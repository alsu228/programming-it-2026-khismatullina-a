const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const postsList = document.getElementById("postsList");
const postForm = document.getElementById("postForm");

let posts = [];

function showStatus(text, isError = false) {
  statusEl.innerHTML = text;
  if (isError) {
    statusEl.classList.add("error");
    statusEl.classList.remove("loader");
  } else if (text === "Загрузка...") {
    statusEl.classList.add("loader");
    statusEl.classList.remove("error");
  } else {
    statusEl.classList.remove("loader", "error");
  }
}

async function loadPosts() {
  showStatus("Загрузка...", false);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const data = await response.json();
    posts = data.slice(0, 10);
    renderPosts();
  } catch (err) {
    showStatus(
      `Не удалось загрузить посты: ${err.message} <button id="retryBtn">Повторить</button>`,
      true
    );
    document.getElementById("retryBtn").addEventListener("click", loadPosts);
  } finally {
    if (statusEl.classList.contains("loader")) {
      statusEl.classList.remove("loader");
    }
  }
}

function renderPosts() {
  if (!posts || posts.length === 0) {
    postsList.innerHTML = "<p>Постов пока нет</p>";
    return;
  }

  postsList.innerHTML = posts
    .map(
      (post) => `
      <div class="post-card" data-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="delete-btn" data-id="${post.id}">Удалить</button>
      </div>
    `
    )
    .join("");
}
searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderPosts();  
    return;
  }

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    postsList.innerHTML = "<p>Не найдено постов по этому запросу</p>";
  } else {
    postsList.innerHTML = filtered
      .map(
        (post) => `
        <div class="post-card" data-id="${post.id}">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <button class="delete-btn" data-id="${post.id}">Удалить</button>
        </div>
      `
      )
      .join("");
  }
});
postsList.addEventListener("click", async function (e) {
  if (!e.target.matches(".delete-btn")) return;

  const postId = Number(e.target.dataset.id);
  const postCard = e.target.closest(".post-card");

  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка удаления: ${response.status}`);
        }
        posts = posts.filter((p) => p.id !== postId);
        postCard.remove();
      })
      .then(() => {
        if (posts.length === 0) {
          postsList.innerHTML = "<p>Постов пока нет</p>";
        }
      });
  } catch (err) {
    alert(`Ошибка при удалении: ${err.message}`);
  }
});
postForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();

  if (!title || !body) return;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка добавления: ${response.status}`);
    }

    const newPost = await response.json();
    posts.unshift(newPost);
    renderPosts();

     
    postForm.reset();
  } catch (err) {
    alert(`Ошибка при добавлении поста: ${err.message}`);
  }
});
document.addEventListener("DOMContentLoaded", loadPosts);















