exports.handler = async function () {
  const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured. Add FOOTBALL_DATA_API_KEY to Netlify environment variables.' }),
    };
  }

  try {
    const stages = [
      'ROUND_OF_32', 'ROUND_OF_16', 'QUARTER_FINALS',
      'SEMI_FINALS', 'THIRD_PLACE', 'FINAL',
    ].join(',');

    const res = await fetch(
      `https://api.football-data.org/v4/competitions/WC/matches?stage=${stages}`,
      { headers: { 'X-Auth-Token': API_KEY } }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: err.message || `football-data.org returned ${res.status}` }),
      };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
