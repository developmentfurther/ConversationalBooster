import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    console.log("🚀 Enviando a n8n:", webhookUrl);

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // LEEMOS COMO TEXTO PRIMERO para ver qué llega realmente
    const textResult = await n8nResponse.text();
    console.log("📩 Respuesta cruda de n8n:", textResult || "(VACÍA)");

    if (!n8nResponse.ok) {
       console.error(`❌ n8n Error HTTP: ${n8nResponse.status}`);
       throw new Error(`Error del servidor n8n (${n8nResponse.status})`);
    }

    if (!textResult) {
      throw new Error("n8n no devolvió contenido (El flujo se rompió antes de terminar).");
    }

    // Intentamos parsear
    try {
      const jsonResult = JSON.parse(textResult);
      return NextResponse.json(jsonResult);
    } catch (e) {
      console.error("❌ No es JSON válido:", textResult);
      throw new Error("La respuesta de n8n no es un JSON válido.");
    }

  } catch (error) {
    console.error("❌ Error Final:", error.message);
    // Devolvemos un JSON de error al frontend para que no se quede colgado
    return NextResponse.json(
      { status: 'error', message: 'Hubo un problema procesando tu solicitud.' },
      { status: 500 }
    );
  }
}