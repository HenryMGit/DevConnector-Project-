import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <td>Company</td>
            <td className="hide-sm">Title</td>
            <td className="hide-sm">Years</td>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
