import {
  Button,
  Text,
  Image,
  Flex,
  Badge,
  Card,
  Divider,
  MantineProvider,
} from '@mantine/core';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

interface HeaderProps {
  basket: BasketItem[];
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeCount: (id: string | number, count: number) => void;
  onRemove: (id: string | number) => void;
}
function Header({
  basket,
  cartOpen,
  setCartOpen,
  onChangeCount,
  onRemove,
}: HeaderProps) {
  const total = basket.reduce((sum, item) => sum + item.price * item.count, 0);
  const countItem = basket.reduce((count, item) => count + item.count, 0);

  return (
    <>
      <MantineProvider>
        <header className="header">
          <div className="header_logo"></div>
          <Button
            mt={7}
            mr={20}
            onClick={() => setCartOpen((o) => !o)}
            color="#54B46A"
            w={144}
            h={44}
            radius={8}
          >
            <Flex wrap="nowrap" gap={16} align="center">
              {countItem >= 1 && (
                <Badge
                  w={20}
                  h={20}
                  color="white"
                  styles={{ root: { padding: 0, color: '#000' } }}
                >
                  {countItem}
                </Badge>
              )}
              <Text>Cart</Text>
              <Image h={20} w={20} src="Icon.svg" />
            </Flex>
          </Button>
        </header>

        {cartOpen && (
          <Card
            style={{
              position: 'fixed',
              top: 70,
              right: 20,
              width: 320,
              zIndex: 1500,
            }}
          >
            {basket.length === 0 ? (
              <Flex align="center" direction="column" p={24} gap={24}>
                <Image w={118} h={107} src="cartEmpty.svg" />
                <Text c="dimmed">You cart is empty!</Text>
              </Flex>
            ) : (
              <>
                {basket.map((item, index) => (
                  <>
                    <Flex key={item.id} align="center">
                      <Image src={item.image} h={64} w={64} radius={8} />
                      <Flex direction="column" ml={10}>
                        <Text fw={500}>{item.name}</Text>
                        <Text c="dimmed" fz="sm">
                          {item.price} за 1 кг
                        </Text>
                      </Flex>
                      <Flex ml="auto" align="center" gap={4}>
                        <Button
                          aria-label="minus"
                          onClick={() =>
                            onChangeCount(item.id, Math.max(item.count - 1, 1))
                          }
                          w={30}
                          h={30}
                          color="#CED4DA"
                          styles={{
                            root: {
                              padding: 0,
                            },
                          }}
                          disabled={item.count <= 1}
                        >
                          <Image src="minus.svg" />
                        </Button>
                        <Text>{item.count}</Text>
                        <Button
                          aria-label="plus"
                          onClick={() =>
                            onChangeCount(item.id, Math.min(item.count + 1, 99))
                          }
                          w={30}
                          h={30}
                          color="#CED4DA"
                          styles={{
                            root: {
                              padding: 0,
                            },
                          }}
                          disabled={item.count >= 99}
                        >
                          <Image src="plus.svg" />
                        </Button>
                      </Flex>
                      <Button
                        aria-label="remove"
                        color="red"
                        onClick={() => onRemove(item.id)}
                        ml={5}
                        w={24}
                        h={24}
                        styles={{
                          root: {
                            padding: 0,
                          },
                        }}
                      >
                        ×
                      </Button>
                      {index < basket.length - 1 && (
                        <Divider color="#E9ECEF" my={1} />
                      )}
                    </Flex>
                    {index < basket.length - 1 && (
                      <Divider
                        style={{ marginLeft: 42 }}
                        color="#E9ECEF"
                        my={2}
                      />
                    )}
                  </>
                ))}
                <Divider color="#E9ECEF" my={8} />
                <Flex justify="space-between">
                  <Text fw={500}>Total</Text>
                  <Text fw={700}>${total}</Text>
                </Flex>
              </>
            )}
          </Card>
        )}
      </MantineProvider>
    </>
  );
}

export default Header;
