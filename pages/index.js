import { useEffect, useState } from "react";

import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    setFeaturedEvents(getFeaturedEvents());
  }, []);

  return (
    <div>
      <EventList eventsToDisplay={featuredEvents} />
    </div>
  );
};

export default HomePage;
