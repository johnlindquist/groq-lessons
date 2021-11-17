import { groq } from "./lib.js"
import fs from "fs-extra"

let pokedex = await fs.readJson("./pokedex.json")

let query = await groq`
*[][0..3]{
    "matchup": *[
        count(
            weaknesses[@ in ^.^.type]
        ) > 0
    ]{
        "message": ^.name + " vs. " + name
    }[].message
}[].matchup[] | order(@)
`

let result = await query(pokedex)

console.log(result)
