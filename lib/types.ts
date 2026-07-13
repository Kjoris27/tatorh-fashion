export type ProductCategory = "soiree" | "ensemble" | "traditionnel" | "autre";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number;
  sizes: string[];
  colors: string[];
  is_new: boolean;
  in_stock: boolean;
  images: string[];
  video_url: string | null;
  created_at?: string;
};

export type SelectionItem = {
  product_id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export type OrderStatus = "en_attente" | "confirmee" | "livree" | "annulee";

export type Order = {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_city?: string | null;
  items: SelectionItem[];
  total: number;
  status: OrderStatus;
  created_at: string;
};
