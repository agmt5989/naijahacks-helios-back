import React, { Component } from "react";
export default class Whatdoyoustudy extends Component {
  render() {
    return (
      <div className="col-12 col-md-6 offset-md-3 mt-3 mt-md-5">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="university"
              placeholder="University"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="courseordepartment"
              placeholder="Course/Department"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="level"
              placeholder="Level"
              required
            />
          </div>

          <div className="form-group">
            <select className="form-control" name="semester">
              <option defaultChecked>Choose semester</option>
              <option value="first-semester">First Semester</option>
              <option value="second-semester">Second Semester</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Courses"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn bg-custom w-100">
            Next
          </button>
        </form>
      </div>
    );
  }
}
