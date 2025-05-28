import type { Product } from './productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart, selectCart } from '../cart/cartSlice';

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);

    const inCart = cart.find(item => item.name === product.name) ?? false;

    return (
        <div className="rounded-lg ">
            <img
                src={product.image.thumbnail}
                srcSet={`${product.image.mobile} 640w, ${product.image.tablet} 768w, ${product.image.desktop} 1024w`}
                alt="image"
                className={`w-full rounded-xl ${inCart && 'border-3 border-red'}`}
            />
            <div className="w-full flex justify-center mt-[-1rem]">
                {!inCart ? 
                    <button
                        className='rounded-3xl p-3 w-1/2 bg-white border border-rose-400 flex justify-center hover:border-red pointer' onClick={() => dispatch(addToCart(product))}>
                        <img src="/assets/images/icon-add-to-cart.svg" alt="add to cart" />
                        <span className='ml-2'>Add to cart</span>
                    </button> :
                    <div className='flex justify-between bg-red w-1/2 p-3 rounded-3xl text-white'>
                        <button className='border pointer rounded-full px-2 text-1xl font-bold hover:bg-white hover:text-red' onClick={() => dispatch(removeFromCart(inCart))}>-</button>
                        <p>{inCart.quantity}</p>
                        <button className='border pointer rounded-full px-2 text-1xl font-bold hover:bg-white hover:text-red' onClick={() => dispatch(addToCart(product))}>+</button>
                    </div> 
                }
            </div>
            <p className='font-bold'>{product.category}</p>
            <p>{product.name}</p>
        </div>
    )
}

export default ProductCard
