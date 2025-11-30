import React, { useState } from "react";
import {
  Scale,
  ArrowLeft,
  Download,
  CheckCircle,
  Check,
  Loader,
} from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

type FormDataType = {
  clientName: string;
  documentType: string;
  startDate: string;
  ruc: string;
  clauses?: {
    confidentiality?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

type TemplateType = {
  id: number;
  name: string;
  [key: string]: any;
};

type CreateDocStep3Props = {
  navigate: (route: string, params?: any) => void;
  formData: FormDataType;
  template: TemplateType;
  setShowSuccessModal: (show: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export default function CreateDocStep3({
  navigate,
  formData,
  template,
  setShowSuccessModal,
  loading,
  setLoading,
}: CreateDocStep3Props) {
  const [documentContent, setDocumentContent] = useState(null);
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(
    null
  );

  if (!formData || !template) {
    formData = {
      clientName: "TechStart Perú S.A.C.",
      documentType: "Consultoría Legal",
      startDate: "2025-12-01",
      ruc: "20123456789",
      clauses: { confidentiality: true },
    };
    template = { id: 1, name: "Contrato de Servicios Profesionales" };
  }

  const handleGenerateDocument = async (format: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-document`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template.id,
          formData,
          format,
        }),
      });

      if (!response.ok) throw new Error("Error generating document");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${template.name}.${format === "pdf" ? "pdf" : "docx"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setGeneratedFileName(`${template.name}.${format}`);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fafbfc]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
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
              <Scale
                className="w-6 h-6"
                style={{ color: "var(--color-gold)" }}
              />
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
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {step.number}
                      </span>
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
                  <div
                    className="flex-1 h-0.5 mx-6"
                    style={{ backgroundColor: "var(--color-navy)" }}
                  />
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
              <div
                className="px-10 py-8 border-b"
                style={{ borderColor: "#f3f4f6" }}
              >
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
                      Generado el {new Date().toLocaleDateString("es-PE")}
                    </p>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px]"
                    style={{ backgroundColor: "#dcfce7" }}
                  >
                    <CheckCircle
                      className="w-5 h-5"
                      style={{ color: "#10b981" }}
                      strokeWidth={2}
                    />
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

              {/* Document Preview Content */}
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
                      {template.name.toUpperCase()}
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
                      Conste por el presente documento de{" "}
                      <strong
                        style={{
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        {template.name}
                      </strong>{" "}
                      que celebran de una parte{" "}
                      <strong
                        style={{
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        {formData.clientName}
                      </strong>
                      , identificado con RUC N°{" "}
                      <strong
                        style={{
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        {formData.ruc}
                      </strong>
                      , a quien en adelante se le denominará{" "}
                      <strong
                        style={{
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        "LAS PARTES"
                      </strong>
                      ...
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
                        DISPOSICIONES GENERALES
                      </h3>
                      <p>
                        El presente documento contiene las disposiciones que
                        rigen la relación entre las partes, incluyendo derechos,
                        obligaciones y condiciones mutuamente acordadas. Este
                        documento será regido por las leyes de la República del
                        Perú.
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
                          CONFIDENCIALIDAD
                        </h3>
                        <p>
                          Las partes se comprometen a mantener en estricta
                          confidencialidad toda la información compartida
                          durante la vigencia del presente acuerdo y después de
                          su terminación...
                        </p>
                      </div>
                    )}

                    <div>
                      <h3
                        className="mb-4"
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--color-navy)",
                        }}
                      >
                        FIRMA DE LAS PARTES
                      </h3>
                      <p>
                        En señal de conformidad con lo pactado, las partes
                        firman el presente documento en la ciudad de Lima, el{" "}
                        {new Date().toLocaleDateString("es-PE")}.
                      </p>
                    </div>
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
                    onClick={() => handleGenerateDocument("pdf")}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-white)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" strokeWidth={2} />
                        Descargar PDF
                      </>
                    )}
                  </button>
                  <button
                    id="btn_export_word"
                    onClick={() => handleGenerateDocument("docx")}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] border transition-all hover:bg-[#f5f6f7] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "var(--color-navy)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" strokeWidth={2} />
                        Descargar Word
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div
                className="p-6 rounded-[8px] border"
                style={{
                  backgroundColor: "#eff6ff",
                  borderColor: "#bfdbfe",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#1e40af",
                    lineHeight: "1.5",
                    textAlign: "center",
                  }}
                >
                  💡 El documento será generado con IA adaptado a tus datos y
                  descargado en tu dispositivo
                </p>
              </div>

              {/* Back Button */}
              <button
                id="btn_back_to_edit"
                onClick={() =>
                  navigate("CreateDoc_Step2_FillParams", { template })
                }
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
