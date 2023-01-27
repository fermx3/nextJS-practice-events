import { Fragment } from "react";
import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  const { title, description, date, location, image } = selectedEvent;

  return (
    <Fragment>
      <Head>
        <title>{title} | NextJS Events</title>
        <meta name="description" content={description.slice(0, 160)} />
      </Head>
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
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return { props: {} };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
