import React, { useState } from "react";

const QuantityBox = ({item}) => {
  const [quantity, setQuantity] = useState(item.totalQuantity);

  return (
    <div className="flex items-center border border-gray-300 w-fit">
      <button
        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        className="p-3 hover:bg-gray-200 transition-colors"
      >
        -
      </button>

      <span className="px-6 font-black text-sm">{quantity}</span>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="p-3 hover:bg-gray-200 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityBox;
