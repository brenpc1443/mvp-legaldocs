import React, { useState, useEffect } from "react";
import DashboardHome from "../components/Dashboard_Home";
import TemplatesList from "../components/Templates_List";
import TemplateDetail from "../components/Template_Detail";
import CreateDocStep1 from "../components/CreateDoc_Step1_SelectTemplate";
import CreateDocStep2 from "../components/CreateDoc_Step2_FillParams";
import CreateDocStep3 from "../components/CreateDoc_Step3_Review";
import GeneratedSuccessModal from "../components/Generated_Success_Modal";
import MyDocumentsList from "../components/MyDocuments_List";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import {
  NavigateFunction,
  FrameType,
  User,
  SavedDocument,
  FormData,
  Template,
} from "./types";

export default function App() {
  const [currentFrame, setCurrentFrame] = useState<FrameType>("Login");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>({
    id: 0,
    name: "",
  });
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    documentType: "",
    startDate: "",
    ruc: "",
  });
  const [loading, setLoading] = useState(false);
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);

  // Load user and documents from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedDocs = localStorage.getItem("documents");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentFrame("Dashboard_Home");
    }

    if (savedDocs) {
      setSavedDocuments(JSON.parse(savedDocs));
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(savedDocuments));
  }, [savedDocuments]);

  const navigate: NavigateFunction = (frame, data = null) => {
    setCurrentFrame(frame);
    if (data) {
      if (data.template) setSelectedTemplate(data.template);
      if (data.formData) setFormData(data.formData);
      if (data.user) setCurrentUser(data.user);
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("Dashboard_Home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("Login");
  };

  const handleAddDocument = (doc: SavedDocument) => {
    setSavedDocuments([...savedDocuments, doc]);
  };

  const handleDeleteDocument = (docId: string) => {
    setSavedDocuments(savedDocuments.filter((doc) => doc.id !== docId));
  };

  const getUserDocuments = (): SavedDocument[] => {
    if (!currentUser) return [];
    return savedDocuments.filter((doc) => doc.userId === currentUser.id);
  };

  const frames: Record<FrameType, React.ReactNode> = {
    Login: <Login navigate={navigate} onLogin={handleLogin} />,
    Register: <Register navigate={navigate} />,
    ForgotPassword: <ForgotPassword navigate={navigate} />,
    Dashboard_Home: (
      <DashboardHome
        navigate={navigate}
        user={currentUser}
        onLogout={handleLogout}
        documents={getUserDocuments()}
      />
    ),
    Templates_List: <TemplatesList navigate={navigate} />,
    Template_Detail: (
      <TemplateDetail navigate={navigate} template={selectedTemplate} />
    ),
    CreateDoc_Step1_SelectTemplate: <CreateDocStep1 navigate={navigate} />,
    CreateDoc_Step2_FillParams: (
      <CreateDocStep2 navigate={navigate} template={selectedTemplate} />
    ),
    CreateDoc_Step3_Review: (
      <CreateDocStep3
        navigate={navigate}
        formData={formData}
        template={selectedTemplate}
        setShowSuccessModal={setShowSuccessModal}
        loading={loading}
        setLoading={setLoading}
        currentUser={currentUser}
        onDocumentSaved={handleAddDocument}
      />
    ),
    MyDocuments_List: (
      <MyDocumentsList
        navigate={navigate}
        documents={getUserDocuments()}
        onDeleteDocument={handleDeleteDocument}
      />
    ),
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {frames[currentFrame]}
      {showSuccessModal && (
        <GeneratedSuccessModal
          navigate={navigate}
          setShowSuccessModal={setShowSuccessModal}
          user={currentUser}
        />
      )}
    </div>
  );
}
