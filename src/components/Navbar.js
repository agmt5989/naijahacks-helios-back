import React from 'react'
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
        <Link className="navbar-brand text-white" to="/">
          ClassDrive
        </Link>
        <button
          className="navbar-toggler border-whie"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}
