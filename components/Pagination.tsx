import Link from 'next/link';

export const Pagination = () => {
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-6">
      <div className="hidden md:-mt-px md:flex">
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((x) => {
          return (
            <Link href={`products/${x}`} key={x}>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              >
                {x}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
