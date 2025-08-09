"use server";

import { cookies } from "next/headers";
import { DEFAULT_MODEL } from "@/lib/models";

export async function setModelCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("selectedModel", model);
}

export async function getModelCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("selectedModel")?.value ?? DEFAULT_MODEL.value;
}
