import React from "react";

const volunteers = [
  {
    id: 1,
    name: "Ahmed Khan",
    hoursWorked: 20,
    points: 80
  },
  {
    id: 2,
    name: "John Doe",
    hoursWorked: 15,
    points: 60
  }
];

const VolunteerManagementPage = () => {
  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          Volunteer Management
        </h2>
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="border p-4 rounded-lg bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl text-white">{volunteer.name}</h3>
                  <p className="text-gray-400">
                    Hours Worked: {volunteer.hoursWorked}
                  </p>
                  <p className="text-gray-400">Points: {volunteer.points}</p>
                </div>
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagementPage;
