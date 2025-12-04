import React from "react";
import {
  Scale,
  FileText,
  Download,
  Eye,
  MoreVertical,
  Search,
  Filter,
} from "lucide-react";

type MyDocumentsListProps = {
  navigate: (route: string, params?: any) => void;
};

export default function MyDocumentsList({ navigate }: MyDocumentsListProps) {
  const documents = [
    {
      id: 1,
      name: "Contrato de Servicios Profesionales",
      type: "Contrato",
      date: "28 Nov 2025",
      status: "Completado",
      statusColor: "#10b981",
    },
    {
      id: 2,
      name: "Poder Notarial General",
      type: "Poder",
      date: "27 Nov 2025",
      status: "En revisión",
      statusColor: "#d4a574",
    },
    {
      id: 3,
      name: "Acuerdo de Confidencialidad (NDA)",
      type: "NDA",
      date: "26 Nov 2025",
      status: "Completado",
      statusColor: "#10b981",
    },
    {
      id: 4,
      name: "Contrato Laboral - Gerente Legal",
      type: "Contrato",
      date: "25 Nov 2025",
      status: "Borrador",
      statusColor: "#6b7280",
    },
    {
      id: 5,
      name: "Escritura de Constitución de Empresa",
      type: "Escritura",
      date: "24 Nov 2025",
      status: "Completado",
      statusColor: "#10b981",
    },
    {
      id: 6,
      name: "Contrato de Arrendamiento Comercial",
      type: "Contrato",
      date: "23 Nov 2025",
      status: "Completado",
      statusColor: "#10b981",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#fafbfc]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
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
            id="btn_back_to_dashboard_docs"
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
            Mis Documentos
          </h1>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "var(--color-charcoal)",
              lineHeight: "1.6",
            }}
          >
            Administra y descarga todos tus documentos legales generados
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--color-charcoal)" }}
            />
            <input
              id="input_search_documents"
              type="text"
              placeholder="Buscar por nombre o tipo..."
              className="w-full pl-12 pr-4 py-3.5 rounded-[8px] border transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: "#e5e7eb",
                backgroundColor: "white",
                color: "var(--color-navy)",
                fontSize: "15px",
              }}
            />
          </div>
          <button
            id="btn_filter"
            className="flex items-center gap-2 px-6 py-3.5 rounded-[8px] border transition-colors hover:bg-[#f5f6f7]"
            style={{
              borderColor: "#e5e7eb",
              color: "var(--color-charcoal)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <Filter className="w-5 h-5" strokeWidth={2} />
            Filtrar
          </button>
        </div>

        {/* Documents Table */}
        <div
          className="bg-white rounded-[8px] border overflow-hidden"
          style={{
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
          }}
        >
          {/* Table Header */}
          <div
            className="px-6 py-5 border-b"
            style={{ borderColor: "#e5e7eb" }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "var(--color-navy)",
              }}
            >
              Todos los Documentos ({documents.length})
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "#e5e7eb" }}>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--color-charcoal)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Nombre
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--color-charcoal)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Tipo
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--color-charcoal)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Fecha
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--color-charcoal)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Estado
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--color-charcoal)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    id={`document_row_${doc.id}`}
                    className="border-b hover:bg-[#fafbfc] transition-colors"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    {/* Name Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "var(--color-navy)" }}
                        >
                          <FileText
                            className="w-5 h-5"
                            style={{ color: "var(--color-gold)" }}
                            strokeWidth={2}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "var(--color-navy)",
                          }}
                        >
                          {doc.name}
                        </span>
                      </div>
                    </td>

                    {/* Type Column */}
                    <td className="px-6 py-5">
                      <span
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "var(--color-charcoal)",
                          backgroundColor: "#f3f4f6",
                        }}
                      >
                        {doc.type}
                      </span>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-5">
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "400",
                          color: "var(--color-charcoal)",
                        }}
                      >
                        {doc.date}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: doc.statusColor }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "var(--color-charcoal)",
                          }}
                        >
                          {doc.status}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          id={`btn_view_${doc.id}`}
                          className="p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
                          title="Ver documento"
                        >
                          <Eye
                            className="w-5 h-5"
                            style={{ color: "var(--color-charcoal)" }}
                            strokeWidth={2}
                          />
                        </button>
                        <button
                          id={`btn_download_${doc.id}`}
                          className="p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
                          title="Descargar"
                        >
                          <Download
                            className="w-5 h-5"
                            style={{ color: "var(--color-charcoal)" }}
                            strokeWidth={2}
                          />
                        </button>
                        <button
                          id={`btn_more_${doc.id}`}
                          className="p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
                          title="Más opciones"
                        >
                          <MoreVertical
                            className="w-5 h-5"
                            style={{ color: "var(--color-charcoal)" }}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div
            className="px-6 py-4 border-t flex items-center justify-between"
            style={{ borderColor: "#e5e7eb" }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: "400",
                color: "#6b7280",
              }}
            >
              Mostrando {documents.length} de {documents.length} documentos
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-[8px] border transition-colors hover:bg-[#f5f6f7]"
                style={{
                  borderColor: "#e5e7eb",
                  color: "var(--color-charcoal)",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 rounded-[8px] border transition-colors hover:bg-[#f5f6f7]"
                style={{
                  borderColor: "#e5e7eb",
                  color: "var(--color-charcoal)",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
