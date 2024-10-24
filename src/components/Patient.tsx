import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define a type for the patient
interface Patient {
  id: number;
  name: string;
  type: string;
  blood: string;
  booking: string;
  Number: string;
  date: string;
}

export const Patient = () => {
  // Specify the type for the patients state
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  function getPatients() {
    fetch("http://localhost:4000/patient?_sort=id&_order=asc")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        return response.json();
      })
      .then((data: Patient[]) => {
        setPatients(data);
        setError(null); // Clear previous errors
      })
      .catch((err) => {
        setError(err.message); // Use the error variable
        alert("Unable to get the data: " + err.message); // Display the error
      });
  }

  useEffect(() => {
    getPatients();
  }, []);

  function deletePatient(id: number) {
    fetch(`http://localhost:4000/patient/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete patient");
        }
        getPatients();
      })
      .catch((err) => {
        alert("Unable to delete the patient: " + err.message); // Use the error variable
      });
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Appointment</h2>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* Display error if it exists */}
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/patient/create"
            role="button"
          >
            Create An Appointment
          </Link>
          <button
            onClick={getPatients}
            type="button"
            className="btn btn-outline-primary"
          >
            Refresh
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Blood</th>
            <th>Booking</th>
            <th>Number</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.type}</td>
              <td>{patient.blood}</td>
              <td>{patient.booking}</td>
              <td>{patient.Number}</td>
              <td>{patient.date}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Link
                  className="btn btn-primary btn-sm me-1"
                  to={`/admin/patient/edit/${patient.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePatient(patient.id)}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
