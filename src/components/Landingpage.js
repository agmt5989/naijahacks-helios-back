import React from "react";
import {Link} from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      <div className="col-12 landingpage-title">
        <h2>Classdrive</h2>
        <h5>Class. After Class</h5>
      </div>
      <div className="col-8 offset-md-4">
        <div className="row text-center">
          <div className="col-3 col-md-3 mt-5 link-buttons">
            <Link to="/signup">
              <button className="btn bg-custom text-white ">
                <h5>Sign up</h5>
              </button>
            </Link>
          </div>
          <div className="col-3 col-md-3 mt-5">
            <Link to="/login">
              <button className="btn btn-lg bg-default">
                <h5>Login</h5>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
