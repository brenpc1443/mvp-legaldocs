import React from "react";
import {
  Scale,
  FileText,
  Download,
  Eye,
  MoreVertical,
  Search,
  Filter,
  Trash2,
} from "lucide-react";
import { NavigateFunction } from "../src/types";

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

interface MyDocumentsListProps {
  navigate: NavigateFunction;
  documents: SavedDocument[];
  onDeleteDocument: (docId: string) => void;
}

export default function MyDocumentsList({
  navigate,
  documents,
  onDeleteDocument,
}: MyDocumentsListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              Todos los Documentos ({filteredDocuments.length})
            </h2>
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <FileText
                  className="w-8 h-8"
                  style={{ color: "#9ca3af" }}
                  strokeWidth={1.5}
                />
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--color-navy)",
                  marginBottom: "8px",
                }}
              >
                No hay documentos guardados
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#6b7280",
                }}
              >
                Comienza a crear documentos para verlos aquí
              </p>
              <button
                onClick={() => navigate("CreateDoc_Step1_SelectTemplate")}
                className="mt-6 px-6 py-3 rounded-[8px] transition-all hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Crear Primer Documento
              </button>
            </div>
          ) : (
            <>
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
                        Tamaño
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
                    {filteredDocuments.map((doc) => (
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
                              {doc.templateName}
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
                            {doc.format.toUpperCase()}
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
                            {formatDate(doc.createdAt)}
                          </span>
                        </td>

                        {/* Size Column */}
                        <td className="px-6 py-5">
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              color: "var(--color-charcoal)",
                            }}
                          >
                            {formatFileSize(doc.fileSize)}
                          </span>
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
                              id={`btn_delete_${doc.id}`}
                              onClick={() => onDeleteDocument(doc.id)}
                              className="p-2 rounded-[8px] transition-colors hover:bg-red-50"
                              title="Eliminar documento"
                            >
                              <Trash2
                                className="w-5 h-5"
                                style={{ color: "#dc2626" }}
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
                  Mostrando {filteredDocuments.length} de {documents.length}{" "}
                  documentos
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
