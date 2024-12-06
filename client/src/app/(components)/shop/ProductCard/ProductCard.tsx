import { useAppSelector } from "@/app/redux";
import ProductService from "@/services/product-service";
import { Product } from "@/state/api";
import { addItemToCart } from "@/state/cart";
import {
  addItemToWishlist,
  productIdsInWishlistSelector,
} from "@/state/wishlist";
import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const onAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };
  const onAddToWishlist = (product: Product) => {
    dispatch(addItemToWishlist(product));
  };
  const getIconWishlistColor = (productId: string) => {
    return isInWishList(productId) ? "#ff795e" : "#fff";
  };
  const wishListProductIds = useAppSelector(productIdsInWishlistSelector);
  const isInWishList = (productId: string) =>
    wishListProductIds.includes(productId);

  return (
    <div key={product.id} className="flex flex-wrap justify-center mx-2">
      <div className="flex flex-col h-[25rem] relative">
        <div className="h-[70%] cursor-pointer relative">
          <div
            onClick={() => onAddToWishlist(product)}
            className="bg-slate-100 w-[2.5rem] h-[2.5rem] rounded-full hover:bg-slate-300 flex items-center justify-center absolute bottom-1 right-1"
          >
            <Heart
              color={"black"}
              fill={getIconWishlistColor(product.id)}
              width={25}
              height={25}
              className="text-slate-900 font-bold rounded-full cursor-pointer"
            />
          </div>
          <Image
            onClick={() => {
              router.push("/shop/product/" + product.id);
            }}
            src={ProductService.formatPictureUrl(product.pictures[0].url)}
            alt={product.name}
            height={200}
            width={300}
            className="h-[100%]"
          />
        </div>
        <div className="px-2 py-2 h-[25%] w-full flex">
          <div className="w-1/2 h-full flex flex-col justify-center">
            <span className="font-bold text-md"> {product.name} </span>
            <span className="italic"> {product.brand} </span>
            <span className="text-lg"> {product.price} €</span>
          </div>
          <div className="w-1/2 flex flex-col justify-around items-end">
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 box-content bg-slate-100 border-solid border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-200 flex items-center "
            >
              add to cart <ShoppingBasket height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
