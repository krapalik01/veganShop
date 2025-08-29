import {
  MantineProvider,
  Card,
  Button,
  Flex,
  Image,
  Text,
  Group,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useState } from 'react';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

interface VegetableItemProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (item: BasketItem) => void;
}

function VegetableItem({
  id,
  name,
  price,
  image,
  onAddToCart,
}: VegetableItemProps) {
  const [count, setCount] = useState(1);
  const parts = name.split('-').map((part) => part.trim());

  function handlersDecrement() {
    setCount(count - 1);
  }
  function handlersIncrement() {
    setCount(count + 1);
  }

  return (
    <>
      <MantineProvider>
        <Card
          shadow="sm"
          padding="md"
          radius={24}
          style={{ width: 302, height: 414, gap: 16, padding: 16 }}
        >
          <Flex direction="column" wrap="nowrap" gap="16">
            <Image radius={8} h={256} w="auto" src={image} />
            <Flex justify="space-between">
              <Group>
                <Text>{parts[0]}</Text>
                <Text c="dimmed" fz="sm">
                  {parts[1]}
                </Text>
              </Group>
              <Group align="center">
                <Button
                  aria-label="minus"
                  w={30}
                  h={30}
                  color="#CED4DA"
                  onClick={handlersDecrement}
                  disabled={count <= 1}
                  styles={{
                    root: {
                      padding: 0, // чтобы не добавлялись внутренние отступы
                    },
                  }}
                >
                  <Image src="minus.svg" />
                </Button>
                <Text>{count}</Text>
                <Button
                  aria-label="plus"
                  w={30}
                  h={30}
                  color="#CED4DA"
                  onClick={handlersIncrement}
                  disabled={count >= 99}
                  styles={{
                    root: {
                      padding: 0, // чтобы не добавлялись внутренние отступы
                    },
                  }}
                >
                  <Image src="plus.svg" />
                </Button>
              </Group>
            </Flex>

            <Flex gap="12" wrap="nowrap" align="center">
              <Text fw={600}>$ {price}</Text>
              <Button
                onClick={() => onAddToCart({ id, name, price, image, count })}
                fullWidth
                color="#54B46A"
                w={204}
                h={44}
                radius={8}
              >
                <Group>
                  <Text>Add to cart</Text>
                  <Image h={20} w={20} src="Icon.svg" />
                </Group>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </MantineProvider>
    </>
  );
}

export default VegetableItem;
