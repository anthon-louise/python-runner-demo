const express = require('express');
const axios = require('axios');
const app = express();


app.use(express.json({ limit: '10kb' }));
app.use(express.static('public'));

app.post('/api/run-python', async (req, res) => {

  const { code } = req.body;

  if (!code || !code.trim()) return res.status(400).json({ error: 'Code is required' });

  if (code.length > 1500) return res.status(400).json({ error: 'Code too long' });
  
  if (/\b(import|from)\s+(os|subprocess|sys|socket|threading)\b/i.test(code)) {
    return res.status(403).json({ error: 'Unsafe imports blocked' });
  }

  try {
    const { data } = await axios.post('https://ce.judge0.com/submissions', {
      source_code: code,
      language_id: 71,
      stdin: ''
    }, {
      params: { base64_encoded: false, wait: true },
      timeout: 15000
    });

    res.json({
      success: data.status.id === 3,
      output: data.stdout || null,
      error: data.stderr || data.compile_output || null,
      status: data.status.description
    });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || 'Execution failed' });
  }
});


module.exports = app;


if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
}