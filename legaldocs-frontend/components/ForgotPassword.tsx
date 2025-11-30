import React from "react";
import { Scale, Mail, ArrowLeft, Check } from "lucide-react";

export default function ForgotPassword({ navigate }) {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-6 py-12" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[8px] border p-8 md:p-10" style={{ borderColor: "#e5e7eb", boxShadow: "0 4px 12px 0 rgba(26, 35, 50, 0.12)" }}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div
              className="w-16 h-16 rounded-[8px] flex items-center justify-center"
              style={{ backgroundColor: "var(--color-navy)" }}
            >
              <Scale className="w-9 h-9" style={{ color: "var(--color-gold)" }} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="mb-3"
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "var(--color-navy)",
                letterSpacing: "-0.01em",
              }}
            >
              ¿Olvidaste tu contraseña?
            </h1>
            <p
              style={{
                fontSize: "15px",
                fontWeight: "400",
                color: "var(--color-charcoal)",
                lineHeight: "1.6",
              }}
            >
              No te preocupes, te enviaremos instrucciones para recuperarla
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="input_email_forgot"
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
                  id="input_email_forgot"
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

            {/* Send Link Button */}
            <button
              type="button"
              id="btn_send_reset_link"
              className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-navy)",
                color: "var(--color-white)",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Enviar Enlace de Recuperación
            </button>
          </form>

          {/* Info Box */}
          <div
            className="mt-6 p-4 rounded-[8px] flex items-start gap-3"
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "#3b82f6" }}
            >
              <Check className="w-3 h-3" style={{ color: "white" }} strokeWidth={3} />
            </div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "400",
                color: "#1e40af",
                lineHeight: "1.5",
              }}
            >
              Recibirás un correo con instrucciones para restablecer tu contraseña en los próximos minutos
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <button
              type="button"
              id="btn_back_to_login_forgot"
              onClick={() => navigate("Login")}
              className="inline-flex items-center gap-2 transition-colors"
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "var(--color-gold)",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a iniciar sesión
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#6b7280",
            }}
          >
            ¿Necesitas ayuda?{" "}
            <a
              href="#"
              style={{
                color: "var(--color-gold)",
                fontWeight: "500",
              }}
            >
              Contacta a soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
