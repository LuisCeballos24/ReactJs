import React from "react";

import { stats } from "../../../data";

const Stats = () => {
  return (
    <div className="p-12 bg-accent rounded-[20px]">
      <div className="flex flex-wrap gap-y-8">
        {stats.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center w-3/6 lg:flex-1 odd:border-r min-h-[70px] lg:odd:border-r lg:even:border-r lg:even:last:border-none"
            >
              <div className="text-2xl font-semibold lg:text-4xl">
                {item.value}
              </div>
              <div className="mx-auto text-base font-light lg:text-xl max-w-[110px]">
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
