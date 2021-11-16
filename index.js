import { groq } from "./lib.js"
import fs from "fs-extra"

let pokedex = await fs.readJson("./pokedex.json")

let query = await groq`
*[!(num in *[].next_evolution[].num)]
[0..5]
{
    name,   
    height, 
    "evolutions": *[
        num in ^.next_evolution[].num
    ]{
        name,
        height
    }
}
`

let result = await query(pokedex)

console.log(result)
