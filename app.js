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
      handleResponse(response.statusCode, responseData, username);
    });
  });

  request.on('error', (error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });

  request.end();
}

function handleResponse(statusCode, responseData, username) {
  if (statusCode === 404) {
    return console.log(`User "${username}" not found`);
  }
  if (statusCode !== 200) {
    return console.log(`Error: ${statusCode}`);
  }

  try {
    const events = JSON.parse(responseData);

    if (events.length === 0) {
      return console.log(`No recent public activity found for ${username}`);
    }

    console.log(`\nRecent activity for ${username}:`);
    console.log('-'.repeat(50));

    events.slice(0, 30).forEach((event, index) => {
      const repo = event.repo.name;
      const date = new Date(event.created_at).toLocaleDateString();
      const eventNumber = index + 1;

      switch (event.type) {
        case 'PushEvent':
          console.log(
            `${eventNumber}. Pushed ${event.payload.size} commits to ${repo} on ${date}`
          );
          break;

        case 'CreateEvent':
          const refType = event.payload.ref_type;
          const ref = event.payload.ref || event.repo.name.split('/')[1];
          console.log(`${eventNumber}. Created ${refType} ${ref} on ${date}`);
          break;

        case 'WatchEvent':
          console.log(`${eventNumber}. Starred ${repo} on ${date}`);
          break;

        case 'IssuesEvent':
          console.log(
            `${eventNumber}. ${event.payload.action} an issue in ${repo} on ${date}`
          );
          break;

        case 'ForkEvent':
          console.log(`${eventNumber}. Forked ${repo} on ${date}`);
          break;

        case 'PullRequestEvent':
          console.log(
            `${eventNumber}. ${event.payload.action} a pull request in ${repo} on ${date}`
          );
          break;

        case 'DeleteEvent':
          console.log(
            `${eventNumber}. Deleted ${event.payload.ref_type} in ${repo} on ${date}`
          );
          break;

        case 'ReleaseEvent':
          console.log(
            `${eventNumber}. Released ${event.payload.release.tag_name} in ${repo} on ${date}`
          );
          break;

        default:
          console.log(
            `${eventNumber}. ${event.type.replace(
              'Event',
              ''
            )} in ${repo} on ${date}`
          );
      }
    });
  } catch (error) {
    console.error('Error parsing response:', error.message);
  }
}

fetchUserActivity(username);
