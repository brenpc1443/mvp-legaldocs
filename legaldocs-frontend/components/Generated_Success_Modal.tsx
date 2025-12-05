import { CheckCircle, Download, FolderOpen, X } from "lucide-react";
import { NavigateFunction } from "@/types";

interface User {
  id: number;
  name: string;
  email: string;
}

interface GeneratedSuccessModalProps {
  navigate: NavigateFunction;
  setShowSuccessModal: (show: boolean) => void;
  user: User | null;
}

export default function GeneratedSuccessModal({
  navigate,
  setShowSuccessModal,
  // user,
}: GeneratedSuccessModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6"
      style={{ fontFamily: "Inter, sans-serif" }}
      onClick={() => setShowSuccessModal(false)}
    >
      <div
        className="bg-white rounded-[8px] p-10 max-w-md w-full"
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn_close_modal"
          onClick={() => setShowSuccessModal(false)}
          className="ml-auto block p-2 rounded-[8px] transition-colors hover:bg-[#f5f6f7]"
          style={{ color: "var(--color-charcoal)" }}
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#dcfce7" }}
          >
            <CheckCircle
              className="w-12 h-12"
              style={{ color: "#10b981" }}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-center mb-3"
          style={{
            fontSize: "26px",
            fontWeight: "600",
            color: "var(--color-navy)",
            letterSpacing: "-0.01em",
          }}
        >
          ¡Documento Generado!
        </h2>

        {/* Description */}
        <p
          className="text-center mb-8"
          style={{
            fontSize: "15px",
            fontWeight: "400",
            color: "var(--color-charcoal)",
            lineHeight: "1.6",
          }}
        >
          Tu documento ha sido generado correctamente y está guardado en tu
          biblioteca personal.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            id="btn_download_pdf"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("Dashboard_Home");
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] transition-all hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-navy)",
              color: "var(--color-white)",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <Download className="w-5 h-5" strokeWidth={2} />
            Ir al Dashboard
          </button>

          <button
            id="btn_go_to_my_documents"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("MyDocuments_List");
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] border transition-all hover:bg-[#f5f6f7]"
            style={{
              borderColor: "#e5e7eb",
              color: "var(--color-navy)",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <FolderOpen className="w-5 h-5" strokeWidth={2} />
            Ir a Mis Documentos
          </button>
        </div>

        {/* Additional Info */}
        <div
          className="mt-6 p-4 rounded-[8px]"
          style={{
            backgroundColor: "#fefce8",
            border: "1px solid #fef3c7",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#92400e",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            💡 El documento ha sido guardado automáticamente en tu biblioteca
          </p>
        </div>
      </div>
    </div>
  );
}
