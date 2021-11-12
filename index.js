import { groq } from "./lib.js"

let people = [
  {
    first: "John",
    last: "Lindquist",
    age: 40,
  },
  {
    first: "Ben",
    last: "Lindquist",
    age: 15,
  },
]

let query = await groq`
*[]
    {
        "name": first + " " + last,
        "group": select(
            age < 30 => "young",
            "old"
        )
    }
    {
        "sentence": name + " is " + group
    }.sentence
`

let result = await query(people)

console.log(result)
