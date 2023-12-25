import { QueryKeys } from "@/enums/enums";
import { getAllPokemonCards, getCardById } from "@/service/NetworkCalls";
import { useQuery } from "@tanstack/react-query";

export const useSets = () => {
  return useQuery({
    queryKey: [QueryKeys.Sets],
    queryFn: async () => {
      const sets = await getAllPokemonCards();
      return sets;
    },
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useSetsByID = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.Set],
    queryFn: async () => {
      const set = await getCardById(id);
      return set;
    },
    enabled: id != undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
