import Button from "../ui/button";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

import classes from "./event-item.module.css";

const { eventCard, eventContent, eventDate, eventAddress, actions, icon } =
  classes;

const EventItem = ({ event }) => {
  const { id, date, title, image, location } = event;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatedAddress = location.replace(", ", "\n");

  return (
    <div className={eventCard}>
      <img src={`/${image}`} alt={title} />
      <div className={eventContent}>
        <div>
          <h2>{title}</h2>
          <div className={eventDate}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={eventAddress}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
      </div>
      <div className={actions}>
        <Button url={`/events/${id}`}>
          <span>Explore Event</span>
          <span className={icon}>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default EventItem;
