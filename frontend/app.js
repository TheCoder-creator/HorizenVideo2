const CHANNEL_ID = "UCFAiFyGs6oDiF1Nf-rRJpZA";

async function load() {
    const container = document.getElementById("videos");

    container.innerHTML = `
        <div class="loading">
            Loading videos...
        </div>
    `;

    try {
        const response = await fetch(`/api/channel?id=${CHANNEL_ID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch feed");
        }

        const xml = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");

        const entries = [...doc.getElementsByTagName("entry")];

        container.innerHTML = "";

        entries.forEach(entry => {

            const title =
                entry.getElementsByTagName("title")[0]?.textContent ??
                "Untitled";

            const videoId =
                entry.getElementsByTagName("yt:videoId")[0]?.textContent ??
                "";

            const published =
                entry.getElementsByTagName("published")[0]?.textContent ??
                "";

            const author =
                entry.getElementsByTagName("name")[0]?.textContent ??
                "Unknown";

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg">
                </a>

                <div class="info">
                    <h3>${title}</h3>

                    <div class="small">
                        ${author}
                    </div>

                    <div class="small">
                        ${new Date(published).toLocaleDateString()}
                    </div>
                </div>
            `;

            container.appendChild(card);

        });

        if (entries.length === 0) {
            container.innerHTML = `
                <p>No videos found.</p>
            `;
        }

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <p>Unable to load videos.</p>
        `;
    }
}

load();
