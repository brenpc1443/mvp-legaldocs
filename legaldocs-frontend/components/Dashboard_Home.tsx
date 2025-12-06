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
  Clock,
  CheckCircle,
  LogOut,
  Check,
  X,
  Play,
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

  const pricingPlans = [
    {
      name: "Básico",
      price: "S/. 29",
      period: "/mes",
      description: "Perfecto para emprendedores y pequeños negocios",
      features: [
        "10 documentos por mes",
        "Plantillas básicas",
        "Soporte por email",
        "Exportar en PDF",
        "Almacenamiento 1GB",
      ],
      notIncluded: [
        "Exportar en Word",
        "Soporte prioritario",
        "API Access",
      ],
      highlighted: false,
      buttonText: "Comenzar",
    },
    {
      name: "Profesional",
      price: "S/. 79",
      period: "/mes",
      description: "Ideal para profesionales y estudios legales",
      features: [
        "100 documentos por mes",
        "Todas las plantillas",
        "Soporte prioritario 24/7",
        "Exportar en PDF y Word",
        "Almacenamiento 10GB",
        "API Access",
        "Firma digital",
        "Plantillas personalizadas",
      ],
      notIncluded: [],
      highlighted: true,
      buttonText: "Plan Actual",
    },
    {
      name: "Empresarial",
      price: "S/. 199",
      period: "/mes",
      description: "Para empresas con alto volumen de documentos",
      features: [
        "Documentos ilimitados",
        "Todas las plantillas premium",
        "Soporte dedicado 24/7",
        "Exportar en todos los formatos",
        "Almacenamiento ilimitado",
        "API Access completo",
        "Firma digital avanzada",
        "Plantillas a medida",
        "Integración con sistemas",
        "Capacitación del equipo",
      ],
      notIncluded: [],
      highlighted: false,
      buttonText: "Contactar Ventas",
    },
  ];

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
            <li>
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
            </li>
          </ul>
        </nav>

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
      </aside>

      <div className="ml-64">
        <header
          className="sticky top-0 z-10 border-b bg-white px-8 py-4"
          style={{
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
          }}
        >
          <div className="flex items-center justify-between">
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

        <main className="p-8">
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

          {/* Video Presentation */}
          <div
            className="mb-10 bg-white rounded-[8px] p-8 border"
            style={{
              borderColor: "#e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: "rgba(212, 165, 116, 0.15)" }}
              >
                <Play
                  className="w-6 h-6"
                  style={{ color: "var(--color-gold)" }}
                  strokeWidth={2}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "var(--color-navy)",
                  }}
                >
                  Descubre LegalDocs Perú
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6b7280",
                  }}
                >
                  Aprende cómo generar documentos legales en minutos
                </p>
              </div>
            </div>

            <div
              className="relative rounded-[8px] overflow-hidden"
              style={{
                paddingBottom: "56.25%",
                backgroundColor: "#000",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/QsHIag7l0OI"
                title="LegalDocs Perú - Presentación del Sistema"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Documentos Totales",
                value: stats.total.toString(),
                change: `+${Math.max(1, Math.floor(stats.total * 0.1))} este mes`,
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

          {/* Create Document Card */}
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

          {/* Pricing Section */}
          <div className="mb-10">
            <div className="text-center mb-10">
              <h2
                className="mb-3"
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "var(--color-navy)",
                  letterSpacing: "-0.01em",
                }}
              >
                Planes y Precios
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "400",
                  color: "var(--color-charcoal)",
                  lineHeight: "1.6",
                }}
              >
                Elige el plan perfecto para tus necesidades legales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[8px] border transition-all hover:shadow-lg"
                  style={{
                    borderColor: plan.highlighted ? "var(--color-gold)" : "#e5e7eb",
                    borderWidth: plan.highlighted ? "2px" : "1px",
                    boxShadow: plan.highlighted
                      ? "0 4px 12px 0 rgba(212, 165, 116, 0.2)"
                      : "0 1px 3px 0 rgba(26, 35, 50, 0.08)",
                  }}
                >
                  {plan.highlighted && (
                    <div
                      className="py-2 text-center"
                      style={{
                        backgroundColor: "var(--color-gold)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "var(--color-navy)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        MÁS POPULAR
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <h3
                      className="mb-2"
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "var(--color-navy)",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="mb-6"
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#6b7280",
                        minHeight: "40px",
                      }}
                    >
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span
                        style={{
                          fontSize: "48px",
                          fontWeight: "700",
                          color: "var(--color-navy)",
                        }}
                      >
                        {plan.price}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#6b7280",
                        }}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <button
                      className="w-full px-6 py-3.5 rounded-[8px] mb-6 transition-all hover:shadow-md"
                      style={{
                        backgroundColor: plan.highlighted
                          ? "var(--color-navy)"
                          : "white",
                        color: plan.highlighted
                          ? "var(--color-white)"
                          : "var(--color-navy)",
                        border: plan.highlighted ? "none" : "2px solid #e5e7eb",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {plan.buttonText}
                    </button>

                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: "#dcfce7" }}
                          >
                            <Check
                              className="w-3 h-3"
                              style={{ color: "#10b981" }}
                              strokeWidth={3}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "var(--color-charcoal)",
                              lineHeight: "1.5",
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: "#fee2e2" }}
                          >
                            <X
                              className="w-3 h-3"
                              style={{ color: "#dc2626" }}
                              strokeWidth={3}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#9ca3af",
                              lineHeight: "1.5",
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
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
