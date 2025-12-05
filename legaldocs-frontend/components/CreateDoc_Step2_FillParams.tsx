import { useState } from "react";
import { Scale, ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { NavigateFunction } from "@/types";

interface CreateDocStep2Props {
  navigate: NavigateFunction;
  template: { id: number; [key: string]: any };
}

export default function CreateDocStep2({
  navigate,
  template,
}: CreateDocStep2Props) {
  type FormData = {
    clientName?: string;
    ruc?: string;
    serviceType?: string;
    startDate?: string;
    endDate?: string;
    amount?: string;
    paymentTerms?: string;
    disclosingParty?: string;
    receivingParty?: string;
    duration?: string;
    jurisdiction?: string;
    principalName?: string;
    principalDNI?: string;
    attorneyName?: string;
    attorneyDNI?: string;
    powers?: string;
    location?: string;
    employerName?: string;
    employeeName?: string;
    position?: string;
    salary?: string;
    workingHours?: string;
    benefits?: string;
    clauses: {
      confidentiality: boolean;
      termination: boolean;
      arbitration: boolean;
      warranty: boolean;
    };
    [key: string]: any; // index signature for dynamic access
  };

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    ruc: "",
    serviceType: "",
    startDate: "",
    endDate: "",
    amount: "",
    paymentTerms: "",
    clauses: {
      confidentiality: false,
      termination: false,
      arbitration: false,
      warranty: false,
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("CreateDoc_Step3_Review", { formData, template: { ...template, name: template.name || "" } });
  };

  const handleClauseToggle = (
    clause: "confidentiality" | "termination" | "arbitration" | "warranty"
  ) => {
    setFormData({
      ...formData,
      clauses: {
        ...formData.clauses,
        [clause]: !formData.clauses[clause],
      },
    });
  };

  const getFieldsForTemplate = () => {
    type TemplateKey = "1" | "2" | "3" | "4";
    type Field = {
      name: string;
      label: string;
      placeholder?: string;
      type?: string;
    };
    const templates: Record<TemplateKey, Field[]> = {
      "1": [
        // Contrato de Servicios
        {
          name: "clientName",
          label: "Nombre del Cliente",
          placeholder: "Ej: TechStart Perú S.A.C.",
        },
        { name: "ruc", label: "RUC", placeholder: "20123456789" },
        {
          name: "serviceType",
          label: "Tipo de Servicio",
          placeholder: "Consultoría Legal",
        },
        { name: "startDate", label: "Fecha de Inicio", type: "date" },
        { name: "endDate", label: "Fecha de Término", type: "date" },
        { name: "amount", label: "Monto", placeholder: "S/. 10,000" },
        {
          name: "paymentTerms",
          label: "Condiciones de Pago",
          placeholder: "Pago al contado",
        },
      ],
      "2": [
        // NDA
        {
          name: "disclosingParty",
          label: "Parte Divulgadora",
          placeholder: "Nombre empresa",
        },
        {
          name: "receivingParty",
          label: "Parte Receptora",
          placeholder: "Nombre empresa",
        },
        { name: "startDate", label: "Fecha de Inicio", type: "date" },
        { name: "duration", label: "Duración (años)", placeholder: "2" },
        {
          name: "jurisdiction",
          label: "Jurisdicción",
          placeholder: "Lima, Perú",
        },
      ],
      "3": [
        // Poder Notarial
        {
          name: "principalName",
          label: "Nombre del Poderdante",
          placeholder: "Nombre completo",
        },
        {
          name: "principalDNI",
          label: "DNI del Poderdante",
          placeholder: "12345678",
        },
        {
          name: "attorneyName",
          label: "Nombre del Apoderado",
          placeholder: "Nombre completo",
        },
        {
          name: "attorneyDNI",
          label: "DNI del Apoderado",
          placeholder: "87654321",
        },
        {
          name: "powers",
          label: "Poderes a Otorgar",
          placeholder: "Representación judicial y extrajudicial",
        },
        { name: "location", label: "Lugar", placeholder: "Lima" },
      ],
      "4": [
        // Contrato Laboral
        {
          name: "employerName",
          label: "Nombre del Empleador",
          placeholder: "Nombre empresa",
        },
        {
          name: "employeeName",
          label: "Nombre del Empleado",
          placeholder: "Nombre completo",
        },
        { name: "position", label: "Puesto", placeholder: "Gerente Legal" },
        { name: "salary", label: "Salario", placeholder: "S/. 5,000" },
        { name: "startDate", label: "Fecha de Inicio", type: "date" },
        {
          name: "workingHours",
          label: "Jornada Laboral",
          placeholder: "8 horas diarias",
        },
        {
          name: "benefits",
          label: "Beneficios",
          placeholder: "AFP, Seguros, Gratificaciones",
        },
      ],
    };
    const key = String(template?.id) as TemplateKey;
    return templates[key] || templates["1"];
  };

  const fields = getFieldsForTemplate();

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
          <button
            id="btn_exit_step2"
            onClick={() => navigate("Dashboard_Home")}
            className="px-4 py-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Salir sin guardar
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b" style={{ borderColor: "#e5e7eb" }}>
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: "Elegir Plantilla", completed: true },
              { number: 2, label: "Completar Información", active: true },
              { number: 3, label: "Revisar y Generar", completed: false },
            ].map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor:
                        step.completed || step.active
                          ? "var(--color-navy)"
                          : "#f3f4f6",
                      color:
                        step.completed || step.active
                          ? "var(--color-gold)"
                          : "#9ca3af",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {step.number}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: step.active ? "600" : "500",
                      color:
                        step.completed || step.active
                          ? "var(--color-navy)"
                          : "#9ca3af",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className="flex-1 h-0.5 mx-6"
                    style={{
                      backgroundColor: step.completed
                        ? "var(--color-navy)"
                        : "#e5e7eb",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <button
          id="btn_back_step1"
          onClick={() => navigate("CreateDoc_Step1_SelectTemplate")}
          className="flex items-center gap-2 mb-8 transition-colors"
          style={{
            color: "var(--color-charcoal)",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Cambiar plantilla
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-[8px] border p-10"
              style={{
                borderColor: "#e5e7eb",
                boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
              }}
            >
              <div className="mb-10">
                <h1
                  className="mb-2"
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Paso 2: Completa la Información
                </h1>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Ingresa los datos para generar tu documento
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`input_${field.name}`}
                      className="block mb-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--color-navy)",
                      }}
                    >
                      {field.label} <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      id={`input_${field.name}`}
                      type={field.type || "text"}
                      required
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-[8px] border transition-all focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "#e5e7eb",
                        backgroundColor: "#fafbfc",
                        color: "var(--color-navy)",
                        fontSize: "15px",
                      }}
                    />
                  </div>
                ))}

                {/* Optional Clauses */}
                <div>
                  <label
                    className="block mb-4"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--color-navy)",
                    }}
                  >
                    Cláusulas Opcionales
                  </label>
                  <div className="space-y-4">
                    {[
                      {
                        key: "confidentiality",
                        label: "Cláusula de Confidencialidad",
                        desc: "Protección de información sensible",
                      },
                      {
                        key: "termination",
                        label: "Cláusula de Terminación",
                        desc: "Condiciones para finalizar",
                      },
                      {
                        key: "arbitration",
                        label: "Cláusula de Arbitraje",
                        desc: "Resolución de conflictos",
                      },
                      {
                        key: "warranty",
                        label: "Cláusula de Garantía",
                        desc: "Garantías sobre servicios",
                      },
                    ].map((clause) => (
                      <div
                        key={clause.key}
                        id={`checkbox_${clause.key}`}
                        className="flex items-start gap-4 p-5 rounded-[8px] border cursor-pointer transition-all hover:shadow-sm"
                        style={{
                          borderColor: formData.clauses[
                            clause.key as keyof typeof formData.clauses
                          ]
                            ? "var(--color-gold)"
                            : "#e5e7eb",
                          backgroundColor: formData.clauses[
                            clause.key as keyof typeof formData.clauses
                          ]
                            ? "#fefce8"
                            : "white",
                        }}
                        onClick={() =>
                          handleClauseToggle(
                            clause.key as
                              | "confidentiality"
                              | "termination"
                              | "arbitration"
                              | "warranty"
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.clauses[
                              clause.key as
                                | "confidentiality"
                                | "termination"
                                | "arbitration"
                                | "warranty"
                            ]
                          }
                          onChange={() =>
                            handleClauseToggle(
                              clause.key as
                                | "confidentiality"
                                | "termination"
                                | "arbitration"
                                | "warranty"
                            )
                          }
                          className="mt-0.5 w-5 h-5 rounded"
                          style={{
                            accentColor: "var(--color-gold)",
                          }}
                        />
                        <div className="flex-1">
                          <p
                            className="mb-1"
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "var(--color-navy)",
                            }}
                          >
                            {clause.label}
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: "400",
                              color: "#6b7280",
                            }}
                          >
                            {clause.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8">
                  <button
                    type="button"
                    id="btn_back_step2"
                    onClick={() => navigate("CreateDoc_Step1_SelectTemplate")}
                    className="flex-1 px-6 py-3.5 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "var(--color-charcoal)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    id="btn_generate_preview"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-white)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Generar Vista Previa
                    <ArrowRight className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="hidden lg:block lg:col-span-1">
            <div
              className="bg-white rounded-[8px] border p-8 sticky top-6"
              style={{
                borderColor: "#e5e7eb",
                boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye
                  className="w-5 h-5"
                  style={{ color: "var(--color-gold)" }}
                  strokeWidth={2}
                />
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Vista Previa
                </h3>
              </div>
              <div
                className="aspect-[8.5/11] border-2 rounded-[8px] p-6 mb-6"
                style={{
                  borderColor: "#e5e7eb",
                  backgroundColor: "#fafbfc",
                }}
              >
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-300 rounded w-2/3 mt-6" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#6b7280",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                El documento se generará con IA basado en tu información
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
