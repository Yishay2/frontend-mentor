import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "./cartSlice";
import CartItem from "./CartItem";
import ConfirmationOrder from "./ConfirmationOrder";

export default function Cart() {
  const cart = useAppSelector(selectCart);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let price = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(price)
  }, [cart]);

  return (
    <div className="w-full md:w-1/3 flex flex-col p-8 gap-4 bg-white h-1/2">
      <h1 className="text-2xl font-bold text-red">{`Your cart (${cart.length})`}</h1>
      <div className="flex flex-col gap-4 items-center">
        {cart.length ? cart.map(item => (
          <CartItem key={item.name} item={item} />
        )) : (
          <div className="h-full flex jutify-center items-center flex-col gap-4 pt-12">
            <img src="/assets/images/illustration-empty-cart.svg" className="h-32 w-32" alt="empty cart" />
            <p className="text-rose-500">Your added items will apper here</p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between pt-4">
              <p className="text-rose-500 font-semibold text-lg">Order Total</p>
              <h2 className="font-bold text-4xl">${totalPrice}</h2>
            </div>
            <div className="flex justify-center items-center bg-rose-50 h-14 rounded-lg">
              <img src="/assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutral" />
              <p>This is a <span className="font-bold">carbon-neutral</span> delivery</p>
            </div>
            <button
              className="rounded-4xl text-rose-100 shadow-rose-400 w-full py-4 bg-red text-lg font-semibold pointer hover:bg-rose-400"
              onClick={() => setOpen(true)}>Confirm Order</button>
          </div>
        )}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <ConfirmationOrder cart={cart} totalPrice={totalPrice} setOpen={setOpen} />
          </div>
        )}
      </div>
    </div >
  )
}
