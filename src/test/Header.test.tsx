import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import Header from '../components/Header';

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

describe('Header component', () => {
  const mockSetCartOpen = vi.fn();
  const mockOnChangeCount = vi.fn();
  const mockOnRemove = vi.fn();

  const basketSample = [
    { id: 1, name: 'Tomato', price: 10, image: 'tomato.jpg', count: 2 },
    { id: 2, name: 'Carrot', price: 15, image: 'carrot.jpg', count: 1 },
  ];

  beforeEach(() => {
    mockSetCartOpen.mockClear();
    mockOnChangeCount.mockClear();
    mockOnRemove.mockClear();
  });

  it('рендер корзины и кол-во овощей в ней', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={false}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('В открытой и пустой карзине должен быть текст, что она пустая', () => {
    render(
      <Header
        basket={[]}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByText(/You cart is empty!/i)).toBeInTheDocument();
  });

  it('перечисляет все товары в корзине с правильными данными', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('10 за 1 кг')).toBeInTheDocument();
    expect(screen.getByText('Carrot')).toBeInTheDocument();
    expect(screen.getByText('15 за 1 кг')).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('img')
        .some((img) => img.getAttribute('src') === 'tomato.jpg')
    ).toBe(true);
  });

  it('вызывает onChangeCount с увеличением счетчика при нажатии кнопки плюс', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    const plusButtons = screen.getAllByRole('button', { name: /plus/i });
    fireEvent.click(plusButtons[0]); // для первого товара
    expect(mockOnChangeCount).toHaveBeenCalledWith(1, 3); // увеличено с 2 до 3
  });

  it('вызывает onChangeCount с уменьшением счетчика при нажатии кнопки минус', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    const minusButtons = screen.getAllByRole('button', { name: /minus/i });
    fireEvent.click(minusButtons[0]);
    expect(mockOnChangeCount).toHaveBeenCalledWith(1, 1); // уменьшено с 2 до 1
  });

  it('Вызов onRemove при нажатии кнопки удаления', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it('Показать общею стоимость корзины', () => {
    render(
      <Header
        basket={basketSample}
        cartOpen={true}
        setCartOpen={mockSetCartOpen}
        onChangeCount={mockOnChangeCount}
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByText('$35')).toBeInTheDocument();
  });
});
