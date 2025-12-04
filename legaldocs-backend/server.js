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
// Reemplaza la función textToHTML completa:

// Reemplaza textToHTML con la versión original:

function textToHTML(content, documentTitle) {
  const lines = content.split("\n");
  let html = "";

  lines.forEach((line) => {
    let trimmed = line.trim();

    if (!trimmed) {
      html += "<br>";
      return;
    }

    // Convierte **texto** a <strong>texto</strong>
    trimmed = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Títulos principales
    if (trimmed.match(/^(CONSIDERANDOS|CONSIDERANDO|RECITALES)/i)) {
      html += `<h2 style="text-align: center; font-weight: bold; margin-top: 20px; margin-bottom: 15px;">${trimmed}</h2>`;
      return;
    }

    // Cláusulas
    if (
      trimmed.match(
        /^(CLÁUSULA|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMO):/i
      )
    ) {
      html += `<h3 style="font-weight: bold; margin-top: 12px; margin-bottom: 10px;">${trimmed}</h3>`;
      return;
    }

    // Numerales
    if (trimmed.match(/^(\d+\.\d+\.?|[a-z]\))/)) {
      html += `<p style="margin-left: 40px; line-height: 1.6;">${trimmed}</p>`;
      return;
    }

    // Texto normal
    html += `<p style="text-align: justify; line-height: 1.6;">${trimmed}</p>`;
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
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #1a2332;
          margin: 20px 0 10px 0;
          letter-spacing: -0.01em;
        }
        .header p {
          font-size: 16px;
          font-weight: 500;
          color: #3d4451;
          margin: 0;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0 15px 0;
        }
        h3 {
          font-size: 16px;
          font-weight: bold;
          margin: 15px 0 10px 0;
        }
        p {
          font-size: 14px;
          margin: 8px 0;
          text-align: justify;
          line-height: 1.6;
        }
        strong {
          font-weight: bold;
        }
        .page-break {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${documentTitle}</h1>
      </div>
      ${html}
    </body>
    </html>
  `;

  return fullHTML;
}

const documentCache = new Map();

// Y remove cleanMarkdownForPreview si la añadiste, o simplemente borrala

function buildPrompt(templateId, data) {
  const prompts = {
    1: `Eres un abogado especialista en derecho comercial peruano. Genera ÚNICAMENTE un contrato de locación de servicios profesionales según la legislación peruana (Código Civil artículos 1764-1789, Decreto Supremo 003-97-TR). 

DATOS:
- Comitente: ${data.clientName}
- RUC: ${data.ruc}
- Servicio: ${data.serviceType}
- Fecha inicio: ${data.startDate}
- Fecha término: ${data.endDate}
- Monto: ${data.amount}
- Forma de pago: ${data.paymentTerms}
- Confidencialidad: ${
      data.confidentiality ? "Sí incluir cláusula" : "No incluir"
    }

INSTRUCCIONES ESTRICTAS:
- Solo documento legal, sin introducciones ni explicaciones
- Lenguaje jurídico peruano formal y preciso
- Máximo 2500 caracteres
- Estructura clara con cláusulas numeradas
- Citar artículos pertinentes del Código Civil peruano
- Sin saludo, despedida ni comentarios
- Responde SOLO el documento`,

    2: `Eres un abogado especialista en derecho comercial peruano. Genera ÚNICAMENTE un acuerdo de confidencialidad (NDA) según leyes peruanas (Código Civil artículos 1764-1789).

DATOS:
- Parte divulgadora: ${data.disclosingParty}
- Parte receptora: ${data.receivingParty}
- Fecha inicio: ${data.startDate}
- Duración: ${data.duration} años
- Jurisdicción: ${data.jurisdiction}

INSTRUCCIONES ESTRICTAS:
- Solo documento legal, sin introducciones ni explicaciones
- Lenguaje jurídico peruano formal y preciso
- Máximo 2000 caracteres
- Estructura clara con cláusulas numeradas
- Citar artículos pertinentes
- Sin saludo, despedida ni comentarios
- Responde SOLO el documento`,

    3: `Eres un notario peruano especialista en poderes. Genera ÚNICAMENTE un poder general irrevocable según legislación peruana (Código Civil artículos 137-149).

DATOS:
- Poderdante: ${data.principalName}
- DNI poderdante: ${data.principalDNI}
- Apoderado: ${data.attorneyName}
- DNI apoderado: ${data.attorneyDNI}
- Poderes: ${data.powers}
- Lugar: ${data.location}

INSTRUCCIONES ESTRICTAS:
- Solo documento legal, sin introducciones ni explicaciones
- Lenguaje jurídico peruano formal y preciso
- Máximo 1800 caracteres
- Estructura notarial clara
- Citar artículos pertinentes del Código Civil
- Sin saludo, despedida ni comentarios
- Responde SOLO el documento`,

    4: `Eres un abogado laboralista peruano. Genera ÚNICAMENTE un contrato de trabajo a plazo determinado según legislación peruana (D.S. 003-97-TR, Código Civil artículos 1351-1374).

DATOS:
- Empleador: ${data.employerName}
- Empleado: ${data.employeeName}
- Puesto: ${data.position}
- Salario: ${data.salary}
- Fecha inicio: ${data.startDate}
- Jornada: ${data.workingHours}
- Beneficios: ${data.benefits}

INSTRUCCIONES ESTRICTAS:
- Solo documento legal, sin introducciones ni explicaciones
- Lenguaje jurídico peruano formal y preciso
- Máximo 2200 caracteres
- Estructura clara con cláusulas numeradas
- Citar D.S. 003-97-TR y artículos pertinentes
- Incluir beneficios según ley laboral peruana
- Sin saludo, despedida ni comentarios
- Responde SOLO el documento`,
  };

  return prompts[templateId] || prompts[1];
}

function cleanMarkdownForPreview(text) {
  // Convierte Markdown a formato visual de texto
  return (
    text
      // Negritas: **texto** -> [NEGRITA] texto [/NEGRITA] (para mostrar visualmente)
      .replace(/\*\*(.*?)\*\*/g, (match, content) => {
        return content.toUpperCase(); // O usa otro formato visual
      })
      // Cursivas: *texto* -> _texto_
      .replace(/\*(.*?)\*/g, "$1")
      // Limpia markdowns sobrantes
      .trim()
  );
}

// Generate document with Gemini AI
async function generateDocumentContent(template, formData) {
  try {
    // Crea una clave única para este documento
    const cacheKey = `${template.id}_${JSON.stringify(formData)}`;

    // Si ya existe en cache, devuelve el contenido cached
    if (documentCache.has(cacheKey)) {
      console.log("✅ Usando contenido en caché");
      return documentCache.get(cacheKey);
    }

    const prompt = buildPrompt(template.id, formData);

    console.log("🤖 Enviando a Gemini API...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    let content = result.response.text();

    console.log("✅ Contenido generado por IA (Gemini)");

    // Limpia backticks de código si los hay
    content = content.replace(/^```[\w]*\n?/gm, "").replace(/\n?```$/gm, "");
    content = content.trim();

    if (!content || content.length < 100) {
      console.warn("⚠️ Contenido muy corto, usando fallback");
      content = generateFallbackContent(template, formData);
    }

    // Cachea el contenido
    documentCache.set(cacheKey, content);

    return content;
  } catch (error) {
    console.error("❌ Error con Gemini API:", error.message);
    console.log("📝 Usando contenido fallback pre-escrito");
    const fallbackContent = generateFallbackContent(template, formData);

    // También cachea el fallback
    const cacheKey = `${template.id}_${JSON.stringify(formData)}`;
    documentCache.set(cacheKey, fallbackContent);

    return fallbackContent;
  }
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

// Añade esta función para extraer solo el texto del HTML
function extractTextFromHTML(htmlContent) {
  // Elimina las etiquetas style
  let text = htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  // Elimina todas las etiquetas HTML
  text = text.replace(/<[^>]*>/g, "");
  // Limpia espacios múltiples
  text = text.replace(/\n\n+/g, "\n\n").trim();
  return text;
}

// Modifica la ruta existente /api/generate-document así:
app.post("/api/generate-document", async (req, res) => {
  try {
    const { templateId, formData, format } = req.body;

    const template = templates.find((t) => t.id === parseInt(templateId));
    if (!template) return res.status(404).json({ error: "Template not found" });

    console.log(`\n📄 Generando documento: ${template.name}`);
    console.log(`📋 Formato: ${format.toUpperCase()}`);

    const content = await generateDocumentContent(template, formData);
    const htmlContent = textToHTML(content, template.name);

    // Si es preview, retorna solo el texto limpio
    if (format === "preview") {
      const plainText = extractTextFromHTML(content);
      return res.send(plainText);
    }

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
      error: "Error generating document :'v",
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
