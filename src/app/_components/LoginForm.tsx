"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Animation on submit
    const form = document.querySelector(".login-form");
    gsap.to(form, {
      y: -10,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  };

  const toggleForm = () => {
    // Animation for form switch
    const formContent = document.querySelector(".form-content");

    gsap.to(formContent, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsLogin(!isLogin);
        gsap.to(formContent, {
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  };

  return (
    <motion.div
      className="absolute right-0 top-0 flex h-screen w-1/2 items-center justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        className="login-form w-96 rounded-lg border border-blue-300 border-opacity-30 p-8 backdrop-blur-lg"
        style={{
          background: "rgba(13, 23, 57, 0.7)",
          boxShadow:
            "0 0 25px rgba(0, 140, 255, 0.5), 0 0 5px rgba(0, 140, 255, 0.3) inset",
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="mb-2 text-3xl font-bold text-blue-300">
            {/* Replace with your actual logo */}
            <span className="text-white">Earth</span>Sim
          </div>
          <div className="text-sm text-blue-300">
            Politics • War • Economics
          </div>
        </motion.div>

        {/* Form content */}
        <div className="form-content">
          <h2 className="mb-6 text-center text-xl font-bold text-white">
            {isLogin ? "Login to Your Account" : "Create New Account"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-blue-500 border-opacity-50 bg-transparent px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  placeholder="Email Address"
                  required
                />
                <div className="absolute -right-0.5 top-1/2 h-1 w-1 -translate-y-1/2 transform rounded-full bg-blue-400"></div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-blue-500 border-opacity-50 bg-transparent px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  placeholder="Password"
                  required
                />
                <div className="absolute -right-0.5 top-1/2 h-1 w-1 -translate-y-1/2 transform rounded-full bg-blue-400"></div>
              </div>

              {/* Confirm Password Field (Only for Register) */}
              {!isLogin && (
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-blue-500 border-opacity-50 bg-transparent px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                    placeholder="Confirm Password"
                    required
                  />
                  <div className="absolute -right-0.5 top-1/2 h-1 w-1 -translate-y-1/2 transform rounded-full bg-blue-400"></div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-400 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? "Login" : "Create Account"}
              </motion.button>
            </div>
          </form>

          {/* Form Toggle */}
          <div className="mt-4 text-center">
            <button
              onClick={toggleForm}
              className="text-blue-300 transition-colors hover:text-white"
            >
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-blue-400"></div>
        <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-blue-400"></div>
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400"></div>
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-blue-400"></div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
