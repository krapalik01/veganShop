interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default async function getVegetables(): Promise<Product[]> {
  const response = await fetch(
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
  );
  if (!response.ok) {
    throw new Error('Ошибка загрузки овощей');
  }
  const data: Product[] = await response.json();
  return data;
}
