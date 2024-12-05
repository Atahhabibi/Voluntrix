import TablesPagination from "./TablesPagination";
import { useState } from "react";

const UpcomingEventsTable = ({ events, isLoading, isError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const sortedEvents = events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const totalPages = Math.ceil(sortedEvents.length / recordsPerPage);
  const currentEvents = sortedEvents.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">
        Loading upcoming events...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400">
        Error loading upcoming events!
      </div>
    );
  }

  // Add empty rows to maintain fixed table height
  const rows = [...currentEvents];
  while (rows.length < recordsPerPage) {
    rows.push({ name: "", date: "", location: "" });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-[450px] mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
      <div className="overflow-y-auto max-h-[350px]">
        <table className="table-auto w-full text-gray-400 border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border border-gray-700 h-10">
                Event Name
              </th>
              <th className="px-4 py-2 border border-gray-700 h-10">Date</th>
              <th className="px-4 py-2 border border-gray-700 h-10">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((event, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                } hover:bg-gray-500 transition`}
              >
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.name}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.date ? new Date(event.date).toLocaleDateString() : ""}
                </td>
                <td className="px-4 py-2 text-center border border-gray-700 h-10">
                  {event.location}
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

export default UpcomingEventsTable;
