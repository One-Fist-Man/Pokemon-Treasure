import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const getAllPokemonCards = async () => {
  const cards = await PokemonTCG.getAllSets();
  return cards;
};

export const getCardById = async (id: any) => {
  const cards = await PokemonTCG.findSetByID(id);
  return cards;
};
