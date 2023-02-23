export interface IMenuItem {
  id?: string;
  title?: string;
  icon?: any;
  url?: string;
  children?: IMenuItem[];
}
