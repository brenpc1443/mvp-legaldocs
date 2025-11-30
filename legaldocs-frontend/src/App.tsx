import React, { useState } from "react";
import DashboardHome from "../components/Dashboard_Home";
import TemplatesList from "../components/Templates_List";
import TemplateDetail from "../components/Template_Detail";
import CreateDocStep1 from "../components/CreateDoc_Step1_SelectTemplate";
import CreateDocStep2 from "../components/CreateDoc_Step2_FillParams";
import CreateDocStep3 from "../components/CreateDoc_Step3_Review";
import GeneratedSuccessModal from "../components/Generated_Success_Modal";
import MyDocumentsList from "../components/MyDocuments_List";

type FormDataType = {
  clientName: string;
  documentType: string;
  startDate: string;
  ruc: string;
  clauses?: {
    confidentiality?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

export default function App() {
  const [currentFrame, setCurrentFrame] = useState("Dashboard_Home");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    [key: string]: any;
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [formData, setFormData] = useState<FormDataType>({
    clientName: "",
    documentType: "",
    startDate: "",
    ruc: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = (frame: any, data: any = null) => {
    setCurrentFrame(frame);
    if (data) {
      if (data.template) setSelectedTemplate(data.template);
      if (data.formData) setFormData(data.formData);
    }
  };

  const frames = {
    Dashboard_Home: <DashboardHome navigate={navigate} />,
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
      />
    ),
    MyDocuments_List: <MyDocumentsList navigate={navigate} />,
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {frames[currentFrame as keyof typeof frames]}
      {showSuccessModal && (
        <GeneratedSuccessModal
          navigate={navigate}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
