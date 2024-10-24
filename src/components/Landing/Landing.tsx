import "./Landing.css";
export const Landing = () => {
  return (
    <>
      <div className="landing">
        <div className="container">
          <div className="text">
            <h1>Welcome to our clinic</h1>
            <p>
              A dental clinic is a medical facility specialized in providing
              oral and dental care services. The services offered include
              routine check-ups, teeth cleaning, cavity treatment, orthodontics,
              and simple surgical procedures like tooth extraction.
            </p>
          </div>
          <div className="image">
            <img
              decoding="async"
              src="./DentalExam-2.jpg"
              alt="Elzero World Landing"
            />
          </div>
        </div>
      </div>
    </>
  );
};
