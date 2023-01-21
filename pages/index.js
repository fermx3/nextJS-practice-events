import { useEffect, useState } from "react";

import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../dummy-data";

const HomePage = (props) => {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);

  // useEffect(() => {
  //   setFeaturedEvents(getFeaturedEvents());
  // }, []);

  return (
    <div>
      <EventList eventsToDisplay={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-84422-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    if (data[key].isFeatured) {
      transformedEvents.push({
        id: key,
        date: data[key].date,
        title: data[key].title,
        image: data[key].image,
        location: data[key].location,
      });
    }
  }

  return { props: { featuredEvents: transformedEvents }, revalidate: 10 };
}

export default HomePage;
