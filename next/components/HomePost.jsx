"use client";
export default function HomePost({ username, uid, desc }) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/person.png" alt="Profile" className="h-12 w-12 rounded-full border-2 border-teal-200 object-cover" />
        <div>
          <h3 className="m-0 text-lg">{username}</h3>
          <p className="m-0 text-sm text-gray-500">{uid}</p>
        </div>
      </div>
      <div className="mb-3 text-sm leading-relaxed text-gray-700">{desc}</div>
      <div className="flex gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/MangoTree.jpg" alt="Mango Tree 1" className="h-32 w-1/2 rounded-lg object-cover shadow" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/MangoTree.jpg" alt="Mango Tree 2" className="h-32 w-1/2 rounded-lg object-cover shadow" />
      </div>
    </div>
  );
}
