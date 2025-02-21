import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/features.css";

function Features() {
  return (
    <div className="container px-1">
      <div className="row g-4">
        {[
          { title: "Election Candidates", text: "Secure online election platform for student councils.", link: "/candidate" },
          { title: "Health & Leave", text: "Automated leave & health notification system.", link: "#" },
          { title: "Campus Facility Booking", text: "Book campus places like auditoriums & sports areas.", link: "#" },
          { title: "Application & Approval", text: "Manage event, budget, and sponsorship applications.", link: "/candidate" },
          { title: "Academic Integrity", text: "Track academic integrity and cheating records.", link: "/cheating" },
          { title: "Anonymous Complaints", text: "Submit & moderate anonymous complaints.", link: "/complaint" },
          { title: "Budget & Sponsorship", text: "Manage event budgets, sponsorships & receipts.", link: "#" },
        ].map((feature, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
            <div className="card glass-card p-3 text-center w-100">
              <div className="card-body">
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="small">{feature.text}</p>
                <a href={feature.link} className="btn btn-primary px-4 fw-semibold rounded-pill">
                  Apply
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
