import React, { useContext} from "react";
import HomePost from "../components/homepost";
import { AuthContext } from "../contexts/authContext";
function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <div className="flex flex-col md:flex-row gap-8 px-8 pt-4 font-pixel">
      <div className="md:w-1/2 space-y-6">
        {isAuthenticated && (
          <div className="text-4xl">👋 hello {user?.fullname}!</div>
        )}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow">
          <h1 className="mb-2 text-2xl text-green-700">Plant a Tree today!</h1>
          <p className="text-base leading-relaxed text-gray-600">Planting a tree today is a step toward a better future. Trees clean the air, combat climate change, and create habitats for wildlife. They stand as symbols of hope, offering beauty and shade while fostering life for generations to come.</p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow">
          <h1 className="mb-2 text-2xl text-green-700">About Us!</h1>
          <p className="text-base leading-relaxed text-gray-600">We are a platform that turns tree planting into an exciting and rewarding experience. By gamifying environmental action, we let users earn points for every tree planted, which can later be converted into carbon credits. Together, we make sustainability fun, impactful, and rewarding for everyone!</p>
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="mb-4 text-3xl">Posts</h2>
        <div className="space-y-6">
          <HomePost username="Niki" uid="nk124345" desc="Planted this tree today!" />
          <HomePost username="Niki" uid="nk124345" desc="Planted this tree today!" />
          <HomePost username="Niki" uid="nk124345" desc="Planted this tree today!" />
        </div>
      </div>
    </div>
  );
}
export default Home;
