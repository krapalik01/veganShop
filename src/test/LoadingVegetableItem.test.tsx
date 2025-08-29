import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingVegetableItem from '../components/LoadingVegetableItem';

// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('LoadingVegetableItem component', () => {

it('Проверка на рендер лоадера', () => {
  render(<LoadingVegetableItem/>)
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'loader.svg')
})

  
});
