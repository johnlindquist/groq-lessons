import fs from 'fs-extra';
import { parse, evaluate } from 'groq-js';

let groq = async ([query]) => {
  let tree = parse(query);
  return async (dataset) => {
    let result = await evaluate(tree, { dataset });
    return await result.get();
  };
};

let pokedex = await fs.readJson('./pokedex.json');
let query = await groq`*[]`;

let result = await query(pokedex);

console.log(result);
