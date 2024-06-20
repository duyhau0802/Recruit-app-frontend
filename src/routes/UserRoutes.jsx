import { Routes, Route } from "react-router-dom";

import UserList from "../pages/User/UserList.jsx";
export default function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </div>
  );
}
