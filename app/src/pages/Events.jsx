import React from "react";

// Sample data for events
const events = [
  {
    id: 1,
    name: "Community Clean-Up",
    date: "Saturday, 9:00 AM",
    location: "Mosque Grounds",
    description:
      "Join us for a community clean-up event to help keep our mosque clean and welcoming for everyone."
  },
  {
    id: 2,
    name: "Ramadan Food Drive",
    date: "Next Wednesday, 5:00 PM",
    location: "Mosque Kitchen",
    description:
      "Help us pack and distribute food packages to those in need during Ramadan."
  },
  {
    id: 3,
    name: "Eid Decoration Setup",
    date: "Eid Eve, 6:00 PM",
    location: "Main Hall",
    description:
      "Assist in setting up decorations for Eid celebrations to make the event special for the community."
  }
  // Add more events as needed
];

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Upcoming Events</h1>
        <p className="text-lg text-secondary mt-4">
          Participate in upcoming events to support our community and connect
          with fellow volunteers.
        </p>
      </section>

      {/* Events Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="card bg-base-100 shadow-lg p-6">
            <h2 className="card-title text-primary mb-2">{event.name}</h2>
            <p className="text-secondary">Date: {event.date}</p>
            <p className="text-secondary">Location: {event.location}</p>
            <p className="text-secondary mt-4">{event.description}</p>
            <button
              className="mt-4 btn btn-secondary"
              onClick={() => alert(`Details for ${event.name}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EventsPage;
