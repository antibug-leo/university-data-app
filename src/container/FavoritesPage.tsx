import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFavorites, toggleFavorite } from "@/pages/api/api_event";
import UniversityTable from "./component/UniversityTable";
import { University } from "@/utils/type";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<University[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id.toString());
      setFavorites((prevFavorites) =>
        prevFavorites.filter((university) => university._id !== id)
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="favorites-page bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 py-6">
        Favorite Universities
      </h1>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl p-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Favorites Info
            </h2>
            <p className="text-gray-600 mb-4">
              Here you can manage your favorite universities.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-blue-600 hover:underline font-medium"
              >
                Back to Main Page
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="overflow-x-auto">
                {favorites.length > 0 ? (
                  <UniversityTable
                    universities={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    No favorite universities added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
