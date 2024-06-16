import { Routes, Route } from "react-router-dom";

import ProvinceList from "../pages/Province/ProvinceList.jsx";
import UpdateProvince from "../pages/Province/UpdateProvince.jsx";
import CreateProvince from "../pages/Province/CreateProvince.jsx";
export default function ProvinceRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProvinceList />} />
        <Route path="/create" element={<CreateProvince />} />
        <Route path="/update/:id" element={<UpdateProvince />} />
        {/* <Route path="/read /:id" element={<CreateProvince />} /> */}
      </Routes>
    </div>
  );
}
