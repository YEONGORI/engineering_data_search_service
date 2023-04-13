// PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ authenticated, component: Component }) {
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/" {...alert("정보 변경! 다시 로그인하십시오.")} />
  );
}

export default PrivateRoute;
