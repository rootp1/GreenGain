"use client";
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../components/AuthProvider';
import Protected from '../../../components/Protected';
import { toast } from 'react-toastify';
import { api1 } from '../../../components/api';

export default function Profile(){
  const { user, refresh } = useContext(AuthContext);
  const [newName,setNewName]=useState('');
  const [updating,setUpdating]=useState(false);
  const [updateMsg,setUpdateMsg]=useState(null);
  const [quests,setQuests]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchQuests= async ()=>{
      try{ const res = await api1.get('/quest'); setQuests(res.data); }catch(e){ toast.error('Could not load quests'); } finally{ setLoading(false);} };
    fetchQuests();
  },[]);
  const claimQuest = async (name)=>{
    try{ await api1.post('/quest/claim',{ quest_name:name }); setQuests(q=> q.map(x=> x.quest_name===name? {...x, claimed:true}: x)); toast.success('Quest claimed!'); }catch(e){ toast.error('Failed to claim quest'); }
  };
  const doUpdate = async ()=>{
    if(!newName.trim()) return;
    setUpdating(true); setUpdateMsg(null);
    try {
      await api1.post('/auth/update',{ username:newName.trim() }, { withCredentials:true });
      setUpdateMsg('Updated successfully');
      setNewName('');
      refresh && refresh();
    } catch(e){
      setUpdateMsg(e.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Protected>
    <div className="mx-auto max-w-5xl font-pixel p-4">
  <div className="mb-6 flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 p-6 text-black shadow md:flex-row">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-neutral-200" />
          <div>
            <h1 className="text-3xl">{user?.username}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">Flash Flora 🌲</span>
              <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">Intermediate Planter 🌳</span>
            </div>
            <p className="mt-2 text-sm">Email: {user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-inner">
            <h2 className="mb-2 text-xl font-semibold underline decoration-orange-400">YOUR POINTS</h2>
            <p className="text-lg font-medium">{user?.points ?? 0} 🌞 Coins</p>
            <p className="text-sm">{((user?.points ?? 0) / 500).toFixed(2)} 💊 Carbon Credit</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-inner">
            <h2 className="mb-3 text-lg font-semibold">Update Name</h2>
            <div className="flex gap-2">
              <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="New username" className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" />
              <button onClick={doUpdate} disabled={!newName.trim()||updating} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-green-700">{updating? 'Saving...' : 'Save'}</button>
            </div>
            {updateMsg && <p className="mt-2 text-xs text-neutral-700">{updateMsg}</p>}
          </div>
        </div>
      </div>
      <div className="mb-6 rounded-2xl bg-neutral-200 p-6 shadow">
        <h2 className="mb-4 inline rounded-lg bg-white px-3 py-1 text-xl">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg bg-white text-sm">
            <thead className="bg-neutral-100 text-left"><tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Transaction ID</th><th className="px-4 py-2">Buyer Name</th><th className="px-4 py-2">Credits Purchased</th><th className="px-4 py-2">Certificate Transfer</th></tr></thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">12/1/25</td><td className="px-4 py-2">Ae123</td><td className="px-4 py-2">Stark Industries</td><td className="px-4 py-2">2 CC</td><td className="px-4 py-2"><span className="rounded bg-green-600 px-2 py-1 text-xs text-white">Transferred</span></td></tr>
              <tr className="border-t"><td className="px-4 py-2">15/1/25</td><td className="px-4 py-2">Re179</td><td className="px-4 py-2">Vel Pvt. Lt.</td><td className="px-4 py-2">2 CC</td><td className="px-4 py-2"><span className="rounded bg-red-500 px-2 py-1 text-xs text-white">Timed Out</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-2xl bg-emerald-700 p-6 text-white shadow">
        <h2 className="mb-2 inline rounded bg-white px-3 py-1 text-xl font-semibold text-black">Quests</h2>
        <p className="mb-4 text-sm">Complete challenges to earn currency</p>
        {loading ? <div>Loading quests...</div> : (
          <div className="space-y-3">
            {quests.map(q=> (
              <div key={q.quest_name} className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 text-black shadow">
                <p className="flex-1 text-base font-medium">{q.quest_name}</p>
                <p className="flex-1 text-sm font-semibold">{q.completed ? '+10 💚' : 'LOCKED'}{q.completed && !q.claimed && ' + Reward Available'}</p>
                <button disabled={!q.completed || q.claimed} onClick={()=>claimQuest(q.quest_name)} className={`flex-1 max-w-[140px] rounded-full px-4 py-2 text-sm font-semibold text-white transition ${q.claimed ? 'bg-gray-400 cursor-not-allowed' : q.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}>{q.claimed ? 'Claimed' : q.completed ? 'Claim' : '🔒'}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Protected>
  );
}
