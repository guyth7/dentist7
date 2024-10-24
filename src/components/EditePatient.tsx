import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export const EditePatient = () => {
  const params = useParams();
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({});
  const [initialData, setInitialData] = useState<Patient | undefined>(
    undefined
  );
  const navigate = useNavigate();

  function getPatient() {
    fetch("http://localhost:4000/patient/" + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch patient data");
      })
      .then((data) => {
        setInitialData(data);
      })
      .catch((err: unknown) => {
        // Specify type as unknown
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"; // Type guard
        alert("Unable to fetch the patient: " + errorMessage); // Alert with error message
      });
  }

  useEffect(getPatient, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
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
      const response = await fetch(
        "http://localhost:4000/patient/" + params.id,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Updated correctly
        navigate("/admin/patient");
      } else if (response.status === 400) {
        setValidationError(data);
      } else {
        alert("Unable to update the appointment!");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"; // Type guard
      alert("Unable to connect to the server: " + errorMessage); // Use 'err' here as well
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded-border p-4">
          <h2 className="text-center mb-5">Edit the appointment</h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input
                readOnly
                className="form-control-plaintext"
                defaultValue={params.id}
              />
            </div>
          </div>

          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="name"
                    defaultValue={initialData.name}
                  />
                  <span className="text-danger">{validationError.name}</span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Type patient</label>
                <div className="col-sm-8">
                  <select
                    name="type"
                    className="form-select"
                    defaultValue={initialData.type}
                  >
                    <option value="Arrival">Arrival</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Current patient">Current patient</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Booking Type</label>
                <div className="col-sm-8">
                  <select
                    name="booking"
                    className="form-select"
                    defaultValue={initialData.booking}
                  >
                    <option value="Pre-Booking">Pre-Booking</option>
                    <option value="Direct-Booking">Direct Booking</option>
                    <option value="Emergency-Case">Emergency Case</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Blood</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="blood"
                    defaultValue={initialData.blood}
                  />
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
                    defaultValue={initialData.date}
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
                    defaultValue={initialData.Number}
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
          )}
        </div>
      </div>
    </div>
  );
};
