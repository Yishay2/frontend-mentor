import { useAppSelector } from "../../app/hooks"
import { selectProducts } from "./productsSlice"
import ProductCard from "./ProductCard";

export default function ProductList() {

  const products = useAppSelector(selectProducts);
  return (
    <div className="flex flex-col gap-4 w-full md:w-2/3 p-1">
      <h1 className="text-3xl font-bold">Dessert</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}
