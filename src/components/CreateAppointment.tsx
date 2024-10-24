import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define a type for validation errors
interface ValidationError {
  name?: string;
  booking?: string;
  blood?: string;
  Number?: string;
  date?: string;
  [key: string]: string | undefined; // Allow additional properties
}

export const CreateAppointment = () => {
  const [validationError, setValidationError] = useState<ValidationError>({});
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement); // Type assertion here
    const patient = Object.fromEntries(formData.entries());

    if (
      !patient.name ||
      !patient.booking ||
      !patient.blood ||
      !patient.Number ||
      !patient.date
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/patient", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Created correctly
        navigate("/admin/patient");
      } else if (response.status === 400) {
        setValidationError(data);
      } else {
        alert("Unable to create the appointment!");
      }
    } catch (error) {
      alert("Unable to connect the server!");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded-border p-4">
          <h2 className="text-center mb-5">Create An Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="name" />
                <span className="text-danger">{validationError.name}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Type patient</label>
              <div className="col-sm-8">
                <select name="type" className="form-select">
                  <option value={"Arrival"}>Arrival</option>
                  <option value={"Waiting"}>Waiting</option>
                  <option value={"Current patient"}>Current patient</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Booking Type</label>
              <div className="col-sm-8">
                <select name="booking" className="form-select">
                  <option value={"Pre-Booking"}>Pre-Booking</option>
                  <option value={"Direct-Booking"}>Direct Booking</option>
                  <option value={"Emergency-Case"}>Emergency Case</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Blood</label>
              <div className="col-sm-8">
                <input className="form-control" name="blood" />
                <span className="text-danger">{validationError.blood}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Date</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="date"
                  type="date"
                  step="0.01"
                  min="1"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Number</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="Number"
                  type="tel"
                  placeholder="+963"
                />
                <span className="text-danger">{validationError.Number}</span>
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link
                  className="btn btn-secondary"
                  to="/admin/patient"
                  role="button"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
