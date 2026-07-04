import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError("");
    try {
      const verifyRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: formData.emailId, otp }),
        },
      );

      const verifyText = await verifyRes.text();
      const verifyData = verifyText ? JSON.parse(verifyText) : {};
      if (!verifyRes.ok) throw new Error(verifyData.message || "Invalid OTP");

      const signupRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/signUp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const signupText = await signupRes.text();
      const signupData = signupText ? JSON.parse(signupText) : {};
      if (!signupRes.ok) throw new Error(signupData.error || "Signup failed");

      setSuccessMessage(signupData.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1800); // brief pause so the user actually sees the confirmation
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.emailId }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOtpChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digitsOnly);
    setError("");
  };

  const handleBackToEdit = () => {
    setStep("form");
    setError("");
    setSuccessMessage("");
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10 font-['Manrope',system-ui,sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        .fade-up   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s 0.08s ease both; }
        .fade-up-2 { animation: fadeUp 0.5s 0.16s ease both; }
        .fade-up-3 { animation: fadeUp 0.5s 0.24s ease both; }
        .fade-up-4 { animation: fadeUp 0.5s 0.32s ease both; }
        .fade-up-5 { animation: fadeUp 0.5s 0.40s ease both; }
        .fade-up-6 { animation: fadeUp 0.5s 0.48s ease both; }
        .fade-in   { animation: fadeIn 0.7s ease forwards; }
        .pulse-dot { animation: pulseDot 2s infinite; }
        .pulse-dot-delay-1 { animation: pulseDot 2s infinite; animation-delay: 0.5s; }
        .pulse-dot-delay-2 { animation: pulseDot 2s infinite; animation-delay: 1s; }
      `}</style>

      <div className="w-full max-w-[1060px] flex border-[1.5px] border-[#D5E8DC] rounded-[20px] overflow-hidden min-h-[600px] shadow-[0_8px_40px_rgba(27,67,50,0.07)] max-md:flex-col max-md:rounded-2xl max-md:min-h-0">
        {/* ── Left Panel — Branding ── */}
        <div className="fade-in relative flex-1 flex flex-col justify-center px-[52px] py-14 bg-[#1B4332] overflow-hidden max-md:hidden before:content-[''] before:absolute before:-top-20 before:-right-20 before:w-[260px] before:h-[260px] before:rounded-full before:bg-[#52B72B]/[0.08] before:pointer-events-none after:content-[''] after:absolute after:-bottom-[60px] after:-left-[60px] after:w-[200px] after:h-[200px] after:rounded-full after:bg-[#52B72B]/[0.06] after:pointer-events-none">
          {/* Logo wordmark */}
          <div className="mb-11">
            <span className="text-white font-extrabold text-[21px] tracking-[-0.4px]">
              nex<span className="text-[#52B72B]">Round</span>
            </span>
          </div>

          <h1 className="text-white text-[38px] font-extrabold leading-[1.15] mb-3.5 tracking-[-1px]">
            Join thousands of
            <br />
            <span className="text-[#52B72B]">smart students.</span>
          </h1>

          <p className="text-white/60 text-[15px] leading-[1.75] max-w-[340px] mb-9">
            Share your interview experience, help others prepare, and land your
            dream placement.
          </p>

          <div className="flex flex-wrap mb-10">
            <div className="inline-flex items-center gap-[7px] bg-white/[0.07] border border-white/10 rounded-full px-3.5 py-[7px] text-[12.5px] text-white/65 mr-2 mb-2">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#52B72B]"></span>
              Free forever
            </div>
            <div className="inline-flex items-center gap-[7px] bg-white/[0.07] border border-white/10 rounded-full px-3.5 py-[7px] text-[12.5px] text-white/65 mr-2 mb-2">
              <span className="pulse-dot-delay-1 w-1.5 h-1.5 rounded-full bg-[#52B72B]"></span>
              80+ companies
            </div>
            <div className="inline-flex items-center gap-[7px] bg-white/[0.07] border border-white/10 rounded-full px-3.5 py-[7px] text-[12.5px] text-white/65 mr-2 mb-2">
              <span className="pulse-dot-delay-2 w-1.5 h-1.5 rounded-full bg-[#52B72B]"></span>
              Peer-verified
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="flex flex-col gap-2.5 max-w-[360px]">
            {[
              {
                name: "Priya S.",
                college: "NIT Trichy",
                text: "Got into Atlassian after reading 3 experiences here.",
              },
              {
                name: "Rahul M.",
                college: "BITS Pilani",
                text: "The DSA round tips were exactly what I needed.",
              },
              {
                name: "Aisha K.",
                college: "IIT Bombay",
                text: "Saved months of guesswork on interview prep.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3.5 origin-top"
                style={{
                  opacity: 1 - i * 0.22,
                  transform: `scale(${1 - i * 0.018})`,
                }}
              >
                <p className="text-white/55 text-xs mb-2 italic leading-[1.5]">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#52B72B]/20 flex items-center justify-center text-[#52B72B] font-extrabold text-[11px]">
                    {item.name[0]}
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold">
                      {item.name}
                    </span>
                    <span className="text-white/40 text-[11px] ml-1.5">
                      {item.college}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel — Form ── */}
        <div className="flex-1 flex flex-col justify-center items-center px-[52px] py-14 bg-white max-md:px-7 max-md:py-10">
          <div className="w-full max-w-[380px]">
            {/* Header */}
            <div className="fade-up-1 mb-[30px]">
              <h2 className="text-[#1B4332] text-2xl font-extrabold mb-1.5 tracking-[-0.5px]">
                Create your account
              </h2>
              <p className="text-[#7A9B87] text-[13.5px]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#52B72B] no-underline font-bold"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="fade-up-1 border-b-[1.5px] border-[#EAF4EC] mb-6" />

            {step === "form" ? (
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name row */}
                <div className="fade-up-2 flex gap-3 max-md:flex-col max-md:gap-3.5">
                  <div className="flex-1">
                    <label className="text-[#2D6A4F] text-[12.5px] font-semibold block mb-[7px] tracking-[0.2px]">
                      First name
                    </label>
                    <input
                      className="w-full bg-[#F7FBF8] border-[1.5px] border-[#D5E8DC] rounded-[10px] px-4 py-[13px] text-[#1B4332] text-[14.5px] font-medium outline-none transition-all duration-[180ms] box-border placeholder:text-[#A8C4B2] placeholder:font-normal focus:border-[#52B72B] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(82,183,43,0.12)]"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ravi"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[#2D6A4F] text-[12.5px] font-semibold block mb-[7px] tracking-[0.2px]">
                      Last name
                    </label>
                    <input
                      className="w-full bg-[#F7FBF8] border-[1.5px] border-[#D5E8DC] rounded-[10px] px-4 py-[13px] text-[#1B4332] text-[14.5px] font-medium outline-none transition-all duration-[180ms] box-border placeholder:text-[#A8C4B2] placeholder:font-normal focus:border-[#52B72B] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(82,183,43,0.12)]"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Kumar"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="fade-up-3">
                  <label className="text-[#2D6A4F] text-[12.5px] font-semibold block mb-[7px] tracking-[0.2px]">
                    Email
                  </label>
                  <input
                    className="w-full bg-[#F7FBF8] border-[1.5px] border-[#D5E8DC] rounded-[10px] px-4 py-[13px] text-[#1B4332] text-[14.5px] font-medium outline-none transition-all duration-[180ms] box-border placeholder:text-[#A8C4B2] placeholder:font-normal focus:border-[#52B72B] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(82,183,43,0.12)]"
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="fade-up-4">
                  <label className="text-[#2D6A4F] text-[12.5px] font-semibold block mb-[7px] tracking-[0.2px]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-[#F7FBF8] border-[1.5px] border-[#D5E8DC] rounded-[10px] px-4 py-[13px] pr-[54px] text-[#1B4332] text-[14.5px] font-medium outline-none transition-all duration-[180ms] box-border placeholder:text-[#A8C4B2] placeholder:font-normal focus:border-[#52B72B] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(82,183,43,0.12)]"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#52B72B] cursor-pointer text-[12.5px] font-semibold p-0"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="fade-up bg-[#FEF2F2] border-[1.5px] border-[#FECACA] rounded-[10px] px-3.5 py-[11px] text-[#DC2626] text-[13px] font-medium">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="fade-up-5 mt-1">
                  <button
                    className="w-full bg-[#1B4332] text-white font-bold text-[14.5px] tracking-[0.1px] py-3.5 border-none rounded-[10px] cursor-pointer transition-all duration-[180ms] hover:not-disabled:bg-[#52B72B] hover:not-disabled:shadow-[0_4px_16px_rgba(82,183,43,0.25)] active:not-disabled:scale-[0.985] disabled:opacity-55 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending code…" : "Create account →"}
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={handleVerifyOtp}
                noValidate
              >
                <div className="fade-up-3">
                  <label className="text-[#2D6A4F] text-[12.5px] font-semibold block mb-[7px] tracking-[0.2px]">
                    Enter the 6-digit code sent to {formData.emailId}
                  </label>
                  <input
                    className="w-full bg-[#F7FBF8] border-[1.5px] border-[#D5E8DC] rounded-[10px] px-4 py-[13px] text-[#1B4332] text-[14.5px] font-medium outline-none transition-all duration-[180ms] box-border placeholder:text-[#A8C4B2] placeholder:font-normal focus:border-[#52B72B] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(82,183,43,0.12)]"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="123456"
                  />

                  {error && (
                    <div className="fade-up bg-[#FEF2F2] border-[1.5px] border-[#FECACA] rounded-[10px] px-3.5 py-[11px] text-[#DC2626] text-[13px] font-medium mt-3">
                      {error}
                    </div>
                  )}

                  {successMessage ? (
                    <div className="fade-up bg-[#F0FDF4] border-[1.5px] border-[#BBF7D0] rounded-[10px] px-3.5 py-[11px] text-[#16A34A] text-[13px] font-medium mt-3">
                      ✓ {successMessage} Redirecting to login…
                    </div>
                  ) : (
                    <div className="mt-4">
                      <button
                        className="w-full bg-[#1B4332] text-white font-bold text-[14.5px] tracking-[0.1px] py-3.5 border-none rounded-[10px] cursor-pointer transition-all duration-[180ms] enabled:hover:bg-[#52B72B] enabled:hover:shadow-[0_4px_16px_rgba(82,183,43,0.25)] enabled:active:scale-[0.985] disabled:opacity-55 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={otpLoading || otp.length !== 6}
                      >
                        {otpLoading ? "Verifying…" : "Verify & Create Account"}
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleBackToEdit}
                    className="bg-transparent border-none text-[#7A9B87] text-[12.5px] font-semibold cursor-pointer mt-3 p-0"
                  >
                    ← Edit email
                  </button>
                </div>
              </form>
            )}

            {/* Back link */}
            <div className="fade-up-6 mt-[22px] text-center">
              <Link
                to="/"
                className="text-[#A8C4B2] text-[13px] no-underline font-medium"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
