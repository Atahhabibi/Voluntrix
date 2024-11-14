import React from 'react'

const admintemp = () => {
  return (
    <div>
      {/* Task Management Section */}
      <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-white">
            Task Management
          </h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">Friday Prayer Setup</p>
                <p className="text-gray-400">Date: Friday, 3 PM</p>
                <p className="text-gray-400">Volunteers: 3/5</p>
              </div>
              <div className="space-x-2">
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Management Section */}
      <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-white">
            Volunteer Management
          </h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">Ahmed Khan</p>
                <p className="text-gray-400">Hours: 20</p>
                <p className="text-gray-400">Points: 80</p>
              </div>
              <button className="btn btn-primary">View Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Management Section */}
      <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold text-white">
            Event Management
          </h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg bg-gray-700 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">Eid Prayer</p>
                <p className="text-gray-400">Date: April 10, 9 AM</p>
              </div>
              <div className="space-x-2">
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default admintemp
