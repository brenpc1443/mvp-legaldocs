import React from "react";
import { Scale, ArrowLeft, Download, CheckCircle, Check } from "lucide-react";

export default function CreateDocStep3({ navigate, formData, template, setShowSuccessModal }) {
  if (!formData || !template) {
    formData = { clientName: "TechStart Perú S.A.C.", documentType: "Consultoría Legal", startDate: "2025-12-01", ruc: "20123456789", clauses: { confidentiality: true } };
    template = { name: "Contrato de Servicios Profesionales" };
  }

  const handleGenerateDocument = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header
        className="border-b bg-white px-8 py-5"
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
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b" style={{ borderColor: "#e5e7eb" }}>
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: "Elegir Plantilla", completed: true },
              { number: 2, label: "Completar Información", completed: true },
              { number: 3, label: "Revisar y Generar", active: true },
            ].map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-gold)",
                    }}
                  >
                    {step.completed && !step.active ? (
                      <Check className="w-6 h-6" strokeWidth={2.5} />
                    ) : (
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>{step.number}</span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "var(--color-navy)",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className="flex-1 h-0.5 mx-6" style={{ backgroundColor: "var(--color-navy)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Document Preview */}
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-[8px] border overflow-hidden"
              style={{
                borderColor: "#e5e7eb",
                boxShadow: "0 4px 12px 0 rgba(26, 35, 50, 0.12)",
              }}
            >
              <div className="px-10 py-8 border-b" style={{ borderColor: "#f3f4f6" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className="mb-2"
                      style={{
                        fontSize: "26px",
                        fontWeight: "600",
                        color: "var(--color-navy)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {template.name}
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      Generado el 28 de Noviembre 2025
                    </p>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px]"
                    style={{ backgroundColor: "#dcfce7" }}
                  >
                    <CheckCircle className="w-5 h-5" style={{ color: "#10b981" }} strokeWidth={2} />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#065f46",
                      }}
                    >
                      Listo para exportar
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="px-10 py-12">
                <div
                  className="bg-white border-2 rounded-[8px] p-16 min-h-[800px]"
                  style={{
                    borderColor: "#e5e7eb",
                  }}
                >
                  <div className="text-center mb-12">
                    <h1
                      className="mb-6"
                      style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "var(--color-navy)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      CONTRATO DE SERVICIOS PROFESIONALES
                    </h1>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      Lima, Perú
                    </p>
                  </div>

                  <div
                    className="space-y-8"
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.8",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    <p>
                      Conste por el presente documento el <strong style={{ fontWeight: "600", color: "var(--color-navy)" }}>Contrato de Servicios Profesionales</strong> que
                      celebran de una parte <strong style={{ fontWeight: "600", color: "var(--color-navy)" }}>{formData.clientName}</strong>, identificado con RUC N° {formData.ruc}, a quien en adelante se le denominará <strong style={{ fontWeight: "600", color: "var(--color-navy)" }}>"EL CLIENTE"</strong>...
                    </p>

                    <div>
                      <h3
                        className="mb-4"
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        PRIMERA: OBJETO DEL CONTRATO
                      </h3>
                      <p>
                        El presente contrato tiene por objeto la prestación de servicios de <strong style={{ fontWeight: "600", color: "var(--color-navy)" }}>{formData.documentType}</strong>,
                        que EL PRESTADOR se obliga a realizar en favor de EL CLIENTE...
                      </p>
                    </div>

                    {formData.clauses?.confidentiality && (
                      <div>
                        <h3
                          className="mb-4"
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "var(--color-navy)",
                          }}
                        >
                          SEGUNDA: CONFIDENCIALIDAD
                        </h3>
                        <p>
                          Las partes se comprometen a mantener en estricta confidencialidad toda la
                          información compartida durante la vigencia del presente contrato...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Export Options */}
              <div
                className="bg-white rounded-[8px] border p-8"
                style={{
                  borderColor: "#e5e7eb",
                  boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
                }}
              >
                <h3
                  className="mb-6"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Exportar Documento
                </h3>
                <div className="space-y-4">
                  <button
                    id="btn_export_pdf"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-white)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    <Download className="w-5 h-5" strokeWidth={2} />
                    Descargar PDF
                  </button>
                  <button
                    id="btn_export_word"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "var(--color-navy)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    <Download className="w-5 h-5" strokeWidth={2} />
                    Descargar Word
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button
                id="btn_generate"
                onClick={handleGenerateDocument}
                className="w-full px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-navy)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Generar Documento
              </button>

              {/* Back Button */}
              <button
                id="btn_back_to_edit"
                onClick={() => navigate("CreateDoc_Step2_FillParams", { template })}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
                style={{
                  borderColor: "#e5e7eb",
                  color: "var(--color-charcoal)",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                Volver a editar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
