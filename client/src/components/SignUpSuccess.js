import React from "react";

function SignUpSuccess() {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-3">Thank You!</h1>
      <p className="lead">
        <strong>You have succesfully registered</strong>
      </p>
      <p className="lead">
        <a className="btn btn-primary btn-sm" href="/signin" role="button">
          Sign in
        </a>
      </p>
    </div>
  );
}

export default SignUpSuccess;
