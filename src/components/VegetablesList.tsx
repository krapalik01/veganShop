import { useState, useEffect } from 'react';
import getVegetables from '../getVegetables';
import VegetableItem from './VegetableItem';
import LoadingVegetableItem from './LoadingVegetableItem';
import { Flex, Group, Title, MantineProvider } from '@mantine/core';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

interface VegetablesListProps {
  onAddToCart: (item: BasketItem) => void;
}

function VegetablesList({ onAddToCart }: VegetablesListProps) {
  const [vegetables, setVegetables] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // для того чтобы проверить загрузочные карточки
        const data = await getVegetables();
        setVegetables(data);
      } catch (err: any) {
        setError(err.message || 'неИзвестная оошибка');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <MantineProvider>
          <Group mr={80} ml={80}>
            <Title mt={100}> Catalog </Title>
            <Flex wrap="wrap" rowGap={28} columnGap={24}>
              {[...Array(30)].map((_, index) => (
                <LoadingVegetableItem key={index} />
              ))}
            </Flex>
          </Group>
        </MantineProvider>
      </>
    );
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <MantineProvider>
        <Group mr={80} ml={80}>
          <Title mt={100}> Catalog </Title>
          <Flex wrap="wrap" rowGap={28} columnGap={24}>
            {vegetables.map((veg) => (
              <VegetableItem
                key={veg.id}
                id={veg.id}
                name={veg.name}
                price={veg.price}
                image={veg.image}
                onAddToCart={onAddToCart}
              />
            ))}
          </Flex>
        </Group>
      </MantineProvider>
    </>
  );
}

export default VegetablesList;
