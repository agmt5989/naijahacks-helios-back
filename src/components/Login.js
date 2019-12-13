import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div className="col-12 col-md-6 offset-md-3 mt-3 mt-md-5">
        <form>
          <div className="form-group">
            <i className="far fa-envelope place-icon"></i>
            <input
              type="email"
              className="form-control pl-4"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <i className="fas fa-unlock-alt place-icon"></i>
            <input
              type="password"
              className="form-control pl-4"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="col-12 py-4">
            <Link
              to="/forgotpassword"
              className="float-right forgotpassword text-custom"
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn bg-custom w-100">
            Login
          </button>
        </form>
        <h6 className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-custom">
            Register
          </Link>
        </h6>
      </div>
    );
  }
}
