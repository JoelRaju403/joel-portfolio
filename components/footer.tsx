import Link from "next/link";
import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="z-10 flex-none">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative pb-12 pt-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <nav
                aria-label="Footer"
                className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-800 transition dark:text-zinc-200"
              ></nav>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                ©{year}{" "}
                <Link
                  href="/"
                  className="font-semibold text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-200"
                >
                  Joel Raju Portfolio
                </Link>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
