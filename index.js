import fs, { readJson } from 'fs-extra';
import { parse, evaluate } from 'groq-js';

let groq = function ([query]) {
  let tree = parse(query);
  return async function (dataset) {
    let result = await evaluate(tree, { dataset });
    return await result.get();
  };
};

let pokedex = await readJson('./pokedex.json');
let query = await groq`*[]`;

let result = await query(data);

console.log(result);
