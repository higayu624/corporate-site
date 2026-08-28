import { NextResponse } from "next/server";
import { z } from "zod";
import { answerLegalQuestion } from "@/lib/legal-ai";

export const runtime = "nodejs";
export const maxDuration = 120;

const bodySchema = z.object({
  question: z.string().trim().min(5, "質問を5文字以上入力してください").max(4000),
  asOfDate: z.string().date().optional(),
});

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  try {
    const body = bodySchema.parse(await request.json());
    const asOfDate = body.asOfDate ?? new Date().toISOString().slice(0, 10);
    const response = await answerLegalQuestion(body.question, asOfDate);
    console.info(JSON.stringify({ request_id:requestId, processing_step:"complete", duration_ms:Date.now()-startedAt, verification_status:response.meta.verificationStatus }));
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error:error.issues[0]?.message, requestId }, { status:400 });
    const message = error instanceof Error ? error.message : "unknown";
    console.error(JSON.stringify({ request_id:requestId, processing_step:"error", duration_ms:Date.now()-startedAt, message }));
    return NextResponse.json({ error:message.includes("Not enough")?"利用可能なAIが不足しています。":"回答を生成できませんでした。環境設定をご確認ください。", requestId }, { status:message.includes("Not enough")?503:500 });
  }
}
