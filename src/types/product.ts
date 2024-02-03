import { Categories, CategoryId } from "./category";
import { selector } from "recoil";

export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  key: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  key: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  categoryId: CategoryId[];
  categories: Categories[];
  description?: string;
  sale_price?: Sale;
  variants?: Variant[];
}
export interface HotCategory{
  id: number;
  name: string;
  image: string;
  products:Product[]
}