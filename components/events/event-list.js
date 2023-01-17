import EventItem from "./event-item";

import classes from "./event-list.module.css";

const EventList = ({ eventsToDisplay }) => {
  return (
    <div className={classes.eventsContainer}>
      {eventsToDisplay.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </div>
  );
};

export default EventList;
