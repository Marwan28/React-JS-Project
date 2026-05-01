import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Reducer/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(emailRegex, "Invalid email address format")
      .required("email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .required("password is required"),
  });
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#f8fafc]">
      <div className="w-full max-w-md">
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
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to access your account
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                console.log("Login:", values);
                await dispatch(
                  login({
                    email: values.email,
                    password: values.password,
                    rememberMe: values.rememberMe,
                  }),
                ).unwrap();
                navigate(-1);
              } catch (error) {
                console.log("Login failed:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, submitCount, values, setFieldValue }) => (
              <Form className="space-y-5" noValidate>
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                    <Field name="email">
                      {({ field }) => (
                        <input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="w-full pl-11 pr-4 py-2.5 rounded-lg
                        border border-gray-200
                        bg-gray-50
                        text-gray-800 placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-[#243b53]/20 focus:border-[#243b53]
                        transition"
                        />
                      )}
                    </Field>
                  </div>

                  {submitCount > 0 && (
                    <ErrorMessage name="email">
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

                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                    <Field name="password">
                      {({ field }) => (
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full pl-11 pr-11 py-2.5 rounded-lg
                        border border-gray-200
                        bg-gray-50
                        text-gray-800 placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-[#243b53]/20 focus:border-[#243b53]
                        transition"
                        />
                      )}
                    </Field>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {submitCount > 0 && (
                    <ErrorMessage name="password">
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

                {/* Remember */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.rememberMe}
                      onChange={(e) =>
                        setFieldValue("rememberMe", e.target.checked)
                      }
                      className="w-4 h-4 border-gray-300 rounded focus:ring-0 "
                    />
                    <span className="text-gray-600">Remember me</span>
                  </div>

                  <Link
                    to="/forgot-password"
                    className="text-gray-600 hover:text-[#243b53] hover:underline"
                  >
                    Forgot password?
                  </Link>
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
                bg-[#344d60] hover:bg-[#1b2e40] transition"
                >
                  {isSubmitting || loading ? "Loading..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#344d60] font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
