import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, beforeAll } from 'vitest';
import VegetablesList from '../components/VegetablesList';
import * as api from '../getVegetables';

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

vi.mock('../getVegetables', () => ({
  default: vi.fn(),
}));

describe('VegetablesList component', () => {
  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Проверка на бесконечный Loader при загрузке данных', () => {
    // Мокаем getVegetables, чтобы промис не резолвился — загрузка висит
    (api.default as any).mockImplementation(() => new Promise(() => {}));

    render(<VegetablesList onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    // Проверяем, что отображается 30 загрузочных карточек
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(30);
  });
});
