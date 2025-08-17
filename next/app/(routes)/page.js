"use client";
import HomePost from '../../components/HomePost';
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider';

export default function Home(){
  const { isAuthenticated, user } = useContext(AuthContext);
  const posts = [1,2,3];
  return (
  <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-10 px-4 pt-6 font-pixel md:flex-row md:items-start md:justify-between lg:gap-16 lg:px-8">
      <div className="w-full space-y-6 md:w-1/2">
        {isAuthenticated && (
          <div className="text-center text-3xl md:text-left md:text-4xl tracking-tight drop-shadow-sm">👋 hello {user?.fullname}! </div>
        )}
        <section className="rounded-xl border border-emerald-200/70 bg-emerald-50/90 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
            <h1 className="mb-3 text-2xl font-semibold text-green-700">Plant a Tree today!</h1>
            <p className="text-base leading-relaxed text-gray-600">Planting a tree today is a step toward a better future. Trees clean the air, combat climate change, and create habitats for wildlife. They stand as symbols of hope, offering beauty and shade while fostering life for generations to come.</p>
        </section>
        <section className="rounded-xl border border-emerald-200/70 bg-emerald-50/90 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
            <h1 className="mb-3 text-2xl font-semibold text-green-700">About Us!</h1>
            <p className="text-base leading-relaxed text-gray-600">We are a platform that turns tree planting into an exciting and rewarding experience. By gamifying environmental action, we let users earn points for every tree planted, which can later be converted into carbon credits. Together, we make sustainability fun, impactful, and rewarding for everyone!</p>
        </section>
      </div>
      <div className="flex w-full flex-col md:w-1/2">
        <h2 className="mb-5 text-center text-3xl font-semibold md:text-left">Posts</h2>
        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-400/60 hover:scrollbar-thumb-emerald-500 md:h-[calc(100vh-220px)]">
          {posts.map(i => (
            <HomePost
              key={i}
              username="Niki"
              uid="nk124345"
              desc="Planted this tree today!"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
