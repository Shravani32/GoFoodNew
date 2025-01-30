import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    const handleSubmit=async (e)=>{

        e.preventDefault();
        const response=await fetch("https://gofoodnew-o756.onrender.com/api/loginuser",{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })

        const json=await response.json();
        console.log(json);

        if(!json.success){
           alert("Enter valid credentials")
        }

        if(json.success){
          localStorage.setItem("authToken",json.token);
          console.log(localStorage.getItem("authToken"));
          navigate("/")
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

        
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to='/login' className="m-3 btn btn-danger">I am a new User</Link>
      </form>
      </div>
    </div>
  );
}

export default Login;
