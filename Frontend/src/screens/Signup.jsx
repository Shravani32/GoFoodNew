import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""});

    const handleSubmit=async (e)=>{

        e.preventDefault();
        const response=await fetch("https://gofoodnew-o756.onrender.com/api/createuser",{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })

        const json=await response.json();
        console.log(json);

        if(!json.success){
           alert("Enter valid credentials")
        }
    }

    const changeHandler=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }

  return (
    <div>
        <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={changeHandler} />
        </div>
          
          <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={changeHandler}
          />
          <small id="emailHelp" className="form-text text-muted mb-3">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Address</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={changeHandler}
          />
        </div>
        
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
      </form>
      </div>
    </div>
  );
}

export default Signup;
