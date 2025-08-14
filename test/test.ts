import { Client, decodeResponseBody, saveSimulationToFile, buildSimulation, ResponseData, RequestMatcher } from "@bwilczek/hoverfly-client"
import * as fs from 'fs'

const client = new Client("http://127.0.0.1:8888")
let sim = await client.getSimulation()
console.log(decodeResponseBody(sim.data.pairs[0]!.response))
// saveSimulationToFile(sim, 'simulation.json')

const payload = JSON.parse(fs.readFileSync('payload.json', 'utf-8'))
payload.stargazers_count = 1266

const request: RequestMatcher = {
  path: [{ matcher: 'exact', value: '/repos/bwilczek/hoverfly-client-node' }],
  destination: [{ matcher: 'exact', value: 'api.github.com' }],
}

const response: ResponseData = {
    status: 200,
    body: JSON.stringify(payload),
    encodedBody: false,
    templated: false
}

const pair = { request: request, response: response }

sim = buildSimulation([pair])

client.uploadSimulation(sim)
await client.setMode({mode: 'simulate'})
