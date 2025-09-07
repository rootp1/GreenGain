"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../components/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, Input } from '../../../components/ui';
import { MESSAGES } from '../../../lib/constants';

export default function SignupPage(){
  const { signup, loading, error, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [inputs,setInputs]=useState({});
  const [submitting,setSubmitting]=useState(false);
  const handleChange=e=> setInputs(v=>({...v,[e.target.name]:e.target.value}));
  const submit= async ()=> {
    setSubmitting(true);
    const res = await signup(inputs);
    setSubmitting(false);
    if(res.ok) router.replace('/');
  };
  useEffect(()=>{ if(!loading && isAuthenticated) router.replace('/'); },[loading,isAuthenticated,router]);
  return (
    <div className="flex min-h-screen font-pixel">
      <div className="hidden md:flex flex-1 flex-col gap-6 bg-gradient-to-b from-fuchsia-300 to-cyan-300 p-10 justify-start">
        <h1 className="text-5xl font-light">Join the Green Movement</h1>
        <h2 className="text-4xl font-light text-black">Earn carbon credits 🌿</h2>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-6">
        <Card variant="default" padding="large" className="w-full max-w-md bg-gradient-to-b from-lime-100 to-zinc-200">
          <h2 className="mb-6 text-center text-3xl">Sign Up</h2>
          <Input 
            name="username" 
            type="text" 
            label="Name"
            value={inputs.username||''} 
            onChange={handleChange} 
            className="mb-4" 
          />
          <Input 
            name="email" 
            type="email" 
            label="Email"
            value={inputs.email||''} 
            onChange={handleChange} 
            className="mb-4" 
          />
          <Input 
            name="password" 
            type="password" 
            label="Password"
            value={inputs.password||''} 
            onChange={handleChange} 
            className="mb-6" 
          />
          {error && <div className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{error}</div>}
          <Button 
            onClick={submit}
            disabled={submitting}
            size="full"
            className="mb-4"
          >
            {submitting? 'Creating...' : 'Create Account'}
          </Button>
          <p className="text-center text-sm">Already have an account? <Link href="/login" className="font-bold text-blue-600">Sign In!</Link></p>
        </Card>
      </div>
    </div>
  );
}
