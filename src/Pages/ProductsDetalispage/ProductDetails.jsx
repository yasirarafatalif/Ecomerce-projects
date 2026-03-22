import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  ChevronDown,
  Share2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { HiShoppingBag } from "react-icons/hi";
import { GoPackage } from "react-icons/go";
import PremiumLoader from "../../Components/Shared/PremiumSpinner";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const axois = useAxios();
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products-detalis", id],
    queryFn: async () => {
      const res = await axois.get(`/products/${id}`);
      return res.data;
    },
  });

  const titie = products.category;
  console.log(titie);

  const detailsData = [
    {
      title: "Description",
      content: `${products?.description}`,
    },
    {
      title: "Care Instructions",
      content: "Wash in cold water. Do not bleach. Iron at low temperature.",
    },
    {
      title: "Sustainability",
      content: "Made using eco-friendly materials and sustainable process.",
    },
  ];
  // Product Images Array

  const productImages = [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
    `${products?.img}`,
  ];

  // States
  const [mainImage, setMainImage] = useState(productImages[3]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  useEffect(() => {
    if (products?.img) {
      setMainImage(products.img);
    }
  }, [products]);

  const hanadelAddToCart = async (product) => {
    const cartData = {
      productName: product?.title,
      productCategory: product?.category,
      buyerEmail: user?.email,
      productId: product?._id,
      status: "Pending",
      deliveryStatus: "Pending",
      paymentStatus: "Unpaid",
      totalQuantity: quantity,
      productPrice: product?.price,
      productType: product?.gender,
      size: selectedSize,
      img: mainImage,
    };
    if (!user) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please LogIn First",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    try {
      const res = await axois.post("/orders", cartData);
      if (res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate(`/checkout/${product?._id}`,{ state: cartData })
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handelWishlist = async (id) => {
    if (!user) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please LogIn First",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const wishdata = {
      userEmail: user?.email,
      productId: id,
    };
    try {
      const res = await axois.post("/wishlist", wishdata);
      if (res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) {
    return <PremiumLoader></PremiumLoader>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-28 pb-20 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <title>{` ${products.title}`}</title>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* --- LEFT: IMAGE SECTION --- */}
          <div className="w-full lg:flex-1 flex flex-col md:flex-row gap-4">
            {/* Thumbnails (Selected korte dibe) */}
            <div className="order-2 md:order-1 flex md:flex-col gap-3">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-20 md:w-20 md:h-28 cursor-pointer overflow-hidden border-2 transition-all 
                    ${mainImage === img ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="order-1 md:order-2 flex-1 bg-white aspect-[4/5] overflow-hidden shadow-sm relative group">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                onClick={() => handelWishlist(products._id)}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
              >
                <Heart size={20} className="text-gray-900" />
              </button>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="w-full lg:w-[450px] lg:sticky lg:top-28">
            <div className="flex flex-col gap-6">
              {/* Heading */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1 italic">
                  XIV Exclusive
                </p>

                <h1 className="text-4xl font-black uppercase tracking-tighter italic text-gray-900 leading-tight">
                  {products?.title}
                </h1>

                <div className=" ">
                  <span className="text-[10px] font-bold uppercase  text-gray-500">
                    CATEGORY: {products?.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-2xl font-black text-gray-900">
                    ${products?.totalPrice}
                  </span>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {products?.rating || "4.0"} ({products?.reviewsCount || 0}
                      )
                    </span>
                  </div>
                </div>
                <div className="flex mt-3 gap-3">
                  <div className="flex items-center gap-1">
                    <GoPackage size={14} className="fill-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Stock ({products?.stock || 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiShoppingBag size={14} className="fill-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Total Sell ({products?.totalSell || 0})
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest mb-4">
                  Select Size
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {products?.inventory?.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size.size)}
                      className={`py-3 text-[11px] font-bold border transition-all
                        ${selectedSize === size.size ? "bg-black text-white border-black shadow-lg" : "bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black"}`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart & Quantity */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center border border-gray-300 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-6 font-black text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* <Link
                 to={"/checkout"}
                > */}
                <button
                  onClick={() => hanadelAddToCart(products)}
                  className="w-full bg-[#1A1A1A] text-white py-5 flex items-center justify-center gap-4 hover:bg-black transition-all group active:scale-[0.98] shadow-xl"
                >
                  <ShoppingBag
                    size={20}
                    className="group-hover:rotate-12 transition-transform"
                  />

                  <span className="text-sm font-black uppercase tracking-[0.25em]">
                    Add to Bag
                  </span>
                </button>
                {/* </Link> */}
              </div>

              {/* Details Toggles */}
              <div className="border-t border-gray-200 pt-2">
                {detailsData.map((item, index) => (
                  <div key={item.title} className="border-b border-gray-200">
                    {/* Header */}
                    <div
                      onClick={() => setActive(active === index ? null : index)}
                      className="flex justify-between items-center py-4 cursor-pointer hover:px-2 transition-all"
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-700">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          active === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Dropdown Content */}
                    {active === index && (
                      <div className="pb-4 text-[12px] text-gray-500">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <Share2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Share this product
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
