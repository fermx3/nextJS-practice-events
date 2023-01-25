import { Fragment } from "react";

import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

const InvalidFilter = () => {
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
};

export default InvalidFilter;
