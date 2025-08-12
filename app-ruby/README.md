# GitHub Stars Checker (Ruby / Sinatra)

Minimal Sinatra app that fetches the star count for a hardcoded GitHub repo
and renders a simple HTML page with a message based on the number of stars.

## Requirements

- Ruby (2.7+ recommended)
- Bundler

## Setup

```bash
bundle install
```

## Run (development)

```bash
ruby app.rb -o 0.0.0.0 -p 4567
```

Or with Rack:

```bash
rackup -p 4567
```

Then open: http://localhost:4567

## Notes

- The GitHub API is rate-limited for unauthenticated requests (60 requests/hour per IP).
- To increase rate limits, you can add a GitHub token to the request headers in `app.rb`.
