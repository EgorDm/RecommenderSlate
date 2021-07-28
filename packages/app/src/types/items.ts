export type URL = string;
export type Image = URL;

export interface Result {
  id: number,
  title: string,
  image: Image,
  url?: string,
}
