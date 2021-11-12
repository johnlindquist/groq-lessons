import fs from "fs-extra"
import { groq } from "./lib.js"

let pokedex = await fs.readJson("./pokedex.json")

let query = await groq`
*[]
`

let result = await query(pokedex)

console.log(result)
