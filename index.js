import { groq } from "./lib.js"
import fs from "fs-extra"

let pokedex = await fs.readJson("./pokedex.json")

let query = await groq`
*[]
[0..4]
{
    id,
    name
}
`

let result = await query(pokedex)

console.log(result)
