```sh

# SETUP

# env vars
export http_proxy=http://127.0.0.1:8500
export https_proxy=http://127.0.0.1:8500
export no_proxy=127.0.0.1,localhost

### EXERCISE ONE : curl

# prune simulation
curl -XDELETE http://localhost:8888/api/v2/simulation

# change mode
curl -X PUT -H "Content-Type: application/json" -d '{"mode": "capture"}' http://localhost:8888/api/v2/hoverfly/mode

# perform a recorded request
curl https://httpbingo.org/status/418

# fetch recorded simulation
curl http://localhost:8888/api/v2/simulation > teapot.json

# change mode
curl -X PUT -H "Content-Type: application/json" -d '{"mode": "simulate"}' http://localhost:8888/api/v2/hoverfly/mode

# edit teapot.json

# upload simulation
curl -X PUT -H "Content-Type: application/json" -d @teapot.json http://localhost:8888/api/v2/simulation

# perform the stubbed request
curl https://httpbingo.org/status/418

#### EXERCISE TWO : dealing with real apps

# The request that the apps execute:
http_proxy= https_proxy= no_proxy= curl -s https://api.github.com/repos/bwilczek/hoverfly-client-node

# Start the stack
compose up

# prune simulation, set mode to capture
curl -XDELETE http://localhost:8888/api/v2/simulation
curl -X PUT -H "Content-Type: application/json" -d '{"mode": "capture"}' http://localhost:8888/api/v2/hoverfly/mode

# visit the app under test, let the request to GitHub be recorded

# fetch recorded simulation
curl http://localhost:8888/api/v2/simulation > github.json

# examine it, see the encoded body
```

Now entering TypeScript, see `test.ts`
