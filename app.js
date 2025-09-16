#!/usr/bin/env node

const https = require('https');

const args = process.argv.slice(2);
const username = args[0];

if (!username) {
  console.log('Please provide github username');
  process.exit(1);
}

function fetchUserActivity(username) {
  console.log(`Fetching GitHub activity for ${username}...`);

  const apiUrl = `https://api.github.com/users/${username}/events`;
  const urlParts = new URL(apiUrl);

  const requestOptions = {
    hostname: urlParts.hostname,
    path: urlParts.pathname,
    method: 'GET',
    headers: {
      'User-Agent': 'GitHub-Activity-CLI/1.0.0',
      Accept: 'application/vnd.github.v3+json',
    },
  };

  if (process.env.GITHUB_TOKEN) {
    requestOptions.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const request = https.request(requestOptions, (response) => {
    let responseData = '';

    response.on('data', (chunk) => {
      responseData += chunk;
    });

    response.on('end', () => {
      console.log(responseData);
    });
  });

  request.on('error', (error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });

  request.end();
}

fetchUserActivity(username);
