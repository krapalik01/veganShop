import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import VegetablesList from './components/VegetablesList';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

function App() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  function handleAddToCart(item: BasketItem) {
    setBasket((old) => {
      // Проверить, есть ли товар уже в корзине
      const found = old.find((el) => el.id === item.id);
      if (found) {
        // Обновить количество
        return old.map((el) =>
          el.id === item.id
            ? { ...el, count: Math.min(el.count + item.count, 99) }
            : el
        );
      } else {
        return [...old, item];
      }
    });
  }

  function handleChangeCount(id: string | number, count: number) {
    setBasket((basket) =>
      basket.map((el) => (el.id === id ? { ...el, count } : el))
    );
  }

  function handleRemove(id: string | number) {
    setBasket((basket) => basket.filter((el) => el.id !== id));
  }
  return (
    <>
      <MantineProvider>
        <Header
          basket={basket}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          onChangeCount={handleChangeCount}
          onRemove={handleRemove}
        />
        <VegetablesList onAddToCart={handleAddToCart} />
      </MantineProvider>
    </>
  );
}

export default App;
