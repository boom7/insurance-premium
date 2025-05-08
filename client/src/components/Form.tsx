import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setValidationError,
  removeValidationError,
  resetValidation,
  setFormData,
  setCalculationResult,
} from "../redux/formSlice";
import axios from "axios";
import "./../styles/Form.css";

interface FormProps {
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setIsFormSubmitted }) => {
  const dispatch = useDispatch();
  const { formData, validationErrors, isValid } = useSelector(
    (state: any) => state.form
  );
  const [localFormData, setLocalFormData] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    gender: formData.gender || "",
    birthDate: formData.birthDate || "",
    insuranceType: formData.insuranceType || "",
    premiumPerYear: formData.premiumPerYear || "",
    paymentFrequency: formData.paymentFrequency || "YEARLY",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });

    if (validationErrors[name]) {
      dispatch(removeValidationError(name));
    }
  };

  const validateForm = () => {
    let isValidForm = true;
  
    if (!localFormData.firstName) {
      dispatch(
        setValidationError({
          field: "firstName",
          message: "Please enter your first name.",
        })
      );
      isValidForm = false;
    }
    if (!localFormData.lastName) {
      dispatch(
        setValidationError({
          field: "lastName",
          message: "Please enter your last name.",
        })
      );
      isValidForm = false;
    }
    if (!localFormData.gender) {
      dispatch(
        setValidationError({
          field: "gender",
          message: "Please select your gender.",
        })
      );
      isValidForm = false;
    }
    if (!localFormData.birthDate) {
      dispatch(
        setValidationError({
          field: "birthDate",
          message: "Please enter your date of birth.",
        })
      );
      isValidForm = false;
    }
    if (!localFormData.insuranceType) {
      dispatch(
        setValidationError({
          field: "insuranceType",
          message: "Please choose a type of insurance.",
        })
      );
      isValidForm = false;
    }
    const premium = Number(localFormData.premiumPerYear);
    if (!premium || isNaN(premium)) {
      dispatch(
        setValidationError({
          field: "premiumPerYear",
          message: "Please enter a valid number for the annual premium amount.",
        })
      );
      isValidForm = false;
    } else if (premium < 0) {
      dispatch(
        setValidationError({
          field: "premiumPerYear",
          message: "The annual premium cannot be negative.",
        })
      );
      isValidForm = false;
    }
  
    return isValidForm;
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(setFormData(localFormData));
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BFF_URL}/premium-calculation`,
        {
          firstName: localFormData.firstName,
          lastName: localFormData.lastName,
          genderCd: localFormData.gender.toUpperCase(),
          dob: localFormData.birthDate,
          planCode: localFormData.insuranceType,
          premiumPerYear: localFormData.premiumPerYear,
          paymentFrequency: localFormData.paymentFrequency,
        }
      );

      dispatch(setCalculationResult(response.data));
      dispatch(resetValidation());

      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Premium calculation failed:", error);
    } finally {
      // Reset isSubmitting to false once the request completes
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Insurance Premium Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={localFormData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        {validationErrors.firstName && (
          <p className="error">{validationErrors.firstName}</p>
        )}

        <input
          type="text"
          name="lastName"
          value={localFormData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        {validationErrors.lastName && (
          <p className="error">{validationErrors.lastName}</p>
        )}

        <select
          name="gender"
          value={localFormData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        {validationErrors.gender && (
          <p className="error">{validationErrors.gender}</p>
        )}

        <input
          type="date"
          name="birthDate"
          value={localFormData.birthDate}
          onChange={handleChange}
        />
        {validationErrors.birthDate && (
          <p className="error">{validationErrors.birthDate}</p>
        )}

        <input
          type="text"
          name="insuranceType"
          value={localFormData.insuranceType}
          onChange={handleChange}
          placeholder="Plan Code (e.g., T11A20)"
        />
        {validationErrors.insuranceType && (
          <p className="error">{validationErrors.insuranceType}</p>
        )}

        <input
          type="number"
          name="premiumPerYear"
          value={localFormData.premiumPerYear}
          onChange={handleChange}
          placeholder="Premium Per Year"
        />
        {validationErrors.premiumPerYear && (
          <p className="error">{validationErrors.premiumPerYear}</p>
        )}

        <select
          name="paymentFrequency"
          value={localFormData.paymentFrequency}
          onChange={handleChange}
        >
          <option value="YEARLY">YEARLY</option>
          <option value="HALFYEARLY">HALFYEARLY</option>
          <option value="QUARTERLY">QUARTERLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div> 
              <span>Calculating...</span> 
            </>
          ) : (
            "Calculate Premium"
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
