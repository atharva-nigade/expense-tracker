import Link from "next/link";
import React from "react";

const HeroPage = () => {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 
        lg:flex">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expense
              <strong className="font-extrabold text-webColours-dark sm:block">
                {" "}
                Control Your Money{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={'/dashboard'} className="block w-full rounded-lg bg-webColours-light px-12 py-3 text-sm font-medium
                 text-white shadow hover:bg-webColours-dark focus:outline-none focus:ring
                  sm:w-auto">
              Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
