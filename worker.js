export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API endpoint
    if (url.pathname === "/api/home") {
      const channels = [
        "UCFAiFyGs6oDiF1Nf-rRJpZA", // Technoblade example
        "UCX6OQ3DkcsbYNE6H8uQQuVA"  // MrBeast example
      ];

      const videos = [];

      for (const id of channels) {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
        const res = await fetch(feedUrl);
        const text = await res.text();

        const items = [...text.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

        for (const item of items.slice(0, 3)) {
          const block = item[1];

          const title = block.match(/<title>(.*?)<\/title>/)?.[1] || "Untitled";
          const videoId = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
          const published = block.match(/<published>(.*?)<\/published>/)?.[1];
          const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

          videos.push({
            title,
            videoId,
            published,
            thumbnail,
            channel: id
          });
        }
      }

      return Response.json({ videos });
    }

    return new Response("HorizonVideos Worker Running", { status: 200 });
  }
};
