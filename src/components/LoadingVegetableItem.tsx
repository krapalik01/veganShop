import { MantineProvider, Card, Flex, Image } from '@mantine/core';
import '@mantine/core/styles.css';

function LoadingVegetableItem() {
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
            <Image radius={8} h={276} w={276} src="loader.svg" />
          </Flex>
        </Card>
      </MantineProvider>
    </>
  );
}

export default LoadingVegetableItem;
