import { groq } from "./lib.js"

let people = [
  {
    first: "John",
    last: "Lindquist",
  },
  {
    first: "Mindy",
    last: "Lindquist",
  },
]

let query = await groq`
*[last == "Lindquist"].first
`

let result = await query(people)

console.log(result)
