import express from "express";
import fetch from "node-fetch";

import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl = process.env.http_proxy || process.env.HTTP_PROXY;

const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

const app = express();
const PORT = 3000;

// Hardcoded repo
const REPO = "bwilczek/hoverfly-client-node";

app.get("/", async (_req, res) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}`, { agent });
    if (!response.ok) {
      res.status(response.status).send(`<h1>GitHub API error: ${response.statusText}</h1>`);
      return;
    }

    const data = await response.json();
    const stars: number = data.stargazers_count || 0;

    let message = "";
    if (stars < 10) {
      message = "this repo is not so popular";
    } else if (stars < 100) {
      message = "this repo has some followers";
    } else {
      message = "this repo has some decent fan base";
    }

    res.send(`
      <html>
        <head><title>GitHub Stars Checker</title></head>
        <body>
          <h1>🚅 ${REPO}</h1>
          <p>⭐ Stars: ${stars}</p>
          <p id="message">${message}</p>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`<h1>Error: ${(error as Error).message}</h1>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
