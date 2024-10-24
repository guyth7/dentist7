import { HashRouter, Routes, Route } from "react-router-dom";
import { Appointments } from "./pages/Appointments";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import NavBar from "./components/NavBar";
import { Patient } from "./components/Patient";
import { CreateAppointment } from "./components/CreateAppointment";
import { EditePatient } from "./components/EditePatient";

export const App = () => {
  return (
    <HashRouter>
      <div className="mx-4 sm:mx-[10%]">
        <NavBar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin/patient" element={<Patient />} />
          <Route path="/admin/patient/create" element={<CreateAppointment />} />
          <Route path="/admin/patient/edit/:id" element={<EditePatient />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </div>
    </HashRouter>
  );
};
