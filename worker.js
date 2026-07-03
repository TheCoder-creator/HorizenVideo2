export default {
  async fetch(request) {
    const url = new URL(request.url);

    // API: /api/channel?id=CHANNEL_ID
    if (url.pathname === "/api/channel") {
      const channelId = url.searchParams.get("id");

      if (!channelId) {
        return Response.json({
          error: "Missing channel id"
        }, {
          status: 400
        });
      }

      try {
        const rss = await fetch(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
          {
            headers: {
              "User-Agent": "HorizenVideos"
            }
          }
        );

        if (!rss.ok) {
          return Response.json({
            error: "Unable to fetch RSS"
          }, {
            status: rss.status
          });
        }

        return new Response(await rss.text(), {
          headers: {
            "Content-Type": "application/xml",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=300"
          }
        });

      } catch (err) {
        return Response.json({
          error: err.message
        }, {
          status: 500
        });
      }
    }

    // Let Cloudflare serve frontend files
    return fetch(request);
  }
};
