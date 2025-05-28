import Cart from "./features/cart/Cart"
import ProductList from "./features/products/ProductList"
import { Provider } from "react-redux"
import { store } from './app/store'

export default function App() {

  return (
    <Provider store={store} >
      <div className='h-screen w-full md:p-20 gap-4 flex flex-col md:flex-row md:justify-between bg-rose-50'>
        <ProductList />
        <Cart />
      </div>
    </Provider>
  )
}
