import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Img from "../../assets/bg-home1.png";
import NweArrivalsSkeletonCard from "../../Components/Shared/SkeletonCard/NweArrivalsSkeletonCard";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import HomeProductsCard from "../../Components/Items/Card/HomeProductsCard";

const Collections = () => {
  const axiosSecure = useAxios();
    const [category, setCategory] = useState("all");
    

  const {
    data: homeCollections = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["home-collections",category],
    queryFn: async () => {
      const res = await axiosSecure.get(
      category === "all"
        ? "/home-collections"
        : `/home-collections?gender=${category}`
    );
      return res.data;
    },
  });

  const [startIndex, setStartIndex] = useState(0);
  const limit = 4;
  const visibleProducts = homeCollections?.slice(
    startIndex,
    startIndex + limit,
  );
  const handleNext = () => {
    if (startIndex + limit < homeCollections.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex - limit >= 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(homeCollections.length - limit, 0));
    }
  };

  return (
    <section className="relative min-h-screen bg-[#f2f2f2] px-6 md:px-16 py-20 font-sans overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${Img})`,
          opacity: 0.6,
        }}
      />

      {/* 2. Texture Overlay */}
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-gray-900 italic">
              XIV <br /> COLLECTIONS <br /> 25-26
            </h1>
            <div className="mt-10 flex gap-6 text-[12px] font-black uppercase tracking-widest text-gray-400">
              <button
                onClick={() => setCategory("all")}
                className={
                  category === "all"
                    ? "text-black border-b-2 border-black pb-1"
                    : ""
                }
              >
                (ALL)
              </button>

              <button
                onClick={() => setCategory("MEN")}
                className={
                  category === "MEN"
                    ? "text-black border-b-2 border-black pb-1"
                    : "hover:text-black"
                }
              >
                Men
              </button>

              <button
                onClick={() => setCategory("WOMEN")}
                className={
                  category === "WOMEN"
                    ? "text-black border-b-2 border-black pb-1"
                    : "hover:text-black"
                }
              >
                Women
              </button>

              <button
                onClick={() => setCategory("T-SHIRTS")}
                className={
                  category === "T-SHIRTS"
                    ? "text-black border-b-2 border-black pb-1"
                    : "hover:text-black"
                }
              >
                T-Shirt
              </button>
            </div>
          </div>

          <div className="flex gap-12 mt-8 md:mt-0 text-[11px] font-black uppercase tracking-widest">
            <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">
              Filters(+)
            </button>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1">Sorts(-)</p>
              <span className="text-gray-400 block mt-1 lowercase font-normal leading-tight">
                Less to more <br /> More to Less
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mb-12" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {visibleProducts?.map((product) => <HomeProductsCard product={product} key={product._id}></HomeProductsCard>)}
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            // disabled={page === 1}
            // onClick={() => setPage(page - 1)}
            onClick={handlePrev}
            className="p-3 border border-gray-300 hover:bg-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            // onClick={() => setPage(page + 1)}
            onClick={handleNext}
            className="p-3 border border-gray-300 hover:bg-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Footer "More" Button */}
        {/* <div className="flex flex-col items-center mt-24 group cursor-pointer">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors">
            Discover More
          </span>
          <ChevronDown
            size={24}
            className="text-gray-300 group-hover:text-black group-hover:translate-y-2 transition-all duration-300 mt-2"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Collections;
