import { Translations } from "@/app/translations";
import "./globals.css";

export function round(value: number, decimals: number) {
  const tens = Math.pow(10, decimals);

  return Math.round(value * tens) / tens;
}

export function getProperty<T>(instance: T, property: string): any {
  return instance[property as keyof T];
}

function resolvePropertyHelper(entry: any, props: string[]) {
  if (props.length == 0) return entry;

  if (entry == null) return "";

  return resolvePropertyHelper(entry[props[0]], props.slice(1));
}

export function resolveProperty(entry: any, column: string) {
  return resolvePropertyHelper(entry, column.split("."));
}

export function translate(property: string): string {
  return resolveProperty(Translations, property);
}

export function zip<T1, T2>(
  items1: T1[],
  items2: T2[]
): { item1: T1; item2: T2 }[] {
  if (items1.length === 0 || items2.length === 0) return [];

  return [{ item1: items1[0], item2: items2[0] }].concat(
    zip(items1.slice(1), items2.slice(1))
  );
}

export function removeDuplicates<T>(
  items: T[],
  keySelector: (item: T) => any
): T[] {
  return items.filter(
    (i, idx) =>
      items.findIndex((i_) => keySelector(i) === keySelector(i_)) === idx
  );
}

export function displayHeight(height: string) {
  if (height == null) return "";

  const split = height.split("-");

  return `${split[0]}'${split[1]}''`;
}
