import { useEffect, useState } from "react";
import useSWR from "swr";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (props) => {
  const { year, month } = props.date;

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const { data, error } = useSWR(
    "https://nextjs-course-84422-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedEvents = [];

      for (const key in data) {
        const eventDate = new Date(data[key].date);

        if (
          eventDate.getFullYear() === year &&
          eventDate.getMonth() === month - 1
        ) {
          transformedEvents.push({
            id: key,
            date: data[key].date,
            title: data[key].title,
            image: data[key].image,
            location: data[key].location,
          });
        }
      }
      setFilteredEvents(transformedEvents);
      setisLoading(false);
    }
  }, [data]);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please asjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button url="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (isLoading) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Sorry. No events found for the chosen dates.</p>
        </ErrorAlert>
        <div className="center">
          <Button url="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList eventsToDisplay={filteredEvents} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const eventDate = params.slug;

  return {
    props: {
      date: {
        year: +eventDate[0],
        month: +eventDate[1],
      },
    },
  };
}

export default FilteredEventsPage;
