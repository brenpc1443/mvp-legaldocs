import React, { useState } from "react";
import { Scale, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { NavigateFunction } from "@/types";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginProps {
  navigate: NavigateFunction;
  onLogin: (user: User) => void;
}

// Mock users database
const USERS_DB: User[] = [
  { id: 1, name: "Brayan Paredes", email: "brayan@example.com" },
  { id: 2, name: "Usuario Test", email: "test@example.com" },
];

const PASSWORDS: Record<string, string> = {
  "brayan@example.com": "123456",
  "test@example.com": "test123",
};

export default function Login({ navigate, onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = USERS_DB.find((u) => u.email === email);

      if (!user) {
        setError("Usuario no encontrado");
        setLoading(false);
        return;
      }

      if (PASSWORDS[email] !== password) {
        setError("Contraseña incorrecta");
        setLoading(false);
        return;
      }

      onLogin(user);
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div
                className="w-12 h-12 rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: "var(--color-navy)" }}
              >
                <Scale
                  className="w-7 h-7"
                  style={{ color: "var(--color-gold)" }}
                />
              </div>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                LegalDocs Perú
              </span>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h1
                className="mb-3"
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                  letterSpacing: "-0.01em",
                }}
              >
                Bienvenido de vuelta
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "var(--color-charcoal)",
                  lineHeight: "1.6",
                }}
              >
                Ingresa a tu cuenta para continuar generando documentos legales
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 rounded-[8px]"
                style={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fecaca",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#991b1b",
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Demo Users Info */}
            <div
              className="mb-6 p-4 rounded-[8px]"
              style={{
                backgroundColor: "#fef3c7",
                border: "1px solid #fcd34d",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#92400e",
                  marginBottom: "8px",
                }}
              >
                👤 Usuarios de demostración:
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#92400e",
                  marginBottom: "4px",
                }}
              >
                <strong>Email:</strong> brayan@example.com |{" "}
                <strong>Pass:</strong> 123456
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#92400e",
                }}
              >
                <strong>Email:</strong> test@example.com |{" "}
                <strong>Pass:</strong> test123
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="input_email"
                  className="block mb-3"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--color-charcoal)" }}
                  />
                  <input
                    id="input_email"
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-[8px] border transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#e5e7eb",
                      backgroundColor: "#fafbfc",
                      color: "var(--color-navy)",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="input_password"
                  className="block mb-3"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--color-charcoal)" }}
                  />
                  <input
                    id="input_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-[8px] border transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "#e5e7eb",
                      backgroundColor: "#fafbfc",
                      color: "var(--color-navy)",
                      fontSize: "15px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="w-5 h-5"
                        style={{ color: "var(--color-charcoal)" }}
                      />
                    ) : (
                      <Eye
                        className="w-5 h-5"
                        style={{ color: "var(--color-charcoal)" }}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  id="link_forgot"
                  onClick={() => navigate("ForgotPassword")}
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--color-gold)",
                  }}
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                id="btn_login"
                disabled={loading}
                className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg disabled:opacity-60"
                style={{
                  backgroundColor: loading ? "#d1d5db" : "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>

              {/* Benefit Text */}
              <div className="text-center">
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#6b7280",
                  }}
                >
                  Acceso inmediato a más de 100 plantillas legales
                </p>
              </div>
            </form>

            {/* Create Account Link */}
            <div className="text-center mt-6">
              <button
                type="button"
                id="btn_create_account"
                onClick={() => navigate("Register")}
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "var(--color-charcoal)",
                }}
              >
                ¿No tienes cuenta?{" "}
                <span style={{ color: "var(--color-gold)", fontWeight: "600" }}>
                  Crear cuenta
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div
          className="hidden lg:flex items-center justify-center p-12"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <div className="max-w-lg">
            <div
              className="w-16 h-16 rounded-[8px] flex items-center justify-center mb-8"
              style={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }}
            >
              <Scale
                className="w-10 h-10"
                style={{ color: "var(--color-gold)" }}
              />
            </div>

            <h2
              className="mb-6"
              style={{
                fontSize: "36px",
                fontWeight: "700",
                lineHeight: "1.2",
                color: "var(--color-white)",
                letterSpacing: "-0.01em",
              }}
            >
              La forma más rápida de crear documentos legales en Perú
            </h2>

            <p
              className="mb-10"
              style={{
                fontSize: "17px",
                fontWeight: "400",
                lineHeight: "1.6",
                color: "#d1d5db",
              }}
            >
              Únete a más de 1,500 empresas que confían en LegalDocs Perú
            </p>

            <div className="space-y-6">
              {[
                "Más de 100 plantillas legales",
                "Generación en minutos",
                "Revisado por abogados certificados",
                "Soporte legal disponible 24/7",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="var(--color-navy)"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--color-white)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
