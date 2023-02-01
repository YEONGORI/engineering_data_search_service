// AdminPrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

function AdminPrivateRoute({ authenticated, component: Component }) {
  return authenticated === 2 ? (
    Component
  ) : (
    <Navigate to="/search" {...alert("관리자 권한이 필요합니다.")} />
  );
}

export default AdminPrivateRoute;
