import React, { useState } from "react";
import { Scale, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login({ navigate }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
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
                <Scale className="w-7 h-7" style={{ color: "var(--color-gold)" }} />
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

            {/* Form */}
            <form className="space-y-6">
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
                      <EyeOff className="w-5 h-5" style={{ color: "var(--color-charcoal)" }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: "var(--color-charcoal)" }} />
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
                type="button"
                id="btn_login"
                onClick={() => navigate("Dashboard_Home")}
                className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Iniciar Sesión
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

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "#e5e7eb" }} />
              </div>
              <div className="relative flex justify-center">
                <span
                  className="px-4 bg-white"
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  O continúa con
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
                style={{
                  borderColor: "#e5e7eb",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "var(--color-navy)",
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
                style={{
                  borderColor: "#e5e7eb",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "var(--color-navy)",
                }}
              >
                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>

            {/* CTA for Trial */}
            <div
              className="p-6 rounded-[8px] border"
              style={{
                backgroundColor: "#fefce8",
                borderColor: "var(--color-gold)",
              }}
            >
              <h3
                className="mb-2"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                ¿Aún no tienes cuenta?
              </h3>
              <p
                className="mb-4"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "var(--color-charcoal)",
                }}
              >
                Comienza tu prueba gratuita de 14 días sin compromiso
              </p>
              <button
                type="button"
                id="btn_try_free"
                onClick={() => navigate("Register")}
                className="w-full px-6 py-3 rounded-[8px] transition-all hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-navy)",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Probar Gratis 14 Días
              </button>
            </div>

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
              <Scale className="w-10 h-10" style={{ color: "var(--color-gold)" }} />
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
