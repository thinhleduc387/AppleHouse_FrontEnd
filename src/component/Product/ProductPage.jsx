import {
  AiFillHome,
  AiOutlineRight,
  AiOutlineSortAscending,
} from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import ProductItem from "../Product/ProductItem";

const ProductPage = () => {
  return (
    <section className="bg-gray-50 py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Heading & Filters */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    <AiFillHome className="me-2.5 h-3 w-3" />
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <AiOutlineRight className="h-5 w-5 text-gray-400 rtl:rotate-180" />
                    <a
                      href="#"
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2"
                    >
                      Products
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <AiOutlineRight className="h-5 w-5 text-gray-400 rtl:rotate-180" />
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                      Electronics
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
              Electronics
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              data-modal-toggle="filterModal"
              data-modal-target="filterModal"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
            >
              <FiFilter className="-ms-0.5 me-2 h-4 w-4" />
              Filters
              <AiOutlineRight className="-me-0.5 ms-2 h-4 w-4" />
            </button>
            <button
              id="sortDropdownButton1"
              data-dropdown-toggle="dropdownSort1"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
            >
              <AiOutlineSortAscending className="-ms-0.5 me-2 h-4 w-4" />
              Sort
              <AiOutlineRight className="-me-0.5 ms-2 h-4 w-4" />
            </button>
            <div
              id="dropdownSort1"
              className="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-slate-500 shadow"
              data-popper-placement="bottom"
            ></div>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ProductItem></ProductItem>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
