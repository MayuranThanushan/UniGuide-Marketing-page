// proxy.js (Vercel API proxy endpoint)
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the incoming JSON request body
      const { email } = req.body;

      // Check if the email is provided
      if (!email) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is missing'
        });
      }

      // Call Google Apps Script Web App using fetch
      const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbwUPF2oKp-qbx7OMhvQTDWqYxeg9z0QX0wKLfu_vKgCQmAKyUkIG0_QG5De6BLEDoxQ/exec';
      
      const googleResponse = await fetch(googleAppsScriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await googleResponse.json();

      // Return the response from Google Apps Script
      res.status(googleResponse.status).json(data);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error: ' + error.message
      });
    }
  } else {
    res.status(405).json({
      status: 'error',
      message: 'Method Not Allowed'
    });
  }
}
