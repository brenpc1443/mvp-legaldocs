import React, { useState, useEffect } from "react";
import {
  Scale,
  ArrowLeft,
  Download,
  CheckCircle,
  Check,
  Loader,
} from "lucide-react";
import { NavigateFunction  } from "../src/types";

const API_URL =
  (import.meta as any).env?.VITE_API_URL ?? "http://localhost:5000";

interface FormDataType {
  clientName?: string;
  documentType?: string;
  startDate?: string;
  ruc?: string;
  [key: string]: any;
}

interface TemplateType {
  id: number;
  name: string;
  [key: string]: any;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface SavedDocument {
  id: string;
  userId: number;
  templateId: number;
  templateName: string;
  fileName: string;
  fileSize?: number;
  createdAt: string;
  filePath?: string;
  format: "pdf" | "docx";
}

interface CreateDocStep3Props {
  navigate: NavigateFunction ;
  formData: FormDataType;
  template: TemplateType;
  setShowSuccessModal: (show: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentUser: User | null;
  onDocumentSaved: (doc: SavedDocument) => void;
}

export default function CreateDocStep3({
  navigate,
  formData,
  template,
  setShowSuccessModal,
  loading,
  setLoading,
  currentUser,
  onDocumentSaved,
}: CreateDocStep3Props) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingComplete, setStreamingComplete] = useState(false);
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(
    null
  );

  if (!formData || !template) {
    formData = {
      clientName: "TechStart Perú S.A.C.",
      documentType: "Consultoría Legal",
      startDate: "2025-12-01",
      ruc: "20123456789",
    };
    template = { id: 1, name: "Contrato de Servicios Profesionales" };
  }

  // Generar contenido al montar el componente
  useEffect(() => {
    const generateContent = async () => {
      setIsStreaming(true);
      setDisplayedContent("");
      setStreamingComplete(false);

      try {
        const response = await fetch(`${API_URL}/api/generate-document`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateId: template.id,
            formData,
            format: "preview",
          }),
        });

        if (!response.ok) throw new Error("Error generating document");

        const content = await response.text();
        setFullContent(content);

        // Efecto de escritura en tiempo real
        let index = 0;
        const interval = setInterval(() => {
          if (index < content.length) {
            setDisplayedContent(content.substring(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
            setIsStreaming(false);
            setStreamingComplete(true);
          }
        }, 15);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error:", error);
        setIsStreaming(false);
      }
    };

    generateContent();
  }, [template.id, formData]);

  const handleGenerateDocument = async (format: "pdf" | "docx") => {
    if (!currentUser) {
      alert("Debes estar autenticado para descargar documentos");
      return;
    }

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
      const fileName = `${template.name}.${format === "pdf" ? "pdf" : "docx"}`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Guardar documento en la lista
      const savedDoc: SavedDocument = {
        id: Date.now().toString(),
        userId: currentUser.id,
        templateId: template.id,
        templateName: template.name,
        fileName: fileName,
        fileSize: blob.size,
        createdAt: new Date().toISOString(),
        format: format,
        filePath: `${template.name.replace(/\s+/g, "_")}_${Date.now()}.${
          format === "pdf" ? "pdf" : "docx"
        }`,
      };

      onDocumentSaved(savedDoc);
      setGeneratedFileName(fileName);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al generar documento. Por favor, intenta de nuevo.");
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
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px]`}
                    style={{
                      backgroundColor: streamingComplete
                        ? "#dcfce7"
                        : isStreaming
                        ? "#dbeafe"
                        : "#f3f4f6",
                    }}
                  >
                    {isStreaming && (
                      <>
                        <Loader
                          className="w-5 h-5 animate-spin"
                          style={{ color: "#3b82f6" }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#1e40af",
                          }}
                        >
                          Generando...
                        </span>
                      </>
                    )}
                    {streamingComplete && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Preview Content */}
              <div className="px-10 py-12">
                <div
                  className="bg-white border-2 rounded-[8px] p-16 min-h-[500px]"
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

                  {/* Contenido con efecto streaming */}
                  <div
                    className="space-y-8"
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.8",
                      color: "var(--color-charcoal)",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {displayedContent}
                    {isStreaming && (
                      <span
                        className="animate-pulse"
                        style={{
                          display: "inline-block",
                          width: "2px",
                          height: "1em",
                          marginLeft: "4px",
                          backgroundColor: "var(--color-gold)",
                          verticalAlign: "text-bottom",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-[8px] border p-8 sticky top-6"
              style={{
                borderColor: "#e5e7eb",
                boxShadow: "0 4px 12px 0 rgba(26, 35, 50, 0.12)",
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
                  disabled={loading || !streamingComplete}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor:
                      streamingComplete && !loading
                        ? "var(--color-navy)"
                        : "#d1d5db",
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
                  disabled={loading || !streamingComplete}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] border transition-all hover:bg-[#f5f6f7] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    borderColor: "#e5e7eb",
                    color:
                      streamingComplete && !loading
                        ? "var(--color-navy)"
                        : "#9ca3af",
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

              {/* Estado de generación */}
              <div
                className="mt-8 pt-6 border-t"
                style={{ borderColor: "#f3f4f6" }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>
                      Estado:
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: streamingComplete
                          ? "#10b981"
                          : isStreaming
                          ? "#3b82f6"
                          : "#9ca3af",
                      }}
                    >
                      {streamingComplete
                        ? "✓ Completado"
                        : isStreaming
                        ? "⟳ Generando..."
                        : "⏳ Esperando"}
                    </span>
                  </div>

                  {displayedContent.length > 0 && fullContent.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        Progreso:
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#3b82f6",
                        }}
                      >
                        {Math.round(
                          (displayedContent.length / fullContent.length) * 100
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
