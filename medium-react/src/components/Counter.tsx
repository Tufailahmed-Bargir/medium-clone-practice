// import { useState } from "react";
import { useRecoilState } from "recoil";
import { countState } from "../stores/atoms/count";

 

export default function Counter() {
   const [count, setcount]=useRecoilState(countState)
  return (
    <div>
      <button 
        className="bg-red-800 text-white rounded-md p-4 m-4"
        onClick={() => setcount(count + 1)}
      >
        Count: {count}
      </button>
    </div>
  );
}
