
export type IPage = IItem[];

export interface IItem {
  number: string;
  name: string;
  random: number;
}

export interface IData {
  data: IItem[],
  total: number
}
