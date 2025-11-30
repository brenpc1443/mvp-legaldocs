import React from "react";
import { Scale, ArrowLeft, Check, FileText } from "lucide-react";

export default function TemplateDetail({ navigate, template }) {
  if (!template) {
    // Default template if none selected
    template = {
      id: 1,
      name: "Contrato de Servicios Profesionales",
      category: "Contratos",
      description: "Contrato estándar para prestación de servicios profesionales entre empresas",
      color: "var(--color-navy)",
      fields: 8,
    };
  }

  const features = [
    "Plantilla revisada por abogados certificados",
    "Cumple con la legislación peruana vigente",
    "Personalización completa de cláusulas",
    "Descarga en PDF y Word",
    "Actualizaciones automáticas según cambios legales",
  ];

  const requiredFields = [
    "Nombre del cliente o empresa",
    "RUC o DNI",
    "Tipo de servicio",
    "Fecha de inicio y término",
    "Monto del contrato",
    "Forma de pago",
    "Dirección de las partes",
    "Cláusulas adicionales opcionales",
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header
        className="border-b bg-white px-8 py-6"
        style={{
          borderColor: "#e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-[8px] flex items-center justify-center"
              style={{ backgroundColor: "var(--color-navy)" }}
            >
              <Scale className="w-6 h-6" style={{ color: "var(--color-gold)" }} />
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--color-navy)",
              }}
            >
              LegalDocs Perú
            </span>
          </div>
          <button
            id="btn_back_to_templates"
            onClick={() => navigate("Templates_List")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a plantillas
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className="inline-block px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "var(--color-charcoal)",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {template.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="mb-4"
              style={{
                fontSize: "40px",
                fontWeight: "700",
                color: "var(--color-navy)",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              {template.name}
            </h1>

            <p
              className="mb-10"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                color: "var(--color-charcoal)",
                lineHeight: "1.7",
              }}
            >
              {template.description}
            </p>

            {/* Preview Section */}
            <div className="mb-10">
              <h2
                className="mb-6"
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                Vista Previa del Documento
              </h2>
              <div
                className="border-2 border-dashed rounded-[8px] p-12 bg-white"
                style={{
                  borderColor: "#e5e7eb",
                  minHeight: "500px",
                }}
              >
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "var(--color-navy)",
                        marginBottom: "8px",
                      }}
                    >
                      CONTRATO DE SERVICIOS PROFESIONALES
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      Lima, Perú
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />

                    <div className="h-6 bg-gray-300 rounded w-2/3 mt-8" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />

                    <div className="h-6 bg-gray-300 rounded w-2/3 mt-8" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-10">
              <h2
                className="mb-6"
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                Características
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "var(--color-gold)" }}
                    >
                      <Check className="w-4 h-4" style={{ color: "var(--color-navy)" }} strokeWidth={3} />
                    </div>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "var(--color-charcoal)",
                        lineHeight: "1.6",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Fields */}
            <div>
              <h2
                className="mb-6"
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                Información Requerida ({template.fields} campos)
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {requiredFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-[8px] bg-white border"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-gold)" }} strokeWidth={2} />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      {field}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-[8px] border p-8 sticky top-6"
              style={{
                borderColor: "#e5e7eb",
                boxShadow: "0 4px 12px 0 rgba(26, 35, 50, 0.12)",
              }}
            >
              <div
                className="w-16 h-16 rounded-[8px] flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `${template.color}15`,
                }}
              >
                <FileText className="w-8 h-8" style={{ color: template.color }} strokeWidth={2} />
              </div>

              <h3
                className="mb-4"
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                }}
              >
                {template.name}
              </h3>

              <div className="mb-8 space-y-3">
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#f3f4f6" }}>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280" }}>Categoría</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-navy)" }}>
                    {template.category}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#f3f4f6" }}>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280" }}>Campos</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-navy)" }}>
                    {template.fields}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280" }}>Tiempo estimado</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-navy)" }}>5-10 min</span>
                </div>
              </div>

              <button
                id="btn_use_this_template"
                onClick={() => navigate("CreateDoc_Step2_FillParams", { template })}
                className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg mb-4"
                style={{
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Usar Esta Plantilla
              </button>

              <p
                className="text-center"
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#6b7280",
                }}
              >
                Genera tu documento en minutos
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
