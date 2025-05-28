import type { CartItem } from "./cartSlice";
import { useAppDispatch } from "../../app/hooks";
import { clearCart } from './cartSlice'

interface ConfirmationProps {
    cart: CartItem[]
    totalPrice: number,
    setOpen: (arg: boolean) => void
}

export default function ConfirmationOrder({ cart, totalPrice, setOpen }: ConfirmationProps) {

    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col p-5 gap-4 bg-white rounded-lg">
            <img src="assets/images/icon-order-confirmed.svg" alt="" className="h-7 w-7"/>
            <h2 className="text-3xl font-bold">Order Confirmed</h2>
            <p className="text-rose-300">We hope you enjoy your food!</p>
            <div className="bg-rose-50 p-4 gap-4">
                {cart.length > 1 && (
                    cart.map(item => (
                        <div key={item.name} className="mb-1">
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <img src={item.image.thumbnail} alt="image" className="h-12 w-12 rounded" />
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-rose-400"><span className="text-red font-bold pr-2">{item.quantity}X </span><span className="text-rose-400">  @ </span>${item.price}</p>
                                    </div>
                                </div>
                                <p className="font-bold">${item.price * item.quantity}</p>
                            </div>
                            <hr className="border-t border-rose-100 mt-3 mb-1" />
                        </div>
                    ))
                )}
                <div className="flex justify-between mt-3">
                    <p className="text-rose-400">Order Total</p>
                    <h2 className="font-bold text-3xl">${totalPrice}</h2>
                </div>
            </div>
            <button className="bg-red w-full rounded-4xl text-rose-100 text-center py-3 pointer" onClick={() => { setOpen(false); dispatch(clearCart()) }}>Start New Order</button>
        </div>
    )
}
