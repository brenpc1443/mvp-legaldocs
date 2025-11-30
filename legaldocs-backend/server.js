// LegalDocs Backend - Express.js con Gemini API + Puppeteer
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";
import mammoth from "mammoth";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Validate API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY no configurada en .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Create documents folder
const docsFolder = path.join(__dirname, "generated_documents");
if (!fs.existsSync(docsFolder)) {
  fs.mkdirSync(docsFolder, { recursive: true });
  console.log("📁 Carpeta de documentos creada:", docsFolder);
}

// Template definitions
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

// Clean Markdown
function cleanMarkdown(text) {
  const lines = text.split("\n");
  let cleanLines = [];
  let skipUntilMarked = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (
      trimmed.match(/^(Como abogado|De acuerdo|Este documento)/i) &&
      !trimmed.match(/^(CONSTE|CLÁUSULA|CONSIDERANDOS)/i)
    ) {
      skipUntilMarked = true;
      return;
    }

    if (trimmed.match(/^(CONSTE|###|RECITALES|CLÁUSULA)/i)) {
      skipUntilMarked = false;
    }

    if (!skipUntilMarked) {
      cleanLines.push(line);
    }
  });

  let cleaned = cleanLines.join("\n");
  cleaned = cleaned.replace(/^-+$/gm, "");
  cleaned = cleaned.replace(/^### /gm, "");
  cleaned = cleaned.replace(/^## /gm, "");
  cleaned = cleaned.replace(/^# /gm, "");
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
  cleaned = cleaned.replace(/\[\*[^\*]*\*\]/g, "");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned;
}

// Convert text to HTML
function textToHTML(content, documentTitle) {
  const lines = content.split("\n");
  let html = "";

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      html += "<br>";
      return;
    }

    // Títulos principales
    if (trimmed.match(/^(CONSTE|CONSIDERANDOS|CONSIDERANDO|RECITALES)/i)) {
      html += `<h2 style="text-align: center; font-weight: bold; margin-top: 20px; margin-bottom: 15px;">${trimmed}</h2>`;
      return;
    }

    // Cláusulas
    if (
      trimmed.match(
        /^(CLÁUSULA|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMO):/i
      )
    ) {
      html += `<h3 style="font-weight: bold; margin-top: 15px; margin-bottom: 10px;">${trimmed}</h3>`;
      return;
    }

    // Numerales
    if (trimmed.match(/^(\d+\.\d+\.?|[a-z]\))/)) {
      html += `<p style="margin-left: 40px; margin-top: 8px; margin-bottom: 8px; line-height: 1.6;">${trimmed}</p>`;
      return;
    }

    // Texto normal
    html += `<p style="margin-top: 8px; margin-bottom: 8px; text-align: justify; line-height: 1.6;">${trimmed}</p>`;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${documentTitle}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 30px;
          line-height: 1.6;
          color: #000;
        }
        h2 {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0 15px 0;
        }
        h3 {
          font-size: 14px;
          font-weight: bold;
          margin: 15px 0 10px 0;
        }
        p {
          font-size: 12px;
          margin: 8px 0;
          text-align: justify;
          line-height: 1.6;
        }
        .page-break {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;

  return fullHTML;
}

// Generate document with Gemini AI
async function generateDocumentContent(template, formData) {
  try {
    const prompt = buildPrompt(template.id, formData);

    console.log("🤖 Enviando a Gemini API...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    let content = result.response.text();

    console.log("✅ Contenido generado por IA (Gemini)");

    content = cleanMarkdown(content);

    if (!content || content.length < 100) {
      console.warn("⚠️ Contenido muy corto, usando fallback");
      return generateFallbackContent(template, formData);
    }

    return content;
  } catch (error) {
    console.error("❌ Error con Gemini API:", error.message);
    console.log("📝 Usando contenido fallback pre-escrito");
    return generateFallbackContent(template, formData);
  }
}

function buildPrompt(templateId, data) {
  const prompts = {
    1: `Eres un abogado experto en Derecho Comercial de Perú. Genera un CONTRATO DE SERVICIOS PROFESIONALES COMPLETO, FORMAL y LEGAL.

Cliente: ${data.clientName}
RUC: ${data.ruc}
Tipo de Servicio: ${data.serviceType}
Fecha Inicio: ${data.startDate}
Fecha Término: ${data.endDate}
Monto: ${data.amount}
Condiciones de Pago: ${data.paymentTerms}
Confidencialidad: ${data.confidentiality ? "Sí" : "No"}

INSTRUCCIONES CRÍTICAS:
- SOLO contenido legal, sin introducción
- Estructura completa con todas las cláusulas
- Lenguaje formal peruano
- Mínimo 2000 caracteres
- SIN Markdown, SIN asteriscos`,

    2: `Eres abogado especialista en NDAs. Genera un ACUERDO DE CONFIDENCIALIDAD COMPLETO para Perú.

Parte Divulgadora: ${data.disclosingParty}
Parte Receptora: ${data.receivingParty}
Fecha: ${data.startDate}
Duración: ${data.duration}
Jurisdicción: ${data.jurisdiction}

INSTRUCCIONES:
- SOLO contenido legal formal
- Todas las secciones estándar
- Mínimo 1500 caracteres
- SIN Markdown`,

    3: `Eres notario de Perú. Genera un PODER NOTARIAL GENERAL VÁLIDO.

Poderdante: ${data.principalName}
DNI: ${data.principalDNI}
Apoderado: ${data.attorneyName}
DNI Apoderado: ${data.attorneyDNI}
Poderes: ${data.powers}
Lugar: ${data.location}

INSTRUCCIONES:
- Formato notarial legal
- Mínimo 1200 caracteres
- SIN Markdown`,

    4: `Eres abogado laboral de Perú. Genera un CONTRATO LABORAL COMPLETO.

Empleador: ${data.employerName}
Empleado: ${data.employeeName}
Puesto: ${data.position}
Salario: ${data.salary}
Inicio: ${data.startDate}
Jornada: ${data.workingHours}
Beneficios: ${data.benefits}

INSTRUCCIONES:
- Cumple D.S. 003-97-TR
- SOLO contenido legal
- Mínimo 1800 caracteres
- SIN Markdown`,
  };

  return prompts[templateId] || prompts[1];
}

function generateFallbackContent(template, data) {
  const contents = {
    1: `CONSTE POR EL PRESENTE DOCUMENTO que celebran de una parte, ${
      data.clientName
    }, con RUC N° ${
      data.ruc
    }, denominado "EL CLIENTE", y de la otra parte, el Prestador de Servicios Profesionales, denominado "EL PRESTADOR".

RECITALES

1. EL CLIENTE es una persona natural que requiere servicios profesionales.
2. EL PRESTADOR es un profesional independiente con experiencia.
3. Las partes acuerdan celebrar este contrato de locación de servicios.

CLÁUSULA PRIMERA: OBJETO
EL PRESTADOR prestará servicios de ${
      data.serviceType
    } al CLIENTE, bajo los términos establecidos en el presente contrato.

CLÁUSULA SEGUNDA: PLAZO
El presente contrato tendrá vigencia desde ${data.startDate} hasta ${
      data.endDate
    }.

CLÁUSULA TERCERA: REMUNERACIÓN
El CLIENTE pagará al PRESTADOR por los servicios prestados la suma de ${
      data.amount
    }, bajo las siguientes condiciones de pago: ${data.paymentTerms}.

CLÁUSULA CUARTA: OBLIGACIONES DEL CLIENTE
a) Realizar el pago de la remuneración en la forma y oportunidad pactadas.
b) Proporcionar toda la información y documentación necesaria.
c) Colaborar activamente con el PRESTADOR.

CLÁUSULA QUINTA: OBLIGACIONES DEL PRESTADOR
a) Ejecutar el servicio con diligencia y profesionalismo.
b) Cumplir con los objetivos establecidos.
c) Guardar reserva sobre las operaciones del CLIENTE.

CLÁUSULA SEXTA: CONFIDENCIALIDAD
${
  data.confidentiality
    ? "Las partes guardarán confidencialidad sobre toda información compartida en relación con este contrato."
    : "No aplica confidencialidad especial."
}

CLÁUSULA SÉPTIMA: TERMINACIÓN
El presente contrato terminará al vencimiento del plazo. Podrá resolverse por incumplimiento grave de cualquiera de las partes.

CLÁUSULA OCTAVA: LEY APLICABLE
El presente contrato se rige conforme a las leyes de la República del Perú.

CLÁUSULA NOVENA: FIRMAS
En señal de conformidad, se firma en Lima, ${new Date().toLocaleDateString(
      "es-PE"
    )}`,

    2: `ACUERDO DE CONFIDENCIALIDAD

CONSTE POR EL PRESENTE que entre ${data.disclosingParty} (PARTE DIVULGADORA) y ${data.receivingParty} (PARTE RECEPTORA) se celebra el presente acuerdo.

RECITALES

Las partes acuerdan proteger información confidencial.

CLÁUSULA PRIMERA: OBJETO
Establecer términos para la protección de información confidencial.

CLÁUSULA SEGUNDA: DEFINICIÓN
Información confidencial: datos comerciales, técnicos, financieros y estratégicos.

CLÁUSULA TERCERA: OBLIGACIONES
La Parte Receptora no divulgará información sin consentimiento de la Parte Divulgadora.

CLÁUSULA CUARTA: TÉRMINO
Vigencia: ${data.duration} años desde ${data.startDate}.

CLÁUSULA QUINTA: LEY APLICABLE
${data.jurisdiction}`,

    3: `PODER NOTARIAL GENERAL

Ante mí, Notario Público, comparece ${
      data.principalName
    }, identificado con DNI N° ${data.principalDNI}.

RECITALES

Manifiesta su libre voluntad de otorgar poder.

CLÁUSULA PRIMERA: PODER OTORGADO
Otorga poder amplio a ${data.attorneyName}, identificado con DNI N° ${
      data.attorneyDNI
    }.

CLÁUSULA SEGUNDA: ALCANCE DEL PODER
${data.powers}

CLÁUSULA TERCERA: VIGENCIA
El poder es válido desde su otorgamiento.

Lugar: ${data.location}
Fecha: ${data.date || new Date().toLocaleDateString("es-PE")}`,

    4: `CONTRATO LABORAL

CONSTE POR EL PRESENTE que entre ${data.employerName} (EMPLEADOR) y ${data.employeeName} (TRABAJADOR) se celebra contrato de trabajo.

RECITALES

Celebran relación laboral conforme a ley.

CLÁUSULA PRIMERA: OBJETO
Prestación de servicios como ${data.position}.

CLÁUSULA SEGUNDA: REMUNERACIÓN
Salario mensual: ${data.salary}.

CLÁUSULA TERCERA: JORNADA
Jornada laboral: ${data.workingHours}.

CLÁUSULA CUARTA: BENEFICIOS
Beneficios: ${data.benefits}.

CLÁUSULA QUINTA: INICIO
Fecha de inicio: ${data.startDate}.

CLÁUSULA SEXTA: LEY APLICABLE
D.S. 003-97-TR y normas laborales vigentes en Perú.`,
  };

  return contents[template.id] || contents[1];
}

// Create PDF using Puppeteer
async function createPdfDocument(htmlContent, fileName) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const filePath = path.join(docsFolder, `${fileName}.pdf`);

    await page.pdf({
      path: filePath,
      format: "A4",
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
      printBackground: true,
    });

    await browser.close();
    console.log("✅ PDF creado correctamente con Puppeteer");
    return filePath;
  } catch (error) {
    if (browser) await browser.close();
    console.error("❌ Error generando PDF:", error);
    throw error;
  }
}

