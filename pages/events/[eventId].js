import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = ({ loadedEvent }) => {
  if (!loadedEvent) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  const { title, description, date, location, image } = loadedEvent;

  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const eventId = params.eventId;

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
      description: data[key].description,
      image: data[key].image,
      location: data[key].location,
    });
  }

  const event = transformedEvents.find((product) => product.id === eventId);

  if (!event) {
    return {
      props: {},
    };
  }

  return {
    props: {
      loadedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    "https://nextjs-course-84422-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
    });
  }

  const ids = transformedEvents.map((event) => event.id);

  const pathsWithParams = ids.map((id) => ({ params: { eventId: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default EventDetailPage;
