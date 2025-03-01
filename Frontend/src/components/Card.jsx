import React, { useRef, useState,useEffect } from "react";
import {useDisPatchCart,useCart} from './ContextReducer'

const Card = (props) => {

  let data=useCart();
  let options=props.options
  let priceOptions=Object.keys(options)
  const priceRef=useRef();

  let dispatch=useDisPatchCart()
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("")

  const hadleAddToCart=async ()=>{
     await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
     console.log(data)
  }

  let finalPrice=qty*parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div>
        <div
          className="card mt-3 "
          style={{ width: "18rem", maxHeight: "400px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"200px",objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className="container w-100">
              <select className="m-2 h-200 bg-success rounded" onChange={(e)=>{setQty(e.target.value)}}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-200 bg-success rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                {
                  priceOptions.map((data)=>{
                    return (
                      <option key={data} value={data} >{data}</option>
                    )
                  })
                }
              </select>

              <div className="d-inline h-100 fs-5">
              Rs.{finalPrice}/-
              </div>
              <hr />
              <button type="button" className="btn btn-info ml-1" onClick={hadleAddToCart} >
                 Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
