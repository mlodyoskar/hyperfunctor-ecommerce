import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  page: number;
}

export const Pagination = ({ page }: Props) => {
  return (
    <nav className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="m-auto md:-mt-px md:flex">
        {Array.from(Array(10).keys()).map((x) => {
          return (
            <Link
              href={`products-csr?page=${x + 1}`}
              key={x + 1}
              className={clsx(
                { 'border-red-500 text-red-700': page === x + 1 },
                'inline-flex items-center  border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {x + 1}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
