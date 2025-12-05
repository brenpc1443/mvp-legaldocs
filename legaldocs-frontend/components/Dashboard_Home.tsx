import React from "react";
import {
  Scale,
  Home,
  FileText,
  Plus,
  Folder,
  Settings,
  Search,
  Bell,
  User,
  Download,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle,
  TrendingUp,
  LogOut,
} from "lucide-react";
import {
  NavigateFunction,
  User as userType,
  SavedDocument,
} from "../src/types";

interface DashboardHomeProps {
  navigate: NavigateFunction;
  user: userType | null;
  onLogout: () => void;
  documents?: SavedDocument[];
}

export default function DashboardHome({
  navigate,
  user,
  onLogout,
  documents = [],
}: DashboardHomeProps) {
  // Tomar solo los últimos 3 documentos (más recientes)
  const recentDocuments = documents.slice(-3).reverse();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDocumentStats = () => {
    const total = documents.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = documents.filter((doc) => {
      const docDate = new Date(doc.createdAt);
      return (
        docDate.getMonth() === new Date().getMonth() &&
        docDate.getFullYear() === new Date().getFullYear()
      );
    }).length;

    return { total, thisMonth };
  };

  const stats = getDocumentStats();

  return (
    <div
      className="min-h-screen bg-[#fafbfc]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full w-64 border-r"
        style={{
          backgroundColor: "var(--color-navy)",
          borderColor: "#2a3441",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-6 py-6 border-b"
          style={{ borderColor: "#2a3441" }}
        >
          <div
            className="w-10 h-10 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }}
          >
            <Scale className="w-6 h-6" style={{ color: "var(--color-gold)" }} />
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "var(--color-white)",
            }}
          >
            LegalDocs Perú
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-6">
          <ul className="space-y-2">
            <li>
              <button
                id="nav_inicio"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px]"
                style={{
                  backgroundColor: "rgba(212, 165, 116, 0.15)",
                  color: "var(--color-gold)",
                }}
              >
                <Home className="w-5 h-5" strokeWidth={2} />
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  Inicio
                </span>
              </button>
            </li>
            <li>
              <button
                id="nav_plantillas"
                onClick={() => navigate("Templates_List")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all hover:bg-[rgba(212,165,116,0.1)]"
                style={{ color: "#9ca3af" }}
              >
                <FileText className="w-5 h-5" strokeWidth={2} />
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  Plantillas
                </span>
              </button>
            </li>
            <li>
              <button
                id="nav_generar_documento"
                onClick={() => navigate("CreateDoc_Step1_SelectTemplate")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all hover:bg-[rgba(212,165,116,0.1)]"
                style={{ color: "#9ca3af" }}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  Generar documento
                </span>
              </button>
            </li>
            <li>
              <button
                id="nav_mis_documentos"
                onClick={() => navigate("MyDocuments_List")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all hover:bg-[rgba(212,165,116,0.1)]"
                style={{ color: "#9ca3af" }}
              >
                <Folder className="w-5 h-5" strokeWidth={2} />
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  Mis documentos
                </span>
              </button>
            </li>
            <li>
              <button
                id="nav_configuracion"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all hover:bg-[rgba(212,165,116,0.1)]"
                style={{ color: "#9ca3af" }}
              >
                <Settings className="w-5 h-5" strokeWidth={2} />
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  Configuración
                </span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Usage Stats */}
        <div className="absolute bottom-20 left-3 right-3">
          <div
            className="p-4 rounded-[8px]"
            style={{ backgroundColor: "rgba(212, 165, 116, 0.1)" }}
          >
            <p
              className="mb-2"
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#9ca3af",
              }}
            >
              Documentos este mes
            </p>
            <div className="flex items-baseline gap-2 mb-3">
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "var(--color-white)",
                }}
              >
                {stats.thisMonth}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#9ca3af",
                }}
              >
                / 100
              </span>
            </div>
            <div className="w-full h-2 bg-[#2a3441] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((stats.thisMonth / 100) * 100, 100)}%`,
                  backgroundColor: "var(--color-gold)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-3 left-3 right-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all hover:bg-[rgba(212,165,116,0.1)]"
            style={{ color: "#9ca3af" }}
            id="btn_logout"
          >
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Cerrar sesión
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-10 border-b bg-white px-8 py-4"
          style={{
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--color-charcoal)" }}
                />
                <input
                  id="input_search"
                  type="text"
                  placeholder="Buscar documentos, plantillas..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-[8px] border transition-colors focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "#e5e7eb",
                    backgroundColor: "#fafbfc",
                    color: "var(--color-navy)",
                    fontSize: "15px",
                  }}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 ml-6">
              <button
                id="btn_notifications"
                className="relative p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
              >
                <Bell
                  className="w-5 h-5"
                  style={{ color: "var(--color-charcoal)" }}
                  strokeWidth={2}
                />
              </button>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-navy)" }}
                >
                  <User
                    className="w-5 h-5"
                    style={{ color: "var(--color-gold)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-navy)",
                    }}
                  >
                    {user?.name || "Usuario"}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#6b7280",
                    }}
                  >
                    Plan Profesional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1
              className="mb-2"
              style={{
                fontSize: "32px",
                fontWeight: "600",
                color: "var(--color-navy)",
                letterSpacing: "-0.01em",
              }}
            >
              Bienvenido, {user?.name?.split(" ")[0] || "usuario"}
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "var(--color-charcoal)",
              }}
            >
              {new Date().toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Documentos Totales",
                value: stats.total.toString(),
                change: `+${Math.max(
                  1,
                  Math.floor(stats.total * 0.1)
                )} este mes`,
                icon: FileText,
                color: "var(--color-navy)",
              },
              {
                title: "En Revisión",
                value: "0",
                change: "Sin documentos pendientes",
                icon: Clock,
                color: "var(--color-gold)",
              },
              {
                title: "Completados",
                value: stats.total.toString(),
                change: `${stats.thisMonth} este mes`,
                icon: CheckCircle,
                color: "#10b981",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-[8px] p-6 border"
                  style={{
                    borderColor: "#e5e7eb",
                    boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-[8px] flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: stat.color }}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <h3
                    className="mb-1"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "var(--color-navy)",
                    }}
                  >
                    {stat.value}
                  </h3>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {stat.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "#6b7280",
                    }}
                  >
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Create New Document Card */}
          <div
            id="card_create_new_document"
            onClick={() => navigate("CreateDoc_Step1_SelectTemplate")}
            className="bg-white rounded-[8px] p-8 border mb-10 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: "var(--color-gold)",
              backgroundColor: "#fefce8",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-[8px] flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-gold)" }}
                >
                  <Plus
                    className="w-8 h-8"
                    style={{ color: "var(--color-navy)" }}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      color: "var(--color-navy)",
                    }}
                  >
                    Crear Nuevo Documento
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    Elige una plantilla y genera tu documento legal en minutos
                  </p>
                </div>
              </div>
              <button
                id="btn_create_document"
                className="px-8 py-3.5 rounded-[8px] transition-all hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-white)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Comenzar
              </button>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div
            className="bg-white rounded-[8px] border"
            style={{
              borderColor: "#e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
            }}
          >
            <div
              className="px-6 py-5 border-b"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="flex items-center justify-between">
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Documentos Recientes
                </h2>
                {documents.length > 0 && (
                  <button
                    id="btn_view_all_documents"
                    onClick={() => navigate("MyDocuments_List")}
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-gold)",
                    }}
                  >
                    Ver todos →
                  </button>
                )}
              </div>
            </div>

            {/* Documents List */}
            <div className="divide-y" style={{ borderColor: "#e5e7eb" }}>
              {recentDocuments.length === 0 ? (
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
                    No hay documentos recientes
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
                recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-6 py-5 hover:bg-[#fafbfc] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-12 h-12 rounded-[8px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "var(--color-navy)" }}
                        >
                          <FileText
                            className="w-6 h-6"
                            style={{ color: "var(--color-gold)" }}
                            strokeWidth={2}
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="mb-1"
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "var(--color-navy)",
                            }}
                          >
                            {doc.templateName}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span
                              className="px-2 py-1 rounded-full"
                              style={{
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "var(--color-charcoal)",
                                backgroundColor: "#f3f4f6",
                              }}
                            >
                              {doc.format.toUpperCase()}
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "400",
                                color: "#6b7280",
                              }}
                            >
                              {formatDate(doc.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1.5 rounded-full"
                          style={{
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#065f46",
                            backgroundColor: "#dcfce7",
                          }}
                        >
                          Completado
                        </span>
                        <button
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
                          className="p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
                          title="Descargar"
                        >
                          <Download
                            className="w-5 h-5"
                            style={{ color: "var(--color-charcoal)" }}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
