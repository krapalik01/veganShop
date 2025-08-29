import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import VegetableItem from '../components/VegetableItem';
import { MantineProvider } from '@mantine/core';

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

describe('VegetableItem component', () => {
  const mockOnAddToCart = vi.fn();

  const defaultProps = {
    id: 1,
    name: 'Brocolli - 1 Kg',
    price: 20,
    image: 'brocolli.jpg',
    onAddToCart: mockOnAddToCart,
  };

  beforeEach(() => {
    mockOnAddToCart.mockClear();
    render(
      <MantineProvider theme={{}}>
        <VegetableItem {...defaultProps} />
      </MantineProvider>
    );
  });

  it('Проверяем, что имя разбилось и отображается в двух текстовых компонентах', () => {
    expect(screen.getByText('Brocolli')).toBeInTheDocument();
    expect(screen.getByText('1 Kg')).toBeInTheDocument();
  });

  it('отображение цены и фотки', () => {
    expect(screen.getByText('$ 20')).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    const mainImage = img[0];
    expect(mainImage).toHaveAttribute('src', 'brocolli.jpg');
  });

  it('initial count is 1 and decrement button disabled', () => {
    expect(screen.getByText('1')).toBeInTheDocument();
    const decrementButton = screen.getByRole('button', { name: /minus/i });
    expect(decrementButton).toBeDisabled();
  });

  it('increments and decrements count correctly', () => {
    const decrementButton = screen.getByRole('button', { name: /minus/i });
    const incrementButton = screen.getByRole('button', { name: /plus/i });
    const countText = screen.getByText('1');

    // Удостоверимся, что начально 1
    expect(countText).toHaveTextContent('1');

    // Увеличиваем счетчик
    fireEvent.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(decrementButton).not.toBeDisabled();

    // Уменьшаем счетчик
    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(decrementButton).toBeDisabled();
  });

  it('adds correct item data to cart on button click', () => {
    const incrementButton = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(incrementButton); // count = 2

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith({
      id: defaultProps.id,
      name: defaultProps.name,
      price: defaultProps.price,
      image: defaultProps.image,
      count: 2,
    });
  });
});
