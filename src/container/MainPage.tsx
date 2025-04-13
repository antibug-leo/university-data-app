"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { fetchUniversities, toggleFavorite } from "@/pages/api/api_event";
import { University } from "@/utils/type";
import { countryList } from "../utils/countryList";
import UniversityTable from "./component/UniversityTable";
import Pagination from "./component/Pagination";

const MainPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [country, setCountry] = useState("Canada");
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiResTime, setApiResTime] = useState<number | null>(null);
  const [apiResCode, setApiResCode] = useState<number | null>(null);
  const rowOptions = [5, 10, 20, 50];

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchWordChange = useCallback(
    debounce((value: string) => {
      setDebouncedSearchWord(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    const loadUniversities = async () => {
      const startTime = performance.now();
      try {
        const { universities, total } = await fetchUniversities(
          country,
          debouncedSearchWord,
          currentPage,
          itemsPerPage
        );
        const endTime = performance.now();
        setApiResTime(endTime - startTime);
        setApiResCode(200);
        setUniversities(universities);
        setTotalResults(total);
      } catch (error: any) {
        const endTime = performance.now();
        setApiResTime(endTime - startTime);
        setApiResCode(error.response?.status || 500);
        console.error("Error fetching universities:", error);
      }
    };
    loadUniversities();
  }, [debouncedSearchWord, country, currentPage, itemsPerPage]);

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id.toString());
      setUniversities((prevUniversities) =>
        prevUniversities.map((university) =>
          university._id === id
            ? { ...university, is_favorite: !university.is_favorite }
            : university
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const clearAllFilters = () => {
    setCountry("Canada");
    setSearchWord("");
    setDebouncedSearchWord("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="search-page bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 py-6">
        University
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl p-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Filters</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by university name"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  handleSearchWordChange(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full cursor-pointer p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Country</option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={clearAllFilters}
              className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>

            <div className="api-info bg-gray-50 shadow-md rounded-lg p-4 mt-6 text-center">
              <p className="text-gray-600">
                <strong>API Response Time:</strong>{" "}
                {apiResTime !== null ? `${apiResTime.toFixed(2)} ms` : "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>API Response Code:</strong>{" "}
                {apiResCode !== null ? apiResCode : "N/A"}
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/favorites"
                className="text-blue-600 hover:underline font-medium"
              >
                Go to Favorites
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="overflow-x-auto">
                {universities.length > 0 ? (
                  <UniversityTable
                    universities={universities}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    No universities found.
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                rowOptions={rowOptions}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(itemsPerPage) => {
                  setItemsPerPage(itemsPerPage);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
