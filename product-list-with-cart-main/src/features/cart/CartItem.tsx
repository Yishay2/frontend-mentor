import type { CartItem } from './cartSlice'
import { useAppDispatch } from '../../app/hooks'
import { removeFromCart } from './cartSlice';

export default function CartItem({ item }: { item: CartItem }) {
    const dispatch = useAppDispatch();

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className='font-bold'>{item.name}</h3>
                    <p>
                        <span className="text-red pr-2 font-bold">{item.quantity}x </span>
                        <span className="text-rose-300 font-semibold pr-2">@ ${item.price}</span>
                        <span className="text-rose-500 font-bold">${item.price * item.quantity}</span>
                    </p>
                </div>
                <button
                    className="flex items-center justify-center rounded-full border-3 font-bold border-rose-300 text-rose-300 w-6 h-6 hover:border-rose-900 pointer hover:text-rose-900"
                    onClick={() => dispatch(removeFromCart({ ...item, force: true }))}
                >
                    X
                </button>
            </div>
            <hr className="border-t border-rose-100 mt-3" />
        </div>
    )
}
