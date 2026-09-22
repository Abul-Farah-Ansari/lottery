import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import ConfirmModal from "./ConfirmModal";

import "../styles/admin.css";

// Draw times: 09:00 AM to 09:00 PM
const drawTimes = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
];

function ResultForm({
  selectedResult,
  setSelectedResult,
  setRefresh,
}) {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const [formData, setFormData] = useState({
    ticketNumber: "",
    hasX: false,
    drawDate: today,
    drawTime: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (!selectedResult) {
      setFormData({
        ticketNumber: "",
        hasX: false,
        drawDate: today,
        drawTime: "",
      });
      return;
    }

    setFormData({
      ticketNumber: selectedResult.ticketNumber,
      hasX: selectedResult.hasX || false,
      drawDate: selectedResult.drawDate,
      drawTime: selectedResult.drawTime,
    });
  }, [selectedResult, today]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ticket number validation
    if (name === "ticketNumber") {
      if (
        value === "" ||
        (/^\d+$/.test(value) &&
          Number(value) >= 1 &&
          Number(value) <= 10)
      ) {
        setFormData((prev) => ({
          ...prev,
          ticketNumber: value,
        }));
      }

      return;
    }

    // X option
    if (name === "hasX") {
      setFormData((prev) => ({
        ...prev,
        hasX: value === "yes",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      ticketNumber: "",
      hasX: false,
      drawDate: today,
      drawTime: "",
    });

    setSelectedResult(null);

    setRefresh((prev) => !prev);
  };

  const saveResult = async () => {
    try {
      await api.post("/result", formData);

      toast.success("Result added successfully!");

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  const updateResult = async () => {
    try {
      await api.put(
        `/result/${selectedResult._id}`,
        formData
      );

      toast.success("Result updated successfully!");

      setShowUpdateModal(false);

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedResult) {
      setShowUpdateModal(true);
    } else {
      saveResult();
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={showUpdateModal}
        title="Update Result"
        message="Are you sure you want to update this lottery result?"
        confirmText="Update"
        cancelText="Cancel"
        onConfirm={updateResult}
        onCancel={() => setShowUpdateModal(false)}
      />

      <form
        className="result-form"
        onSubmit={handleSubmit}
      >
        {/* Ticket Number */}
        <input
          type="number"
          name="ticketNumber"
          placeholder="Ticket Number (1-10)"
          value={formData.ticketNumber}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />

        {/* Add X */}
        <div className="time-picker">
          <label htmlFor="hasX">
            Add X?
          </label>

          <select
            id="hasX"
            name="hasX"
            value={formData.hasX ? "yes" : "no"}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>

          <small>
            Select Yes if the winning number should show X.
          </small>
        </div>

        {/* Draw Date */}
        <input
          type="date"
          name="drawDate"
          value={formData.drawDate}
          onChange={handleChange}
          required
        />

        {/* Draw Time */}
        <div className="time-picker">
          <select
            name="drawTime"
            value={formData.drawTime}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Draw Time
            </option>

            {drawTimes.map((time) => (
              <option
                key={time}
                value={time}
              >
                {time}
              </option>
            ))}
          </select>

          <small>
            Draws are available every 30 minutes from
            09:00 AM to 09:00 PM.
          </small>
        </div>

        {/* Submit */}
        <button type="submit">
          {selectedResult
            ? "Update Result"
            : "Save Result"}
        </button>
      </form>
    </>
  );
}

export default ResultForm;