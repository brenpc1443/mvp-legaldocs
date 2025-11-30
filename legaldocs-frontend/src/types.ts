export interface Clauses {
  confidentiality?: boolean;
  termination?: boolean;
  arbitration?: boolean;
  warranty?: boolean;
  [key: string]: any;
}

export interface FormData {
  clientName?: string;
  documentType?: string;
  startDate?: string;
  ruc?: string;
  endDate?: string;
  amount?: string;
  paymentTerms?: string;
  disclosingParty?: string;
  receivingParty?: string;
  duration?: string;
  jurisdiction?: string;
  principalName?: string;
  principalDNI?: string;
  attorneyName?: string;
  attorneyDNI?: string;
  powers?: string;
  location?: string;
  employerName?: string;
  employeeName?: string;
  position?: string;
  salary?: string;
  workingHours?: string;
  benefits?: string;
  clauses?: Clauses;
  [key: string]: any;
}

export interface Template {
  id: number;
  name: string;
  category?: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
  popular?: boolean;
  fields?: number;
  [key: string]: any;
}

export type FrameType =
  | "Dashboard_Home"
  | "Templates_List"
  | "Template_Detail"
  | "CreateDoc_Step1_SelectTemplate"
  | "CreateDoc_Step2_FillParams"
  | "CreateDoc_Step3_Review"
  | "MyDocuments_List";

export interface NavigationData {
  template?: Template;
  formData?: FormData;
}

export type NavigateFunction = (
  frame: FrameType,
  data?: NavigationData | null
) => void;