// Create DOCX from HTML
async function createWordDocument(htmlContent, fileName) {
  try {
    const filePath = path.join(docsFolder, `${fileName}.docx`);

    // Eliminar etiquetas HTML y limpiar contenido
    const wordContent = htmlContent
      .replace(/<[^>]*>/g, "\n")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\n\n+/g, "\n\n");

    fs.writeFileSync(filePath, wordContent, "utf8");

    console.log("✅ Documento Word creado correctamente");
    return filePath;
  } catch (error) {
    console.error("❌ Error creando Word:", error);
    throw error;
  }
}

// ROUTES
app.get("/api/templates", (req, res) => {
  res.json(templates);
});

app.get("/api/templates/:id", (req, res) => {
  const template = templates.find((t) => t.id === parseInt(req.params.id));
  if (!template) return res.status(404).json({ error: "Template not found" });
  res.json(template);
});

app.post("/api/generate-document", async (req, res) => {
  try {
    const { templateId, formData, format } = req.body;

    const template = templates.find((t) => t.id === parseInt(templateId));
    if (!template) return res.status(404).json({ error: "Template not found" });

    console.log(`\n📄 Generando documento: ${template.name}`);
    console.log(`📋 Formato: ${format.toUpperCase()}`);

    const content = await generateDocumentContent(template, formData);
    const htmlContent = textToHTML(content, template.name);

    const fileName = `${template.name.replace(/\s+/g, "_")}_${Date.now()}`;
    let filePath;

    if (format === "pdf") {
      filePath = await createPdfDocument(htmlContent, fileName);
    } else {
      filePath = await createWordDocument(htmlContent, fileName);
    }

    console.log(`✅ Documento listo para descargar\n`);

    res.download(
      filePath,
      `${template.name}.${format === "pdf" ? "pdf" : "docx"}`
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({
      error: "Error generating document",
      details: error.message,
    });
  }
});

app.get("/api/documents", (req, res) => {
  const files = fs.readdirSync(docsFolder).map((file) => ({
    name: file,
    size: fs.statSync(path.join(docsFolder, file)).size,
    created: fs.statSync(path.join(docsFolder, file)).birthtime,
  }));
  res.json(files);
});

app.get("/api/download/:fileName", (req, res) => {
  const filePath = path.join(docsFolder, req.params.fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(filePath);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LegalDocs API running with Gemini" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 LegalDocs Backend - Gemini + Puppeteer Edition`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n📊 Modelo IA: Gemini Pro`);
  console.log(
    `✅ API Key configurada: ${process.env.GEMINI_API_KEY ? "Sí" : "No"}`
  );
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   GET  /api/templates`);
  console.log(`   POST /api/generate-document`);
  console.log(`   GET  /api/health\n`);
});
