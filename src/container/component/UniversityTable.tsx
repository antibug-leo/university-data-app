import React from "react";
import { University } from "@/utils/type";
import Star from "./Star";

interface UniversityTableProps {
  universities: University[];
  onToggleFavorite: (id: number) => void;
}

const UniversityTable: React.FC<UniversityTableProps> = ({
  universities,
  onToggleFavorite,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="hidden lg:table-header-group">
          <tr className="bg-blue-100 text-blue-800">
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">
              State/Province
            </th>
            <th className="px-4 py-2 text-left font-semibold">Website</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr
              key={university._id}
              className="hover:bg-gray-50 lg:table-row border-b lg:border-none"
            >
              {/* Desktop View */}
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
                  onClick={() => onToggleFavorite(university._id)}
                  className="cursor-pointer text-white px-4 py-2 rounded-lg transition flex items-center justify-center"
                >
                  {university.is_favorite ? (
                    <Star color="#FFFF00" />
                  ) : (
                    <Star color="#E4E4E7" />
                  )}
                </button>
              </td>

              {/* Mobile View */}
              <td className="lg:hidden w-full px-4 py-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <strong>Name:</strong> {university.name}
                  </div>
                  <div>
                    <strong>State/Province:</strong>{" "}
                    {university["state-province"] || "N/A"}
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
                      onClick={() => onToggleFavorite(university._id)}
                      className="cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center mt-2"
                    >
                      {university.is_favorite ? (
                        <Star color="#FFFF00" />
                      ) : (
                        <Star color="#E4E4E7" />
                      )}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityTable;
