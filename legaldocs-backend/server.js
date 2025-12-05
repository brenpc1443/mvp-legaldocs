const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PDFDocument = require("pdfkit");

// Load environment variables
dotenv.config();

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
const dbFolder = path.join(__dirname, "db");
const usersFile = path.join(dbFolder, "users.json");
const documentsFile = path.join(dbFolder, "documents.json");

if (!fs.existsSync(docsFolder)) {
  fs.mkdirSync(docsFolder, { recursive: true });
}
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

function initializeDB() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(
      usersFile,
      JSON.stringify(
        [
          {
            id: 1,
            email: "brayan@example.com",
            password: "123456",
            name: "Brayan Paredes",
          },
          {
            id: 2,
            email: "test@example.com",
            password: "test123",
            name: "Usuario Test",
          },
        ],
        null,
        2
      )
    );
  }
  if (!fs.existsSync(documentsFile)) {
    fs.writeFileSync(documentsFile, JSON.stringify([], null, 2));
  }
}

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

function readDocuments() {
  return JSON.parse(fs.readFileSync(documentsFile, "utf8"));
}

function saveDocument(doc) {
  const docs = readDocuments();
  const newDoc = {
    id: Date.now().toString(),
    ...doc,
    createdAt: new Date().toISOString(),
  };
  docs.push(newDoc);
  fs.writeFileSync(documentsFile, JSON.stringify(docs, null, 2));
  return newDoc;
}

function getUserDocuments(userId) {
  const docs = readDocuments();
  return docs.filter((doc) => doc.userId === userId);
}

initializeDB();

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

const documentCache = new Map();

function createPdfWithPDFKit(textContent, fileName, documentTitle) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(docsFolder, `${fileName}.pdf`);

      console.log(`📝 Creando PDF con PDFKit: ${filePath}`);

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Título principal
      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(documentTitle.toUpperCase(), {
          align: "center",
          lineGap: 8,
        });

      doc.moveDown(0.8);

      // Línea divisoria
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // Contenido del documento
      const lines = textContent.split("\n");
      let currentY = doc.y;

      lines.forEach((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
          doc.moveDown(0.3);
          return;
        }

        // Detectar secciones especiales
        const isSectionHeader = trimmed.match(
          /^(CONSTE|CONSIDERANDOS|CONSIDERANDO|RECITALES|CLÁUSULA)/i
        );
        const isClauseNumber = trimmed.match(
          /^CLÁUSULA\s+(?:PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMO):/i
        );
        const isSubsection = trimmed.match(/^[a-z]\)/);

        if (isSectionHeader && !isClauseNumber) {
          // Sección principal
          doc.moveDown(0.3);
          doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .text(trimmed, { align: "center", lineGap: 5 });
          doc.moveDown(0.4);
        } else if (isClauseNumber) {
          // Número de cláusula
          doc.moveDown(0.4);
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .text(trimmed, { align: "left", lineGap: 4 });
          doc.moveDown(0.2);
        } else if (isSubsection) {
          // Subsecciones con viñetas
          doc.fontSize(10).font("Helvetica").text(trimmed, {
            align: "left",
            lineGap: 3,
            indent: 20,
          });
          doc.moveDown(0.1);
        } else {
          // Párrafos normales
          doc.fontSize(10).font("Helvetica").text(trimmed, {
            align: "justify",
            lineGap: 4,
            width: 500,
          });
          doc.moveDown(0.15);
        }
      });

      doc.moveDown(1);

      // Línea divisoria final
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // Firma
      doc
        .fontSize(10)
        .font("Helvetica")
        .text(
          "En señal de conformidad, las partes suscriben el presente documento:",
          {
            align: "center",
          }
        );

      doc.moveDown(2);

      // Espacios para firmas
      const signatureY = doc.y;
      const signatureWidth = 150;
      const signatureSpacing = 250;

      // Primera firma
      doc
        .moveTo(80, signatureY + 60)
        .lineTo(80 + signatureWidth, signatureY + 60)
        .stroke();

      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("_________________________", 50, signatureY + 65, {
          align: "left",
        });
      doc
        .fontSize(8)
        .font("Helvetica")
        .text("FIRMA", 50, signatureY + 75, { align: "left" });

      // Segunda firma
      doc
        .moveTo(80 + signatureSpacing, signatureY + 60)
        .lineTo(80 + signatureSpacing + signatureWidth, signatureY + 60)
        .stroke();

      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .text(
          "_________________________",
          50 + signatureSpacing,
          signatureY + 65,
          {
            align: "left",
          }
        );
      doc
        .fontSize(8)
        .font("Helvetica")
        .text("FIRMA", 50 + signatureSpacing, signatureY + 75, {
          align: "left",
        });

      doc.end();

      stream.on("finish", () => {
        const stats = fs.statSync(filePath);
        console.log(
          `✅ PDF creado correctamente: ${filePath} (${stats.size} bytes)`
        );
        resolve(filePath);
      });

      stream.on("error", (error) => {
        console.error("❌ Error escribiendo PDF:", error);
        reject(error);
      });
    } catch (error) {
      console.error("❌ Error creando PDF:", error);
      reject(error);
    }
  });
}

