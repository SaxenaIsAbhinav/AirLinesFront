import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Ticket.css";
import ticketBackground from "../../assets/ticketbg.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Ticket = () => {
  const { state } = useLocation(); // Extract state passed via navigate

  const {
    boarding,
    destination,
    departure_Date,
    departure_Time,
    fair,
    pnr,
    flight_Number,
    seat_Number,
    passenger_Name,
  } = state || {};

  const ticketRef = useRef();

  const downloadPDF = () => {
    const input = ticketRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [400, 580],
      });
      pdf.addImage(imgData, "PNG", 0, 0, 400, 580);
      pdf.save("SKYEASE_Ticket.pdf");
    });
  };

  return (
    <div>
      <div
        className="ticket-container"
        style={{ backgroundImage: `url(${ticketBackground})` }}
        ref={ticketRef}
      >
        <div className="ticket-content">
          <div className="flight-header">
            <div className="flight-route">
              <div className="label">FROM</div>
              <div className="value">{boarding}</div>
              <div className="big-spacer" />
              <div className="label">TO</div>
              <div className="value">{destination}</div>
            </div>

            <div className="datetime">
              <div>
                <span className="label">Date</span>
                <div className="dt-big">{departure_Date}</div>
              </div>
              <div>
                <span className="label">Time</span>
                <div className="dt-big">{departure_Time}</div>
              </div>
            </div>
          </div>

          <div className="flight-info">
            <h2>AIR INDIA</h2>
            <h3>{flight_Number}</h3>
            <p>(Flight No.)</p>
          </div>

          <div className="passenger">
            <div>{passenger_Name}</div>
            <div className="seat">Seat {seat_Number}</div>
          </div>

          <div className="agency">SKYEASE TRAVELS</div>

          <div className="bottom">
            <div>
              PNR #<span className="bold large">{pnr}</span>
            </div>
            <div>
              Fare<span className="bold large"> ₹{fair}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={downloadPDF} className="download-btn">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
