import { create } from "zustand";
import { persist } from "zustand/middleware";
import compare from "just-compare";

interface CartItemType {
  id: string;
  title: string;
  img: string;
  price: number;
  optionalTitle?: string;
  quantity: number;
}

interface ProductState {
  carrito: CartItemType[];
  totalItems: number;
  setTotalItems: () => void;
  totalPrice: number;
  setTotalPrice: () => void;
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
}

const sumQuantity = (accumulator: number, item: CartItemType) =>
  accumulator + item.quantity;

const sumPrice = (accumulator: number, item: CartItemType) =>
  accumulator + item.price;

export const useCarritoStore = create(
  persist<ProductState>(
    (set, get) => ({
      carrito: [],
      totalItems: 0,
      setTotalItems: () => {
        set(() => ({
          totalItems: get().carrito.reduce(sumQuantity, 0),
        }));
      },
      totalPrice: 0,
      setTotalPrice: () => {
        set(() => ({
          totalPrice: get().carrito.reduce(sumPrice, 0),
        }));
      },
      addToCart: (product) => {
        const findProduct = get().carrito.find(
          (prod) =>
            prod.id === product.id &&
            prod.optionalTitle === product.optionalTitle,
        );
        if (findProduct) {
          set((state) => ({
            carrito: state.carrito.map((item) => {
              if (
                item.id === findProduct.id &&
                item.optionalTitle === findProduct.optionalTitle
              ) {
                return {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                };
              }
              return item;
            }),
          }));
        } else {
          set((state) => ({
            carrito: [...state.carrito, product],
          }));
        }
        get().setTotalPrice();
        get().setTotalItems();
      },
      removeFromCart: (product) => {
        set(() => ({
          carrito: get().carrito.filter((prod) => !compare(prod, product)),
        }));
        get().setTotalPrice();
        get().setTotalItems();
      },
    }),
    { name: "cart", skipHydration: true },
  ),
);
