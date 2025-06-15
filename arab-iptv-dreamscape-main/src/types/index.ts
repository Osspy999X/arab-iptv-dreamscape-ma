
export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  url: string;
  language: string;
  country: string;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
