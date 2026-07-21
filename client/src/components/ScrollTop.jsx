import { useEffect, useState } from "react";
import "../styles/scrollTop.css";

function ScrollTop() {

  const [show,setShow]=useState(false);

  useEffect(()=>{

      const handleScroll=()=>{

          setShow(window.scrollY>400);

      }

      window.addEventListener("scroll",handleScroll);

      return()=>window.removeEventListener("scroll",handleScroll);

  },[]);

  return(

      show&&(

          <button
          className="scroll-top"
          onClick={()=>window.scrollTo({
              top:0,
              behavior:"smooth"
          })}
          >
              ↑
          </button>

      )

  );

}

export default ScrollTop;