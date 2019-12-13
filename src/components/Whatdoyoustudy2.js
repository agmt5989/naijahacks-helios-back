import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Whatdoyoustudy2 extends Component {
  render() {
    return (
      <div className="col-12 col-md-6 offset-md-3 mt-3 mt-md-5">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="coursecode"
              placeholder="Course Code"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="units"
              placeholder="Units"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="venue"
              placeholder="Venue"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="coordinator"
              placeholder="Coordinator"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="otherlecturers"
              placeholder="Other Lecturers"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pl-4"
              name="daysandtime"
              placeholder="Days and Time"
              required
            />
          </div>
          <button type="submit" className="btn bg-custom w-100">
            Save
          </button>
        </form>
      </div>
    );
  }
}
