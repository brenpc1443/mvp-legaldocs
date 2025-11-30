// LegalDocs Backend - Express.js
import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  HeadingLevel,
  BorderStyle,
} from "docx";
import PDFDocument from "pdfkit";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Validate API Key
if (
  !process.env.OPENROUTER_API_KEY ||
  process.env.OPENROUTER_API_KEY === "sk-or-v1-your-api-key-here"
) {
  console.error("❌ ERROR: OPENROUTER_API_KEY no configurada en .env");
  console.error(
    "Por favor, copia .env.example a .env y configura tu clave API"
  );
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Create documents folder with absolute path
const docsFolder = path.join(__dirname, "generated_documents");
if (!fs.existsSync(docsFolder)) {
  fs.mkdirSync(docsFolder, { recursive: true });
  console.log("📁 Carpeta de documentos creada:", docsFolder);
}

// Template definitions with content structure
const templates = [
  {
    id: 1,
    name: "Contrato de Servicios Profesionales",
    category: "Contratos",
    description: "Contrato estándar para prestación de servicios profesionales",
    fields: [
      "clientName",
      "ruc",
      "serviceType",
      "startDate",
      "endDate",
      "amount",
      "paymentTerms",
      "confidentiality",
    ],
  },
  {
    id: 2,
    name: "Acuerdo de Confidencialidad (NDA)",
    category: "NDAs",
    description: "Acuerdo para proteger información confidencial",
    fields: [
      "disclosingParty",
      "receivingParty",
      "startDate",
      "duration",
      "jurisdiction",
    ],
  },
  {
    id: 3,
    name: "Poder Notarial General",
    category: "Poderes",
    description: "Poder notarial para representación legal",
    fields: [
      "principalName",
      "principalDNI",
      "attorneyName",
      "attorneyDNI",
      "powers",
      "location",
      "date",
    ],
  },
  {
    id: 4,
    name: "Contrato Laboral",
    category: "Contratos",
    description: "Contrato de trabajo bajo régimen laboral",
    fields: [
      "employerName",
      "employeeName",
      "position",
      "salary",
      "startDate",
      "workingHours",
      "benefits",
    ],
  },
];

// Generate document content with AI
async function generateDocumentContent(template, formData) {
  try {
    const prompt = buildPrompt(template.id, formData);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("⚠️ AI API Error:", error.message);
    return generateFallbackContent(template, formData);
  }
}

function buildPrompt(templateId, data) {
  const prompts = {
    1: `Genera un contrato de servicios profesionales en español con los siguientes datos:
    Cliente: ${data.clientName}
    RUC: ${data.ruc}
    Tipo de Servicio: ${data.serviceType}
    Fecha Inicio: ${data.startDate}
    Fecha Término: ${data.endDate}
    Monto: ${data.amount}
    Condiciones de Pago: ${data.paymentTerms}
    Incluir cláusula de confidencialidad: ${data.confidentiality ? "Sí" : "No"}
    
    El documento debe ser formal, legal y completo. Incluye todas las secciones estándar.`,

    2: `Genera un Acuerdo de Confidencialidad (NDA) en español con:
    Parte Divulgadora: ${data.disclosingParty}
    Parte Receptora: ${data.receivingParty}
    Fecha: ${data.startDate}
    Duración: ${data.duration}
    Jurisdicción: ${data.jurisdiction}
    
    Documento formal y completo.`,

    3: `Genera un Poder Notarial General en español:
    Poderdante: ${data.principalName}
    DNI: ${data.principalDNI}
    Apoderado: ${data.attorneyName}
    DNI Apoderado: ${data.attorneyDNI}
    Poderes: ${data.powers}
    Lugar: ${data.location}
    
    Formato legal notarial.`,

    4: `Genera un Contrato Laboral en español:
    Empleador: ${data.employerName}
    Empleado: ${data.employeeName}
    Puesto: ${data.position}
    Salario: ${data.salary}
    Fecha Inicio: ${data.startDate}
    Jornada: ${data.workingHours}
    Beneficios: ${data.benefits}
    
    Formato completo y legal.`,
  };

  return prompts[templateId] || prompts[1];
}

function generateFallbackContent(template, data) {
  const contents = {
    1: `CONTRATO DE SERVICIOS PROFESIONALES
    
Celebrado entre ${data.clientName} (RUC: ${
      data.ruc
    }) y el Prestador de Servicios.

OBJETO: Prestación de servicios de ${data.serviceType}

VIGENCIA: Desde ${data.startDate} hasta ${data.endDate}

CONTRAPRESTACIÓN: S/. ${data.amount}

CONDICIONES DE PAGO: ${data.paymentTerms}

${
  data.confidentiality
    ? "CONFIDENCIALIDAD: Las partes se comprometen a guardar confidencialidad sobre la información compartida."
    : ""
}

Firmado por las partes.`,

    2: `ACUERDO DE CONFIDENCIALIDAD

Entre ${data.disclosingParty} (Divulgadora) y ${data.receivingParty} (Receptora).

Las partes acuerdan guardar confidencialidad sobre toda información compartida.

Fecha: ${data.startDate}
Duración: ${data.duration}
Jurisdicción: ${data.jurisdiction}`,

    3: `PODER NOTARIAL GENERAL

Yo, ${data.principalName}, identificado con DNI N° ${
      data.principalDNI
    }, otorgo poder a ${data.attorneyName}, DNI N° ${data.attorneyDNI}.

PODERES: ${data.powers}

Lugar: ${data.location}
Fecha: ${data.date || new Date().toLocaleDateString()}`,

    4: `CONTRATO LABORAL

EMPLEADOR: ${data.employerName}
EMPLEADO: ${data.employeeName}
PUESTO: ${data.position}
SALARIO: ${data.salary}
FECHA INICIO: ${data.startDate}
JORNADA: ${data.workingHours}
BENEFICIOS: ${data.benefits}`,
  };

  return contents[template.id] || contents[1];
}

// Create Word document
async function createWordDocument(content, fileName) {
  const paragraphs = content.split("\n").map(
    (line) =>
      new Paragraph({
        text: line,
        spacing: { line: 360 },
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join(docsFolder, `${fileName}.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

// Create PDF document
function createPdfDocument(content, fileName) {
  const doc = new PDFDocument();
  const filePath = path.join(docsFolder, `${fileName}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(12);
  const lines = content.split("\n");
  lines.forEach((line) => {
    doc.text(line || " ", { align: "left" });
  });

  doc.end();
  return filePath;
}

// Routes

// Get all templates
app.get("/api/templates", (req, res) => {
  res.json(templates);
});

// Get single template
app.get("/api/templates/:id", (req, res) => {
  const template = templates.find((t) => t.id === parseInt(req.params.id));
  if (!template) return res.status(404).json({ error: "Template not found" });
  res.json(template);
});

// Generate document
app.post("/api/generate-document", async (req, res) => {
  try {
    const { templateId, formData, format } = req.body;

    const template = templates.find((t) => t.id === parseInt(templateId));
    if (!template) return res.status(404).json({ error: "Template not found" });

    // Generate content using AI
    const content = await generateDocumentContent(template, formData);

    const fileName = `${template.name.replace(/\s+/g, "_")}_${Date.now()}`;
    let filePath;

    if (format === "pdf") {
      filePath = createPdfDocument(content, fileName);
    } else {
      filePath = await createWordDocument(content, fileName);
    }

    // Return file for download
    res.download(
      filePath,
      `${template.name}.${format === "pdf" ? "pdf" : "docx"}`
    );
  } catch (error) {
    console.error("❌ Error generating document:", error);
    res
      .status(500)
      .json({ error: "Error generating document", details: error.message });
  }
});

// Get generated documents
app.get("/api/documents", (req, res) => {
  const files = fs.readdirSync(docsFolder).map((file) => ({
    name: file,
    size: fs.statSync(path.join(docsFolder, file)).size,
    created: fs.statSync(path.join(docsFolder, file)).birthtime,
  }));
  res.json(files);
});

// Download document
app.get("/api/download/:fileName", (req, res) => {
  const filePath = path.join(docsFolder, req.params.fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(filePath);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LegalDocs API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 LegalDocs Backend running on http://localhost:${PORT}`);
  console.log(`📋 API Endpoints:`);
  console.log(`   GET  /api/templates`);
  console.log(`   GET  /api/templates/:id`);
  console.log(`   POST /api/generate-document`);
  console.log(`   GET  /api/documents`);
  console.log(`   GET  /api/download/:fileName`);
  console.log(`   GET  /api/health`);
});
