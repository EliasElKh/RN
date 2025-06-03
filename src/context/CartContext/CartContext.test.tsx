import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { CartProvider, useCart } from './CartContext';
import { Text, Button } from 'react-native';
beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

const sampleProduct = { _id: '1', name: 'Test Product' };


const CartTestComponent = () => {
  const { cart, addToCart, removeFromCart, increment, decrement, clearCart } = useCart();
  return (
    <>
      <Text testID="cart-count">{cart.length}</Text>
      <Text testID="cart-qty">{cart[0]?.quantity ?? 0}</Text>
      <Button title="add" onPress={() => addToCart(sampleProduct)} />
      <Button title="remove" onPress={() => removeFromCart(sampleProduct._id)} />
      <Button title="inc" onPress={() => increment(sampleProduct._id)} />
      <Button title="dec" onPress={() => decrement(sampleProduct._id)} />
      <Button title="clear" onPress={clearCart} />
    </>
  );
};

describe('CartProvider', () => {
  it('starts with empty cart', () => {
    const { getByTestId } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );
    expect(getByTestId('cart-count').children[0]).toBe('0');
  });

  it('adds to cart and increments', () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    act(() => { fireEvent.press(getByText('add')); });
    expect(getByTestId('cart-count').children[0]).toBe('1');
    expect(getByTestId('cart-qty').children[0]).toBe('1');

    act(() => { fireEvent.press(getByText('inc')); });
    expect(getByTestId('cart-qty').children[0]).toBe('2');
  });

  it('decrements and does not go below 1', () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    act(() => { fireEvent.press(getByText('add')); });
    act(() => { fireEvent.press(getByText('inc')); });
    expect(getByTestId('cart-qty').children[0]).toBe('2');

    act(() => { fireEvent.press(getByText('dec')); });
    expect(getByTestId('cart-qty').children[0]).toBe('1');

    act(() => { fireEvent.press(getByText('dec')); });
    expect(getByTestId('cart-qty').children[0]).toBe('1');
  });

  it('removes from cart', () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );
    act(() => { fireEvent.press(getByText('add')); });
    expect(getByTestId('cart-count').children[0]).toBe('1');
    act(() => { fireEvent.press(getByText('remove')); });
    expect(getByTestId('cart-count').children[0]).toBe('0');
  });

  it('clears the cart', () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );
    act(() => { fireEvent.press(getByText('add')); });
    act(() => { fireEvent.press(getByText('add')); });
    expect(getByTestId('cart-count').children[0]).toBe('1');
    act(() => { fireEvent.press(getByText('clear')); });
    expect(getByTestId('cart-count').children[0]).toBe('0');
  });
});
