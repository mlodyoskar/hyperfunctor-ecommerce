import Image from 'next/image';
import Link from 'next/link';

export interface ProductAPIResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

interface Rating {
  rate: number;
  count: number;
}

export const ProductList = ({
  products,
}: {
  products: ProductAPIResponse[];
}) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
      {products.map((product) => {
        return (
          <Link href={`products-csr/${product.id}`} key={product.id}>
            <a className="block">
              <div className="flex justify-center">
                <strong className="relative h-6 bg-black px-4 text-xs uppercase leading-6 text-white">
                  New
                </strong>
              </div>
              <div className="bg-white">
                <Image
                  alt={product.title}
                  src={product.image}
                  className="-mt-3 h-[350px] w-full object-cover sm:h-[450px]"
                  layout="responsive"
                  width={4}
                  height={3}
                  objectFit="contain"
                />
              </div>
              <h5 className="mt-4 text-sm text-gray-700">{product.title}</h5>
              <div className="mt-4 flex items-center justify-between font-medium">
                <p>${product.price}</p>
                <p className="text-xs uppercase tracking-wide">
                  Rating: {product.rating.rate}
                </p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};