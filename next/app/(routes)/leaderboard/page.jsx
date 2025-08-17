"use client";
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Leaderboard(){
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=>{ if(!loading && !isAuthenticated) router.push('/'); },[loading,isAuthenticated,router]);
  if(loading || !user) return <div className="p-8 font-pixel">Loading...</div>;
  const leaderboardData = [
    { rank: "#1", name: "Akash Keith", points: "2310", place: "🏆" },
    { rank: "#2", name: "Kristen Nikhil", points: "1605", place: "🥈" },
    { rank: "#3", name: "Rahul Sridhar", points: "930", place: "🥉" },
    { rank: "#4", name: "Mabel Helen", points: "620", place: "🌟" },
  ];
  return (
    <div className="px-4 py-6 font-pixel">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl bg-amber-50 p-6 shadow">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-amber-400 p-6 text-black shadow">
            <div className="flex size-36 items-center justify-center rounded-full bg-white" />
            <h2 className="text-3xl">{user.fullname}</h2>
            <p className="text-2xl text-emerald-600 font-bold">RANK: #41</p>
            <p className="text-xl">Total Points: {user.points}</p>
            <div className="w-full rounded-xl bg-white p-4 shadow">
              <h3 className="mb-2 text-xl font-bold text-amber-500">STATS:</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-lg">
                <li>Total No. Of Trees: 12</li>
                <li>Total Posts: 132</li>
                <li>Coins Earned: {user.points}</li>
                <li>Credits Earned: {user.credits}</li>
                <li>Carbon Sequestration</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-[2] flex-col rounded-2xl bg-white p-6 shadow">
            <h2 className="mx-auto mb-4 w-2/3 rounded-xl bg-teal-200 py-2 text-center text-2xl">🏆 Leaderboard</h2>
            <div className="mb-2 flex justify-between rounded-lg bg-white px-4 py-2 font-bold">
              <span className="flex-1 text-center">S.No</span>
              <span className="flex-1 text-center">Name</span>
              <span className="flex-1 text-center">Points</span>
              <span className="flex-1 text-center">Place</span>
            </div>
            <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
              {leaderboardData.map((entry, index) => {
                const tier = index === 0 ? 'bg-yellow-400 font-bold' : index === 1 ? 'bg-gray-300 font-bold' : index === 2 ? 'bg-amber-700/70 font-bold' : 'bg-gray-200';
                return (
                  <div key={index} className={`flex justify-between rounded-lg px-4 py-2 text-xl ${tier}`}>
                    <span className="flex-1 text-center">{index + 1}</span>
                    <span className="flex-1 text-center">{entry.name}</span>
                    <span className="flex-1 text-center">{entry.points}</span>
                    <span className="flex-1 text-center">{entry.place}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
