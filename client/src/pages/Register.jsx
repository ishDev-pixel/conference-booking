import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from "../services/api";

const Register = () => { 
 

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("customer")

  const navigate = useNavigate();

const handleRegister = async () => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
      role // 👈 "customer" or "owner"
    });

    localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data)
);

    // 🔁 redirect based on role
 if (role === "admin") {

  navigate("/AdminDashboard");

} else if (role === "owner") {

  navigate("/owner");

} else {

  navigate("/UserDashboard");

}

  } catch (err) {
   console.log(err);
console.log(err.response);
console.log(err.response?.data);

alert(
  err.response?.data?.message ||
  err.message ||
  "Something went wrong"
);
  }
};


  return (
    <div className='pt-24 bg-gray-50 h-screen w-screen flex items-center justify-center'>
      <div className='bg-white shadow-xl rounded p-8 flex flex-col gap-5 w-[400px]'>

        <h1 className='text-3xl font-bold text-center'>Create Account</h1>

        <p className='text-center'>
          Already have an account? <Link to='/login' className='text-blue-600'>Sign In</Link>
        </p>

        <input
          className='border p-2'
          type='text'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className='border p-2'
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className='border p-2'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <select
  className='border p-2'
  value={role}
  onChange={(e) => setRole(e.target.value)}
>

  <option value="customer">
    Customer
  </option>

  <option value="owner">
    Owner
  </option>
   <option value="admin">
    admin
  </option>

</select>

        <button
          onClick={handleRegister}
          className='bg-blue-900 text-white py-2 rounded font-bold'
        >
          Register
        </button>

      </div>
    </div>
  )
}

export default Register;