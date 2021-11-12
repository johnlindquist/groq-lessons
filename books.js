import { parse, evaluate } from "groq-js"

let groq = async ([query]) => {
  let tree = parse(query)
  return async data => {
    let key = Array.isArray(data) ? "dataset" : "root"
    let result = await evaluate(tree, {
      [key]: data,
    })
    return await result.get()
  }
}

let books = [
  {
    id: 1111,
    name: "Way of Kings",
  },
  {
    id: 2222,
    name: "Starsight",
  },
]

let authors = [
  { name: "Brandon Sanderson", books: [1111, 2222] },
]
let library = { books, authors }

// GROQ
let query = await groq`authors[]{
  name,
  "books": ^.books[id in ^.books][].name
}`
let query = await groq`books`
let result = await query(library)
console.log(result)
// // JS
// let jsResult = pokedex
//   .filter(item => item?.weaknesses.includes("Ice"))
//   .map(item => item?.name)

// let equal = result
//   .map(
//     (item, i) =>
//       JSON.stringify(item) === JSON.stringify(jsResult[i])
//   )
//   .every(Boolean)

// let g = async ([s]) => {
//   let query = await groq([s])
//   let result = await query(pokedex)
//   return result
// }

// console.log({ equal })

// console.log(jsResult)
// console.log(result)
