import TablesPagination from "./TablesPagination";
import { useState } from "react";

const VolunteerNeedsTable = ({ events, isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(events.length / recordsPerPage);
  const currentEvents = events.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return <div>Loading volunteer needs...</div>;
  if (isError) return <div>Error loading volunteer needs!</div>;

  const rows = [...currentEvents];
  while (rows.length < recordsPerPage) {
    rows.push({ name: "", volunteersNeeded: "", volunteersAssigned: [] });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px]">
      <h3 className="text-lg font-semibold text-white mb-4">Volunteer Needs</h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 text-xs">
                Event Name
              </th>
              <th className="px-4 py-2 border border-gray-700 text-xs">
                Volunteers Needed
              </th>
              <th className="px-4 py-2 border border-gray-700 text-xs">
                Volunteers Assigned
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((event, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
              >
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {event.name}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {event.volunteersNeeded}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {event.volunteersAssigned.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};


export default VolunteerNeedsTable; 