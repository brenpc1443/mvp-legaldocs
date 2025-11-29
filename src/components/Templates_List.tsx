import React from "react";
import { Scale, FileText, Shield, Briefcase, Users, ArrowRight, Search } from "lucide-react";

export default function TemplatesList({ navigate }) {
  const templates = [
    {
      id: 1,
      name: "Contrato de Servicios Profesionales",
      category: "Contratos",
      description: "Contrato estándar para prestación de servicios profesionales entre empresas",
      icon: Briefcase,
      color: "var(--color-navy)",
      popular: true,
      fields: 8,
    },
    {
      id: 2,
      name: "Acuerdo de Confidencialidad (NDA)",
      category: "NDAs",
      description: "Acuerdo de no divulgación para proteger información confidencial",
      icon: Shield,
      color: "#10b981",
      popular: true,
      fields: 5,
    },
    {
      id: 3,
      name: "Poder Notarial General",
      category: "Poderes",
      description: "Poder notarial para representación legal en diversos actos jurídicos",
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
    {
      id: 5,
      name: "Contrato de Arrendamiento",
      category: "Contratos",
      description: "Contrato de alquiler de inmuebles para uso comercial o residencial",
      icon: Briefcase,
      color: "#f59e0b",
      popular: false,
      fields: 10,
    },
    {
      id: 6,
      name: "Contrato de Compraventa",
      category: "Contratos",
      description: "Contrato para transferencia de propiedad de bienes",
      icon: FileText,
      color: "#ec4899",
      popular: false,
      fields: 9,
    },
  ];

  const handleTemplateClick = (template) => {
    navigate("Template_Detail", { template });
  };

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
            id="btn_back_to_dashboard"
            onClick={() => navigate("Dashboard_Home")}
            className="px-5 py-2.5 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            ← Volver al inicio
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Page Header */}
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
            Plantillas de Documentos Legales
          </h1>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "var(--color-charcoal)",
              lineHeight: "1.6",
            }}
          >
            Explora nuestra colección de más de 100 plantillas legales profesionales
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="relative max-w-xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--color-charcoal)" }}
            />
            <input
              id="input_search_templates"
              type="text"
              placeholder="Buscar plantillas..."
              className="w-full pl-12 pr-4 py-3.5 rounded-[8px] border transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e7eb",
                backgroundColor: "white",
                color: "var(--color-navy)",
                fontSize: "15px",
              }}
            />
          </div>
        </div>

        {/* Popular Badge */}
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            <span>⭐</span>
            <span>Plantillas más usadas</span>
          </span>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                id={`template_card_${template.id}`}
                className="group bg-white rounded-[8px] border p-8 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  borderColor: "#e5e7eb",
                  boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
                }}
              >
                {template.popular && (
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-gold)",
                        color: "var(--color-navy)",
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "0.025em",
                      }}
                    >
                      POPULAR
                    </span>
                  </div>
                )}

                {/* Preview Area */}
                <div
                  className="mb-6 p-6 rounded-[8px] border-2 border-dashed flex items-center justify-center"
                  style={{
                    borderColor: "#e5e7eb",
                    backgroundColor: "#fafbfc",
                    minHeight: "160px",
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-[8px] flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${template.color}15`,
                    }}
                  >
                    <Icon className="w-10 h-10" style={{ color: template.color }} strokeWidth={2} />
                  </div>
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontSize: "19px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                    lineHeight: "1.3",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {template.name}
                </h3>

                <p
                  className="mb-6"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "var(--color-charcoal)",
                    lineHeight: "1.6",
                  }}
                >
                  {template.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "#f3f4f6" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#6b7280",
                    }}
                  >
                    {template.fields} campos
                  </span>
                  <button
                    id={`btn_use_template_${template.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-[8px] transition-all"
                    style={{
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-white)",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Usar plantilla
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
