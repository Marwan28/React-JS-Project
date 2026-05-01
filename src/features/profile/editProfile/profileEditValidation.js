export const validateProfile = (formData) => {
  const errors = {};
  const textRegex = /[a-zA-Z\u0600-\u06FF]/;

  if (!formData.name.trim()) {
    errors.name = "Name is required and cannot be empty";
  } else if (!textRegex.test(formData.name)) {
    errors.name = "Name must contain letters and cannot be numbers only";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  const phoneRegex = /^[0-9]+$/;
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = "Phone number must contain digits only";
  } else if (formData.phone.length < 11) {
    errors.phone = "Phone number must be at least 11 digits";
  }

  if (!formData.location.trim()) {
    errors.location = "Location is required";
  } else if (!textRegex.test(formData.location)) {
    errors.location = "Location must contain letters and cannot be numbers only";
  }

  return errors;
};