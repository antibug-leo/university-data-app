import Link from "next/link";
import React, { useEffect, useState } from "react";
import Star from "./component/Star";

type University = {
  _id: string;
  name: string;
  "state-province": string;
  web_pages: string[];
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<University[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/main?type=favorites");
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id: string) => {
    try {
      const response = await fetch("/api/main", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uni_id: id }),
      });

      if (!response.ok) {
        console.error("Failed to remove favorite:", await response.json());
        return;
      }

      setFavorites((prevFavorites) =>
        prevFavorites.filter((university) => university._id !== id)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
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
                Back to Search Page
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="overflow-x-auto">
                {favorites.length === 0 ? (
                  <p className="text-center text-gray-600">
                    No favorite universities added yet.
                  </p>
                ) : (
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="hidden lg:table-header-group">
                      <tr className="bg-blue-100 text-blue-800">
                        <th className="p-4 text-left font-semibold">Name</th>
                        <th className="p-4 text-left font-semibold">
                          State/Province
                        </th>
                        <th className="p-4 text-left font-semibold">Website</th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favorites.map((university) => (
                        <tr
                          key={university._id}
                          className="hover:bg-gray-50 lg:table-row border-b lg:border-none"
                        >
                          <td className="hidden lg:table-cell border border-gray-300 px-4 py-2">
                            {university.name}
                          </td>
                          <td className="hidden lg:table-cell border border-gray-300 px-4 py-2">
                            {university["state-province"]}
                          </td>
                          <td className="hidden lg:table-cell border border-gray-300 px-4 py-2">
                            <a
                              href={university.web_pages[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Visit
                            </a>
                          </td>
                          <td className="hidden lg:table-cell border border-gray-300 px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                removeFromFavorites(university._id)
                              }
                              className="cursor-pointer text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
                            >
                              <Star color="#FFFF00" />
                            </button>
                          </td>

                          <td className="lg:hidden w-full px-4 py-2">
                            <div className="flex flex-col gap-2">
                              <div>
                                <strong>Name:</strong> {university.name}
                              </div>
                              <div>
                                <strong>State/Province:</strong>{" "}
                                {university["state-province"]}
                              </div>
                              <div>
                                <strong>Website:</strong>{" "}
                                <a
                                  href={university.web_pages[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Visit
                                </a>
                              </div>
                              <div>
                                <strong>Actions:</strong>
                                <button
                                  onClick={() =>
                                    removeFromFavorites(university._id)
                                  }
                                  className="cursor-pointer text-white px-4 py-2 rounded-lg transition flex items-center justify-center mt-2"
                                >
                                  <Star color="#FFFF00" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
