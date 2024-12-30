// objeto entregado por la API
export interface IBaseItem {
  name: string;
  url: string;
}

// pokemon seleccionado por el usuario
export interface IPokemon extends IBaseItem {
  id: number;
  isSelected?: boolean;
}

// interfaz que se usara para guardar en la store los pokemones seleccionados
export interface ISelectedPokemon {
  id: number;
  name: string;
}

// stats del pokemon
export interface IStat {
  base_stat: number;
  effort: number;
  stat: IBaseItem
}

export interface IType {
  slot: number;
  type: IBaseItem;
}

// Sonido del pokemon
export interface ICries {
  latest: string;
  legacy: string;
}

// detalle del pokemon seleccionado
export interface IPokemonDetail {
  id: number;
  name: string;
  types: IType[];
  stats: IStat[];
  cries: ICries;
  height: number;
  weight: number;
  species: IBaseItem;
}

export interface IFlavorTextEntry {
  flavor_text: string;
  language: IBaseItem;
}
