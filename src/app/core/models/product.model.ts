export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number; // <- não é objeto, é number
  stock: number;
  brand: string;
  category: string;
  thumbnail: string; // <- imagem principal
  image: string[]; // <- várias imagens
}
