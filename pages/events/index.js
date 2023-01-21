import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const EventsPage = ({ allEvents }) => {
  console.log(allEvents);
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList eventsToDisplay={allEvents} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-84422-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      date: data[key].date,
      title: data[key].title,
      image: data[key].image,
      location: data[key].location,
    });
  }

  return { props: { allEvents: transformedEvents }, revalidate: 10 };
}

export default EventsPage;
