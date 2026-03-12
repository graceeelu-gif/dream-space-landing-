// Stripe webhook → PostHog purchase tracking
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let event;
  try {
    event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const postId = session.client_reference_id || 'unknown';
    const amount = session.amount_total ? session.amount_total / 100 : null;
    const currency = session.currency || 'usd';
    const customerId = session.customer || session.id;

    // Send to PostHog
    await fetch('https://us.i.posthog.com/capture/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'phc_bMApsOmHPJstTt5gvvm7XEwMFs3KDYlttZQ44j6LMCN',
        event: 'purchase_completed',
        distinct_id: customerId,
        properties: {
          post_id: postId,
          amount_usd: amount,
          currency: currency,
          stripe_session_id: session.id,
          source: 'stripe_webhook'
        }
      })
    });

    console.log(`Purchase logged: ${postId} - $${amount}`);
  }

  res.status(200).json({ received: true });
}
