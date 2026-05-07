import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Eye, EyeOff, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetSignUpState, signUpUser } from "./signUpSlice";

const textRegex = /[a-zA-Z\u0600-\u06FF]/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]+$/;

const initialValues = {
  name: "",
  email: "",
  location: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(textRegex, "Name must contain letters")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .matches(emailRegex, "Invalid email address format")
    .required("Email is required"),
  location: yup
    .string()
    .trim()
    .matches(textRegex, "Location must contain letters")
    .required("Location is required"),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, "Phone number must contain digits only")
    .min(11, "Phone number must be at least 11 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  submitCount,
  rightElement,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-700">{label}</label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <Field name={name}>
          {({ field }) => (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className="w-full pl-11 pr-11 py-2.5 rounded-lg
                border border-gray-200
                bg-gray-50
                text-gray-800 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#243b53]/20 focus:border-[#243b53]
                transition"
            />
          )}
        </Field>

        {rightElement}
      </div>

      {submitCount > 0 && (
        <ErrorMessage name={name}>
          {(message) => (
            <p
              role="alert"
              className="mt-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600"
            >
              {message}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.signUp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(resetSignUpState());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#f8fafc]">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 no-underline"
          >
            <div className="w-11 h-11 bg-[#243b53] rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-xl">L</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              LuxeEstate
            </span>
          </Link>

          <h1 className="text-3xl font-semibold mb-2 text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Sign up to save homes and manage your profile
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md sm:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(
                  signUpUser({
                    name: values.name,
                    email: values.email,
                    location: values.location,
                    phone: values.phone,
                    password: values.password,
                  }),
                ).unwrap();

                navigate("/login", { replace: true });
              } catch (error) {
                console.log("Sign up failed:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, submitCount }) => (
              <Form className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput
                    name="name"
                    label="Full Name"
                    placeholder="Your name"
                    icon={User}
                    submitCount={submitCount}
                  />

                  <FormInput
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="01012345678"
                    icon={Phone}
                    submitCount={submitCount}
                  />
                </div>

                <FormInput
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  submitCount={submitCount}
                />

                <FormInput
                  name="location"
                  label="Location"
                  placeholder="Cairo, Egypt"
                  icon={MapPin}
                  submitCount={submitCount}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    icon={Lock}
                    submitCount={submitCount}
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    }
                  />

                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    icon={Lock}
                    submitCount={submitCount}
                    rightElement={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    }
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-3 rounded-lg text-white font-semibold
                    bg-[#344d60] hover:bg-[#1b2e40] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting || loading ? "Creating account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#344d60] font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
