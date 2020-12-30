import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteEducation(edu._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <td>School</td>
            <td className="hide-sm">Degree</td>
            <td className="hide-sm">Years</td>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
