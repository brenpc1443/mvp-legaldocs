import React, { useState } from "react";
import { Scale, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { NavigateFunction } from "@/types";

type RegisterProps = {
  navigate: NavigateFunction;
};

export default function Register({ navigate }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <button
              id="btn_back_to_login"
              onClick={() => navigate("Login")}
              className="flex items-center gap-2 mb-8 transition-colors"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a iniciar sesión
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
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
                Comienza gratis hoy
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "var(--color-charcoal)",
                  lineHeight: "1.6",
                }}
              >
                Crea tu cuenta y empieza a generar documentos legales
                profesionales
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="input_name"
                  className="block mb-3"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Nombre completo
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--color-charcoal)" }}
                  />
                  <input
                    id="input_name"
                    type="text"
                    placeholder="Juan Pérez Mendoza"
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

              {/* Email Field */}
              <div>
                <label
                  htmlFor="input_email_register"
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
                    id="input_email_register"
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
                  htmlFor="input_password_register"
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
                    id="input_password_register"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
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
                <p
                  className="mt-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#6b7280",
                  }}
                >
                  Debe contener al menos 8 caracteres, una mayúscula y un número
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="checkbox_terms"
                  className="mt-1 w-5 h-5 rounded"
                  style={{ accentColor: "var(--color-gold)" }}
                />
                <label
                  htmlFor="checkbox_terms"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Acepto los{" "}
                  <a
                    href="#"
                    style={{ color: "var(--color-gold)", fontWeight: "500" }}
                  >
                    Términos de Servicio
                  </a>{" "}
                  y la{" "}
                  <a
                    href="#"
                    style={{ color: "var(--color-gold)", fontWeight: "500" }}
                  >
                    Política de Privacidad
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="button"
                id="btn_register"
                onClick={() => navigate("Dashboard_Home")}
                className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Crear Cuenta Gratis
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
                  14 días de prueba gratuita • Sin tarjeta de crédito
                </p>
              </div>
            </form>

            {/* Already have account */}
            <div className="text-center mt-8">
              <button
                type="button"
                id="btn_go_to_login"
                onClick={() => navigate("Login")}
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "var(--color-charcoal)",
                }}
              >
                ¿Ya tienes cuenta?{" "}
                <span style={{ color: "var(--color-gold)", fontWeight: "600" }}>
                  Iniciar sesión
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                backgroundColor: "rgba(212, 165, 116, 0.2)",
                color: "var(--color-gold)",
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                Calificación 4.9/5 por más de 500 usuarios
              </span>
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
              Todo lo que necesitas para tus documentos legales
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
              Acceso completo a todas las funciones durante tu prueba gratuita
            </p>

            <div className="space-y-5">
              {[
                {
                  title: "Plantillas ilimitadas",
                  desc: "Acceso completo a más de 100 plantillas legales",
                },
                {
                  title: "Generación instantánea",
                  desc: "Crea documentos profesionales en menos de 5 minutos",
                },
                {
                  title: "Cumplimiento legal garantizado",
                  desc: "Todos los documentos revisados por abogados certificados",
                },
                {
                  title: "Soporte prioritario",
                  desc: "Equipo legal disponible para resolver tus dudas",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0"
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
                  <div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "var(--color-white)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#9ca3af",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
