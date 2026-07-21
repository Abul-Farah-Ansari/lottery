import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import ConfirmModal from "./ConfirmModal";

import "../styles/admin.css";

function ResultForm({
  selectedResult,
  setSelectedResult,
  setRefresh,
}) {
  const [formData, setFormData] = useState({
    winnerName: "",
    ticketNumber: "",
    drawDate: "",
    drawTime: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (!selectedResult) {
      setFormData({
        winnerName: "",
        ticketNumber: "",
        drawDate: "",
        drawTime: "",
      });
      return;
    }

    setFormData({
      winnerName: selectedResult.winnerName,
      ticketNumber: selectedResult.ticketNumber,
      drawDate: selectedResult.drawDate,
      drawTime: selectedResult.drawTime,
    });
  }, [selectedResult]);

 const drawTimes = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      winnerName: "",
      ticketNumber: "",
      drawDate: "",
      drawTime: "",
    });

    setSelectedResult(null);

    setRefresh((prev) => !prev);
  };

  // Save New Result
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

  // Update Existing Result
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

  // Submit Form
  const handleSubmit = async (e) => {
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
        <input
          type="text"
          name="winnerName"
          placeholder="Winner Name"
          value={formData.winnerName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ticketNumber"
          placeholder="Ticket Number"
          value={formData.ticketNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="drawDate"
          value={formData.drawDate}
          onChange={handleChange}
          required
        />

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
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

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