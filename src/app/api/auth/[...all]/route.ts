import { NextResponse } from "next/server";

function demoResponse() {
  return NextResponse.json(
    { demo: true, message: "Autenticação real será ativada quando o Neon for conectado." },
    { status: 503 },
  );
}

export const GET = demoResponse;
export const POST = demoResponse;
