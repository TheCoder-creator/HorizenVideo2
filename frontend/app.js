const API = "/api/home";

async function load() {
  const container = document.getElementById("videos");
  container.innerHTML = "<p>Loading...</p>";

  const res = await fetch(API);
  const data = await res.json();

  container.innerHTML = "";

  data.videos.forEach(v => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${v.thumbnail}">
      <div class="info">
        <b>${v.title}</b>
        <div class="small">${new Date(v.published).toDateString()}</div>
      </div>
    `;

    div.onclick = () => openVideo(v.videoId);

    container.appendChild(div);
  });
}

function openVideo(id) {
  const player = document.getElementById("player");
  const frame = document.getElementById("frame");

  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  player.style.display = "flex";
}

function closePlayer() {
  document.getElementById("player").style.display = "none";
  document.getElementById("frame").src = "";
}

load();
