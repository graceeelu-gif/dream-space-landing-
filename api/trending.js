// Vercel Serverless Function — fetches the most viral @housinginfo posts from the last 30 days
// Sorts by engagement (likes + comments) and returns image URLs for the carousel

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(200).json({ posts: [], source: 'no_token' });
  }

  try {
    // Step 1: Fetch recent media with engagement fields
    // We request more than we need so we can filter to last 30 days and sort
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,like_count,comments_count';
    const igResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=50&access_token=${accessToken}`
    );

    if (!igResponse.ok) {
      const errText = await igResponse.text();
      console.error('Instagram API error:', igResponse.status, errText);
      return res.status(200).json({ posts: [], source: 'api_error' });
    }

    const data = await igResponse.json();
    const allMedia = data.data || [];

    // Step 2: Filter to last 30 days and images only
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentImages = allMedia.filter((item) => {
      const isImage = item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM';
      const isRecent = new Date(item.timestamp) >= thirtyDaysAgo;
      return isImage && isRecent;
    });

    // Step 3: Sort by engagement (likes + comments), highest first
    recentImages.sort((a, b) => {
      const engA = (a.like_count || 0) + (a.comments_count || 0);
      const engB = (b.like_count || 0) + (b.comments_count || 0);
      return engB - engA;
    });

    // Step 4: Return top 15
    const topPosts = recentImages.slice(0, 15).map((item) => ({
      id: item.id,
      imageUrl: item.media_url,
      permalink: item.permalink,
      caption: (item.caption || '').slice(0, 120),
      likes: item.like_count || 0,
      comments: item.comments_count || 0,
      timestamp: item.timestamp,
    }));

    return res.status(200).json({
      posts: topPosts,
      source: 'instagram',
      updated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Trending API error:', error);
    return res.status(200).json({ posts: [], source: 'error' });
  }
}
