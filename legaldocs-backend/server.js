// LegalDocs Backend - Express.js con Gemini API
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFDocument from "pdfkit";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Validate API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY no configurada en .env");
  console.error("Ve a https://ai.google.dev/ y obtén tu API key");
  process.exit(1);
}

// Initialize Gemini
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

// Generate document with Gemini AI
async function generateDocumentContent(template, formData) {
  try {
    const prompt = buildPrompt(template.id, formData);

    console.log("🤖 Enviando a Gemini API...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text();

    console.log("✅ Contenido generado por IA (Gemini)");

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
    1: `Eres un abogado experto en Derecho Comercial de Perú. Genera un CONTRATO DE SERVICIOS PROFESIONALES COMPLETO, FORMAL y LEGAL basado en estos datos:

Cliente: ${data.clientName}
RUC: ${data.ruc}
Tipo de Servicio: ${data.serviceType}
Fecha Inicio: ${data.startDate}
Fecha Término: ${data.endDate}
Monto: ${data.amount}
Condiciones de Pago: ${data.paymentTerms}
Incluir cláusula de confidencialidad: ${data.confidentiality ? "Sí" : "No"}

INSTRUCCIONES CRÍTICAS:
- Genera un contrato REAL, profesional y vinculante
- Incluye TODAS estas secciones en orden:
  1. Encabezado con "CONSTE POR EL PRESENTE"
  2. Identificación de las partes
  3. Recitales/Considerandos
  4. PRIMERA: Objeto y alcance del servicio
  5. SEGUNDA: Plazo de vigencia
  6. TERCERA: Remuneración y forma de pago
  7. CUARTA: Obligaciones del cliente
  8. QUINTA: Obligaciones del prestador
  9. SEXTA: Confidencialidad (si aplica)
  10. SÉPTIMA: Terminación y resolución
  11. OCTAVA: Ley aplicable (Perú)
  12. NOVENA: Firmas y fecha

- Usa lenguaje legal formal peruano
- Incluye citas a normas legales cuando sea pertinente
- Mínimo 1500 caracteres
- NO uses "Lorem Ipsum" ni textos genéricos
- Personaliza TODO con los datos proporcionados`,

    2: `Eres un abogado especialista en NDAs y Confidencialidad. Genera un ACUERDO DE CONFIDENCIALIDAD (NDA) COMPLETO, VINCULANTE Y LEGAL para Perú:

Parte Divulgadora: ${data.disclosingParty}
Parte Receptora: ${data.receivingParty}
Fecha de Efectividad: ${data.startDate}
Duración: ${data.duration} años
Jurisdicción: ${data.jurisdiction}

INSTRUCCIONES:
- Estructura formal con "CONSTE POR EL PRESENTE"
- Secciones obligatorias:
  1. Partes
  2. Recitales
  3. Definición de Información Confidencial
  4. Obligaciones del Receptor
  5. Exclusiones de Confidencialidad
  6. Término de la Confidencialidad
  7. Consecuencias del Incumplimiento
  8. Cláusula de No Reclutamiento (opcional pero recomendada)
  9. Ley Aplicable
  10. Resolución de Disputas
- Redacta con autoridad legal
- Mínimo 1200 caracteres
- Personaliza con datos reales`,

    3: `Eres un notario público de Perú. Genera un PODER NOTARIAL GENERAL VÁLIDO Y COMPLETO:

Poderdante: ${data.principalName}
DNI del Poderdante: ${data.principalDNI}
Apoderado: ${data.attorneyName}
DNI del Apoderado: ${data.attorneyDNI}
Poderes a Otorgar: ${data.powers}
Lugar: ${data.location}

INSTRUCCIONES:
- Formato notarial oficial peruano
- Incluye:
  1. Encabezamiento notarial
  2. Comparecencia del otorgante
  3. Identificación de ambas partes
  4. Manifestación de voluntad del poderdante
  5. Poderes específicos otorgados
  6. Limitaciones y restricciones
  7. Vigencia del poder
  8. Revocabilidad
  9. Aceptación del apoderado
  10. Ley aplicable
  11. Espacios para firmas y sello notarial
- Redacta como un notario profesional
- Mínimo 1300 caracteres
- Formato reconocible y válido en Perú`,

    4: `Eres un abogado laboral certificado en Perú. Genera un CONTRATO LABORAL COMPLETO conforme a la legislación peruana vigente:

Empleador: ${data.employerName}
Empleado: ${data.employeeName}
Puesto: ${data.position}
Salario: ${data.salary}
Fecha de Inicio: ${data.startDate}
Jornada Laboral: ${data.workingHours}
Beneficios: ${data.benefits}

INSTRUCCIONES CRÍTICAS:
- Cumple con D.S. 003-97-TR (Texto Único Ordenado del Código Laboral)
- Incluye TODAS las secciones:
  1. Encabezamiento formal
  2. Identificación de partes
  3. Recitales
  4. Objeto del contrato
  5. Modalidad (tiempo indeterminado/determinado)
  6. Remuneración y forma de pago
  7. Jornada de trabajo y descansos
  8. Beneficios (gratificación, CTS, AFP, EPS, seguros)
  9. Obligaciones del empleador
  10. Obligaciones del trabajador
  11. Suspensión y terminación del contrato
  12. Causales de despido
  13. Disposiciones finales
  14. Ley aplicable
- Referencias a normas laborales peruanas
- Redacta profesionalmente
- Mínimo 1600 caracteres
- Personaliza TODOS los datos
- NO uses textos estándar, adapta a la situación`,
  };

  return prompts[templateId] || prompts[1];
}

function generateFallbackContent(template, data) {
  const contents = {
    1: `CONTRATO DE SERVICIOS PROFESIONALES

CONSTE POR EL PRESENTE DOCUMENTO:

Que celebran de una parte, ${data.clientName}, con RUC N° ${
      data.ruc
    }, denominado "EL CLIENTE", y de la otra parte, el Prestador de Servicios Profesionales, denominado "EL PRESTADOR".

PRIMERO: OBJETO
El PRESTADOR se obliga a prestar servicios profesionales de ${
      data.serviceType
    } al CLIENTE, bajo los términos establecidos en el presente contrato, conforme a la legislación peruana vigente.

SEGUNDO: VIGENCIA
El presente contrato tendrá vigencia desde ${data.startDate} hasta ${
      data.endDate
    }.

TERCERO: REMUNERACIÓN
El CLIENTE pagará al PRESTADOR por los servicios prestados la suma de ${
      data.amount
    }, bajo las siguientes condiciones de pago: ${data.paymentTerms}.

CUARTO: OBLIGACIONES DEL PRESTADOR
- Prestar los servicios con profesionalismo y dedicación
- Cumplir con los plazos establecidos
- Mantener confidencialidad de la información compartida
- Informar periódicamente del progreso

QUINTO: OBLIGACIONES DEL CLIENTE
- Pagar la remuneración según lo pactado
- Proporcionar la información necesaria
- Facilitar el acceso a recursos necesarios

${
  data.confidentiality
    ? `SEXTO: CONFIDENCIALIDAD
Las partes se comprometen a guardar confidencialidad sobre toda información compartida en relación con este contrato, durante su vigencia y después de su término.`
    : ""
}

SÉPTIMO: TERMINACIÓN
El presente contrato podrá terminarse por mutuo acuerdo o por incumplimiento de cualquiera de las partes.

OCTAVO: LEY APLICABLE
El presente contrato se rige conforme a las leyes de la República del Perú.

Firmado en Lima, el ${new Date().toLocaleDateString("es-PE")}`,

    2: `ACUERDO DE CONFIDENCIALIDAD (NDA)

CONSTE POR EL PRESENTE:

Entre ${data.disclosingParty}, denominado "PARTE DIVULGADORA", y ${
      data.receivingParty
    }, denominado "PARTE RECEPTORA", se celebra el presente ACUERDO DE CONFIDENCIALIDAD.

PRIMERO: OBJETO
Las partes acuerdan guardar confidencialidad sobre toda información que sea compartida durante la vigencia de este acuerdo.

SEGUNDO: DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL
Se considera información confidencial toda aquella que sea revelada por la Parte Divulgadora a la Parte Receptora, incluyendo pero no limitado a: datos comerciales, técnicos, financieros y estratégicos.

TERCERO: OBLIGACIONES
La Parte Receptora se compromete a:
- No divulgar la información confidencial a terceros sin consentimiento escrito
- Usar la información únicamente para los fines acordados
- Implementar medidas de seguridad razonables para proteger la información

CUARTO: EXCEPCIONES
La información que sea de dominio público no está sujeta a este acuerdo.

QUINTO: TÉRMINO
Este acuerdo permanecerá en vigor durante ${
      data.duration
    } años desde su fecha de efectividad (${data.startDate}).

SEXTO: LEY APLICABLE
Conforme a las leyes de ${data.jurisdiction}.

Firmado en ${data.jurisdiction}, el ${new Date().toLocaleDateString("es-PE")}`,

    3: `PODER NOTARIAL GENERAL

Ante mí, Notario Público, comparece ${
      data.principalName
    }, identificado con DNI N° ${
      data.principalDNI
    }, domiciliado en Perú, a quien en adelante se le denominará "EL OTORGANTE", y manifiesta su libre y voluntad de otorgar poder.

PRIMERO: PODER OTORGADO
Por este medio, EL OTORGANTE otorga poder amplio, suficiente y general a favor de ${
      data.attorneyName
    }, identificado con DNI N° ${
      data.attorneyDNI
    }, a quien en adelante se le denominará "EL APODERADO", para que lo represente judicial y extrajudicialmente en todos sus actos.

SEGUNDO: PODERES ESPECÍFICOS
${data.powers}

TERCERO: VIGENCIA
El presente poder es válido desde la fecha de su otorgamiento y permanecerá vigente hasta su revocación expresa.

CUARTO: REVOCABILIDAD
El OTORGANTE podrá revocar el presente poder en cualquier momento, mediante documento notarial.

Lugar: ${data.location}
Fecha: ${data.date || new Date().toLocaleDateString("es-PE")}

Conforme a las leyes de la República del Perú`,

    4: `CONTRATO LABORAL

CONSTE POR EL PRESENTE DOCUMENTO:

Que celebran de una parte, ${
      data.employerName
    }, en calidad de EMPLEADOR, y de la otra parte, ${
      data.employeeName
    }, en calidad de TRABAJADOR.

PRIMERO: OBJETO DEL CONTRATO
El TRABAJADOR se obliga a prestar servicios personales como ${
      data.position
    } para el EMPLEADOR, conforme a la legislación laboral peruana vigente.

SEGUNDO: MODALIDAD
El presente es un contrato de trabajo por tiempo indeterminado, de conformidad con el Decreto Supremo N° 003-97-TR.

TERCERO: REMUNERACIÓN
La remuneración mensual del TRABAJADOR será de ${
      data.salary
    }, pagadera en forma ordinaria dentro de los plazos legales.

CUARTO: JORNADA DE TRABAJO
La jornada laboral será de ${data.workingHours}, conforme a la ley.

QUINTO: BENEFICIOS SOCIALES
El TRABAJADOR tendrá derecho a: ${data.benefits}

SEXTO: FECHA DE INICIO
El TRABAJADOR iniciará sus funciones el ${data.startDate}.

SÉPTIMO: OBLIGACIONES DEL EMPLEADOR
- Pagar oportunamente la remuneración
- Proporcionar las condiciones de seguridad necesarias
- Respetar los derechos laborales del trabajador

OCTAVO: OBLIGACIONES DEL TRABAJADOR
- Cumplir con sus funciones diligentemente
- Acatar las instrucciones del empleador
- Respetar las políticas de la empresa

NOVENO: TERMINACIÓN
El contrato podrá terminarse conforme a las causas establecidas en la legislación laboral peruana.

DÉCIMO: LEY APLICABLE
El presente contrato se rige conforme al Decreto Supremo N° 003-97-TR y demás normas laborales vigentes en Perú.

Firmado en Lima, el ${new Date().toLocaleDateString("es-PE")}`,
  };

  return contents[template.id] || contents[1];
}

// Create Word document
async function createWordDocument(content, fileName) {
  const paragraphs = content.split("\n").map(
    (line) =>
      new Paragraph({
        text: line || " ",
        spacing: { line: 360 },
        alignment: "left",
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
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(docsFolder, `${fileName}.pdf`);
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
        info: {
          Title: fileName,
          Author: "LegalDocs",
        },
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(11).font("Helvetica");

      const lines = content.split("\n");
      lines.forEach((line) => {
        if (line.trim()) {
          doc.text(line, {
            align: "left",
            width: 495,
            continued: false,
          });
        } else {
          doc.moveDown(0.3);
        }
      });

      doc.end();

      stream.on("finish", () => {
        console.log("✅ PDF creado:", filePath);
        resolve(filePath);
      });

      stream.on("error", (err) => {
        console.error("❌ Error PDF:", err);
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
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

    // Generate with Gemini AI
    const content = await generateDocumentContent(template, formData);

    const fileName = `${template.name.replace(/\s+/g, "_")}_${Date.now()}`;
    let filePath;

    if (format === "pdf") {
      filePath = await createPdfDocument(content, fileName);
    } else {
      filePath = await createWordDocument(content, fileName);
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
  console.log(`\n🚀 LegalDocs Backend - Gemini Edition`);
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
