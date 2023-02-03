import { Fragment } from "react";

import Alert from "../../components/ui/alert";
import Button from "../../components/ui/button";

const InvalidFilter = () => {
  return (
    <Fragment>
      <Alert>
        <p>Invalid filter. Please asjust your values!</p>
      </Alert>
      <div className="center">
        <Button url="/events">Show All Events</Button>
      </div>
    </Fragment>
  );
};

export default InvalidFilter;
