import { groq } from "./lib.js"
import fs from "fs-extra"

let pokedex = await fs.readJson("./pokedex.json")

let query = await groq`
*[egg in ["5 km", "2 km"]]{
    "hatch": name + " hatches in " + egg
}.hatch
`

let result = await query(pokedex)

console.log(result)
