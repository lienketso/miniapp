export type CategoryId =
  | "52"
  | "60"
  | "63"
  | "77"
  | "91"
  | "92"
  | "93"
  | "94";

  export type Categories =
  | 52
  | 60
  | 63
  | 77
  | 91
  | 92
  | 93
  | 94;

export interface Category {
  id: number;
  name: string;
  icon: string;
  image: string;
}
