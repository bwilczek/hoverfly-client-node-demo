require "sinatra"
require "faraday"
require "json"

REPO = "bwilczek/hoverfly-client-node"

get "/" do
  response = Faraday.get("https://api.github.com/repos/#{REPO}")
  if response.status != 200
    status response.status
    return "<h1>GitHub API error: #{response.status}</h1>"
  end

  data = JSON.parse(response.body)
  stars = data["stargazers_count"] || 0

  message =
    if stars < 10
      "this repo is not so popular"
    elsif stars < 100
      "this repo has some followers"
    else
      "this repo has some decent fan base"
    end

  <<~HTML
    <html>
      <head><title>GitHub Stars Checker</title></head>
      <body>
        <h1>#{REPO}</h1>
        <p>⭐ Stars: #{stars}</p>
        <p>#{message}</p>
      </body>
    </html>
  HTML
end
