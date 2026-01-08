import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    if (email && !emailRegex.test(email)) newErrors.email = "Geçersiz email";
    if (password && !passwordRegex.test(password))
      newErrors.password =
        "Şifre en az 8 karakter olmalı ve içinde rakam bulunmalı";
    if (!terms) newErrors.terms = "Şartları kabul etmelisiniz";
    setErrors(newErrors);
  }, [email, password, terms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      navigate("/success");
    }
  };

  const isDisabled =
    Object.keys(errors).length > 0 || !email || !password || !terms;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          Şartları kabul ediyorum
        </label>
        {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
      </div>

      <button type="submit" disabled={isDisabled}>
        Login
      </button>
    </form>
  );
}
