"use client";
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../components/AuthProvider';
import Link from 'next/link';

export default function SignupPage(){
  const { signup } = useContext(AuthContext);
  const [inputs,setInputs]=useState({});
  const handleChange=e=> setInputs(v=>({...v,[e.target.name]:e.target.value}));
  const submit=()=> signup(inputs);
  return (
    <div className="flex min-h-screen font-pixel">
      <div className="hidden md:flex flex-1 flex-col gap-6 bg-gradient-to-b from-fuchsia-300 to-cyan-300 p-10 justify-start">
        <h1 className="text-5xl font-light">Join the Green Movement</h1>
        <h2 className="text-4xl font-light text-black">Earn carbon credits 🌿</h2>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-6">
        <div className="w-full max-w-md rounded-xl bg-gradient-to-b from-lime-100 to-zinc-200 p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl">Sign Up</h2>
          <label className="mb-1 block text-lg font-bold" htmlFor="username">Name</label>
          <input name="username" type="text" value={inputs.username||''} onChange={handleChange} className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none" />
          <label className="mb-1 block text-lg font-bold" htmlFor="email">Email</label>
          <input name="email" type="email" value={inputs.email||''} onChange={handleChange} className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none" />
          <label className="mb-1 block text-lg font-bold" htmlFor="password">Password</label>
          <input name="password" type="password" value={inputs.password||''} onChange={handleChange} className="mb-6 w-full rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none" />
          <button className="w-full rounded bg-black px-4 py-3 text-white transition hover:bg-neutral-800" onClick={submit}>Create Account</button>
          <p className="mt-4 text-center text-sm">Already have an account? <Link href="/login" className="font-bold text-blue-600">Sign In!</Link></p>
        </div>
      </div>
    </div>
  );
}
