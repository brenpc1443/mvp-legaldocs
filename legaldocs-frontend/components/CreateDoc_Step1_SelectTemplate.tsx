import React from "react";
import {
  Scale,
  FileText,
  Shield,
  Briefcase,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";
import { NavigateFunction } from "@/types";

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  popular: boolean;
  fields: number;
}

interface CreateDocStep1Props {
  navigate: NavigateFunction;
}

export default function CreateDocStep1({ navigate }: CreateDocStep1Props) {
  const templates: Template[] = [
    {
      id: 1,
      name: "Contrato de Servicios Profesionales",
      category: "Contratos",
      description:
        "Contrato estándar para prestación de servicios profesionales entre empresas",
      icon: Briefcase,
      color: "var(--color-navy)",
      popular: true,
      fields: 8,
    },
    {
      id: 2,
      name: "Acuerdo de Confidencialidad (NDA)",
      category: "NDAs",
      description:
        "Acuerdo de no divulgación para proteger información confidencial",
      icon: Shield,
      color: "#10b981",
      popular: true,
      fields: 5,
    },
    {
      id: 3,
      name: "Poder Notarial General",
      category: "Poderes",
      description:
        "Poder notarial para representación legal en diversos actos jurídicos",
      icon: FileText,
      color: "var(--color-gold)",
      popular: false,
      fields: 6,
    },
    {
      id: 4,
      name: "Contrato Laboral",
      category: "Contratos",
      description: "Contrato de trabajo bajo el régimen laboral peruano",
      icon: Users,
      color: "#6366f1",
      popular: true,
      fields: 12,
    },
  ];

  const [selectedTemplate, setSelectedTemplate] =
    React.useState<Template | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleNext = () => {
    if (selectedTemplate) {
      navigate("CreateDoc_Step2_FillParams", { template: selectedTemplate });
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
          <button
            id="btn_exit"
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
              { number: 1, label: "Elegir Plantilla" },
              { number: 2, label: "Completar Información" },
              { number: 3, label: "Revisar y Generar" },
            ].map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor:
                        step.number === 1 ? "var(--color-navy)" : "#f3f4f6",
                      color:
                        step.number === 1 ? "var(--color-gold)" : "#9ca3af",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {step.number}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: step.number === 1 ? "600" : "500",
                      color:
                        step.number === 1 ? "var(--color-navy)" : "#9ca3af",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className="flex-1 h-0.5 mx-6"
                    style={{ backgroundColor: "#e5e7eb" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1
            className="mb-3"
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "var(--color-navy)",
              letterSpacing: "-0.02em",
            }}
          >
            Paso 1: Elige una Plantilla
          </h1>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "var(--color-charcoal)",
              lineHeight: "1.6",
            }}
          >
            Selecciona el tipo de documento legal que deseas crear
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate?.id === template.id;

            return (
              <div
                key={template.id}
                id={`template_option_${template.id}`}
                onClick={() => handleTemplateSelect(template)}
                className="group bg-white rounded-[8px] border p-6 cursor-pointer transition-all hover:shadow-lg"
                style={{
                  borderColor: isSelected ? "var(--color-gold)" : "#e5e7eb",
                  borderWidth: isSelected ? "2px" : "1px",
                  backgroundColor: isSelected ? "#fefce8" : "white",
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-[8px] flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${template.color}15`,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: template.color }}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--color-navy)",
                          lineHeight: "1.3",
                        }}
                      >
                        {template.name}
                      </h3>
                      {isSelected && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-gold)" }}
                        >
                          <Check
                            className="w-4 h-4"
                            style={{ color: "var(--color-navy)" }}
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "var(--color-charcoal)",
                        lineHeight: "1.6",
                      }}
                    >
                      {template.description}
                    </p>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      {template.fields} campos requeridos
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            id="btn_cancel"
            onClick={() => navigate("Dashboard_Home")}
            className="px-8 py-3.5 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
            style={{
              borderColor: "#e5e7eb",
              color: "var(--color-charcoal)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            Cancelar
          </button>
          <button
            id="btn_next_step"
            onClick={handleNext}
            disabled={!selectedTemplate}
            className="flex items-center gap-2 px-8 py-3.5 rounded-[8px] transition-all"
            style={{
              backgroundColor: selectedTemplate
                ? "var(--color-navy)"
                : "#e5e7eb",
              color: selectedTemplate ? "var(--color-white)" : "#9ca3af",
              fontSize: "15px",
              fontWeight: "600",
              cursor: selectedTemplate ? "pointer" : "not-allowed",
              opacity: selectedTemplate ? 1 : 0.6,
            }}
          >
            Siguiente
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </main>
    </div>
  );
}
