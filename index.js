import fs from "fs-extra"
import { parse, evaluate } from "groq-js"

let groq = async ([query]) => {
  let tree = parse(query)
  return async dataset => {
    let result = await evaluate(tree, { dataset })
    return await result.get()
  }
}

let pokedex = await fs.readJson("./pokedex.json")

// GROQ
let query = await groq`*["Ice" in weaknesses][].name`
let result = await query(pokedex)

// JS
let jsResult = pokedex
  .filter(item => item?.weaknesses.includes("Ice"))
  .map(item => item?.name)

let equal = result
  .map(
    (item, i) =>
      JSON.stringify(item) === JSON.stringify(jsResult[i])
  )
  .every(Boolean)

let g = async ([s]) => {
  let query = await groq([s])
  let result = await query(pokedex)
  return result
}

console.log({ equal })

// console.log(jsResult)
// console.log(result)