function createWordDocument(textContent, fileName) {
  try {
    const filePath = path.join(docsFolder, `${fileName}.docx`);

    const wordContent = textContent.replace(/\n\n+/g, "\n\n");

    fs.writeFileSync(filePath, wordContent, "utf8");

    console.log("✅ Documento Word creado correctamente");
    return filePath;
  } catch (error) {
    console.error("❌ Error creando Word:", error);
    throw error;
  }
}

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

async function generateDocumentContent(template, formData) {
  try {
    const cacheKey = `${template.id}_${JSON.stringify(formData)}`;

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

    content = content.replace(/^```[\w]*\n?/gm, "").replace(/\n?```$/gm, "");
    content = content.trim();

    if (!content || content.length < 100) {
      console.warn("⚠️ Contenido muy corto, usando fallback");
      content = generateFallbackContent(template, formData);
    }

    documentCache.set(cacheKey, content);

    return content;
  } catch (error) {
    console.error("❌ Error con Gemini API:", error.message);
    console.log("📝 Usando contenido fallback pre-escrito");
    const fallbackContent = generateFallbackContent(template, formData);

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
El presente contrato se rige conforme a las leyes de la República del Perú.`,

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

// ========== API ROUTES ==========

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

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
    const { templateId, formData, format, userId } = req.body;

    console.log(`\n${"=".repeat(60)}`);
    console.log(`📄 GENERANDO NUEVO DOCUMENTO`);
    console.log(`${"=".repeat(60)}`);

    const template = templates.find((t) => t.id === parseInt(templateId));
    if (!template) return res.status(404).json({ error: "Template not found" });

    console.log(`📋 Plantilla: ${template.name}`);
    console.log(`📊 Formato: ${format.toUpperCase()}`);
    console.log(`👤 Usuario ID: ${userId || "N/A"}`);

    const content = await generateDocumentContent(template, formData);

    if (format === "preview") {
      console.log(`✅ Retornando preview (sin guardar)`);
      return res.send(content);
    }

    const fileName = `${template.name.replace(/\s+/g, "_")}_${Date.now()}`;
    let filePath;
    let fileExtension;

    console.log(`\n📝 Iniciando guardado del documento...`);
    console.log(`📁 Nombre base: ${fileName}`);

    if (format === "pdf") {
      console.log(`🔄 Generando PDF con PDFKit...`);
      filePath = await createPdfWithPDFKit(content, fileName, template.name);
      fileExtension = "pdf";
    } else {
      console.log(`🔄 Generando DOCX...`);
      filePath = await createWordDocument(content, fileName);
      fileExtension = "docx";
    }

    const finalFileName = `${fileName}.${fileExtension}`;
    console.log(`\n✅ Archivo guardado exitosamente`);
    console.log(`📂 Ruta: ${filePath}`);
    console.log(`💾 Tamaño: ${fs.statSync(filePath).size} bytes`);
    console.log(`📄 Nombre final: ${finalFileName}`);

    // Guardar información del documento en la BD
    if (userId) {
      console.log(`\n📚 Registrando en base de datos...`);
      const doc = saveDocument({
        userId: parseInt(userId),
        templateId: template.id,
        templateName: template.name,
        fileName: finalFileName,
        fileSize: fs.statSync(filePath).size,
        format: format,
        filePath: finalFileName,
      });
      console.log(`✅ Documento registrado con ID: ${doc.id}`);
    }

    console.log(`${"=".repeat(60)}\n`);

    res.json({
      success: true,
      fileName: finalFileName,
      filePath: finalFileName,
      size: fs.statSync(filePath).size,
      message: "Documento generado exitosamente. Procede a descargarlo.",
    });
  } catch (error) {
    console.error(`\n❌ ERROR GENERANDO DOCUMENTO:`);
    console.error(`   ${error.message}`);
    console.error(`${"=".repeat(60)}\n`);
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
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(docsFolder, fileName);

    console.log(`\n📥 Solicitud de descarga recibida`);
    console.log(`📄 Nombre del archivo: ${fileName}`);
    console.log(`📂 Ruta completa: ${filePath}`);

    const availableFiles = fs.readdirSync(docsFolder);
    console.log(`📋 Archivos disponibles: ${availableFiles.join(", ")}`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      return res.status(404).json({
        error: "Archivo no encontrado",
        requestedFile: fileName,
        availableFiles: availableFiles,
      });
    }

    const stats = fs.statSync(filePath);
    console.log(`✅ Archivo encontrado. Tamaño: ${stats.size} bytes`);

    res.download(filePath);
  } catch (error) {
    console.error("❌ Error en descarga:", error);
    res.status(500).json({
      error: "Error al descargar archivo",
      details: error.message,
    });
  }
});

app.get("/api/my-documents/:userId", (req, res) => {
  const docs = getUserDocuments(parseInt(req.params.userId));
  res.json(docs);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LegalDocs API running" });
});

// Servir frontend estático
const frontendPath = path.join(__dirname, "../legaldocs-frontend/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  console.log("✅ Frontend estático servido desde:", frontendPath);
}

app.get("*", (req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: "Frontend not found" });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 LegalDocs Backend - PDFKit Edition`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n📊 Modelo IA: Gemini Pro`);
  console.log(
    `✅ API Key configurada: ${process.env.GEMINI_API_KEY ? "Sí" : "No"}`
  );
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   POST /api/login`);
  console.log(`   GET  /api/templates`);
  console.log(`   POST /api/generate-document`);
  console.log(`   GET  /api/download/:fileName`);
  console.log(`   GET  /api/health\n`);
});
