import type { NextPage } from "next";
import React from "react";
import MoreMenu from "./_more";
import PastWorkMenu from "./_pastwork";
import Link from "next/link";
import Image from "next/image";

const Header: NextPage = () => {
  const [subMenu, setSubMenu] = React.useState<string>("");

  const handleMenuOpen = (menuItem: string) => {
    console.log({ menuItem, subMenu });

    if (menuItem === subMenu) {
      return setSubMenu("");
    }
    return setSubMenu(menuItem);
  };

  const handleMenuClose = () => {
    return setSubMenu("");
  };
  return (
    <div className="relative bg-white opacity-75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="sr-only">Ally Rippley</span>
            <Link href="/">
              <Image
                alt="logo"
                className="h-8 w-auto sm:h-10"
                src="/logo.png"
                width={117}
                height={100}
              />
            </Link>
          </div>
          {/* <div className="-my-2 -mr-2 md:hidden">
            <button
              aria-expanded="false"
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none "
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden space-x-10 md:flex">
            <div
              className="relative py-6"
              onMouseEnter={() => handleMenuOpen("pastWork")}
              onMouseLeave={() => handleMenuClose()}
            >
              <button
                aria-expanded="false"
                className="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                type="button"
              >
                <span>Past Work</span>
                <svg
                  aria-hidden="true"
                  className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              {subMenu === "pastWork" && <PastWorkMenu />}
            </div>

            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900 py-6"
              href="#"
            >
              Pricing
            </a>
            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900 py-6"
              href="#"
            >
              Docs
            </a>

            <div
              className="relative py-6"
              onMouseEnter={() => handleMenuOpen("more")}
              onMouseLeave={() => handleMenuClose()}
            >
              <button
                aria-expanded="false"
                className="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                type="button"
              >
                <span>More</span>
                <svg
                  aria-hidden="true"
                  className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              {subMenu === "more" && <MoreMenu />}
            </div>
          </nav> */}
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link href="/contact">
              <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
