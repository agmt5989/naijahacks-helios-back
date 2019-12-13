import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  render() {
    return (
      <div className="col-12 col-md-6 offset-md-3 mt-4 mt-md-5">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="matric-no"
              placeholder="Matric No"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn bg-custom w-100">
            Sign up
          </button>
        </form>
        <h6 className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-custom">
            Login
          </Link>
        </h6>
      </div>
    );
  }
}
