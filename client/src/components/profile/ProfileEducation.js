import React, { Fragment } from "react";
import formatDate from "../../utils/formatDate";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <Fragment>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} -{!to ? "Now" : formatDate(to)}
      </p>
      <p>
        <strong>Degree:</strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study:</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description</strong>
        {description}
      </p>
    </Fragment>
  );
};

export default ProfileEducation;
