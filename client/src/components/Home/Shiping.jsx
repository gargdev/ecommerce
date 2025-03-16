import React from "react";
import { CheckCircle, Headset, Package, Trophy } from "lucide-react";

const Shiping = () => {
  return (
    <div className="bg-[#fdf8f3] py-8 mt-10">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between text-black">
        {/* Feature Item */}
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-black" />
          <div>
            <h4 className="text-lg font-semibold">High Quality</h4>
            <p className="text-sm text-gray-500">crafted from top materials</p>
          </div>
        </div>

        {/* Feature Item */}
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-black" />
          <div>
            <h4 className="text-lg font-semibold">Warranty Protection</h4>
            <p className="text-sm text-gray-500">Over 2 years</p>
          </div>
        </div>

        {/* Feature Item */}
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-black" />
          <div>
            <h4 className="text-lg font-semibold">Free Shipping</h4>
            <p className="text-sm text-gray-500">Order over 150 $</p>
          </div>
        </div>

        {/* Feature Item */}
        <div className="flex items-center gap-3">
          <Headset className="w-8 h-8 text-black" />
          <div>
            <h4 className="text-lg font-semibold">24 / 7 Support</h4>
            <p className="text-sm text-gray-500">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shiping;
