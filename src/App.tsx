import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import DashboardHome from "./components/Dashboard_Home";
import TemplatesList from "./components/Templates_List";
import TemplateDetail from "./components/Template_Detail";
import CreateDocStep1 from "./components/CreateDoc_Step1_SelectTemplate";
import CreateDocStep2 from "./components/CreateDoc_Step2_FillParams";
import CreateDocStep3 from "./components/CreateDoc_Step3_Review";
import GeneratedSuccessModal from "./components/Generated_Success_Modal";
import MyDocumentsList from "./components/MyDocuments_List";

export default function App() {
  const [currentFrame, setCurrentFrame] = useState("Login");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState(null);

  const navigate = (frame, data = null) => {
    setCurrentFrame(frame);
    if (data) {
      if (data.template) setSelectedTemplate(data.template);
      if (data.formData) setFormData(data.formData);
    }
  };

  const frames = {
    Login: <Login navigate={navigate} />,
    Register: <Register navigate={navigate} />,
    ForgotPassword: <ForgotPassword navigate={navigate} />,
    Dashboard_Home: <DashboardHome navigate={navigate} />,
    Templates_List: <TemplatesList navigate={navigate} />,
    Template_Detail: <TemplateDetail navigate={navigate} template={selectedTemplate} />,
    CreateDoc_Step1_SelectTemplate: <CreateDocStep1 navigate={navigate} />,
    CreateDoc_Step2_FillParams: <CreateDocStep2 navigate={navigate} template={selectedTemplate} />,
    CreateDoc_Step3_Review: <CreateDocStep3 navigate={navigate} formData={formData} template={selectedTemplate} setShowSuccessModal={setShowSuccessModal} />,
    MyDocuments_List: <MyDocumentsList navigate={navigate} />,
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {frames[currentFrame]}
      {showSuccessModal && (
        <GeneratedSuccessModal 
          navigate={navigate} 
          setShowSuccessModal={setShowSuccessModal} 
        />
      )}
    </div>
  );
}
