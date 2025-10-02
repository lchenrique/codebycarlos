"use client";

import { useEffect, useState } from "react";

export  function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // ajusta a velocidade
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#161618] flex flex-col justify-center items-center z-50">
      <p className="text-[#e75143] text-4xl font-thin mb-4">loading</p>
      <h1 className="text-white text-6xl -mt-2">{progress}%</h1>
      <div className="w-52 h-1 bg-[#0d0d0d] mt-4 rounded">
        <div
          className="h-full bg-[#e75143] rounded transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
