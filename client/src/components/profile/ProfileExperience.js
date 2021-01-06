import React, { Fragment } from "react";
import formatDate from "../../utils/formatDate";

const ProfileExperience = ({
  experience: { company, title, locaiton, current, to, from, description },
}) => {
  return (
    <Fragment>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} -{!to ? "Now" : formatDate(to)}
      </p>
      <p>
        <strong>Position:</strong>
        {title}
      </p>
      <p>
        <strong>Description</strong>
        {description}
      </p>
    </Fragment>
  );
};

export default ProfileExperience;
