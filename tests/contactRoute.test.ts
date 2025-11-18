import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockFs = vi.hoisted(() => {
  const access = vi.fn().mockResolvedValue(undefined);
  const mkdir = vi.fn().mockResolvedValue(undefined);
  const readFile = vi.fn().mockResolvedValue("[]");
  const writeFile = vi.fn().mockResolvedValue(undefined);
  return { access, mkdir, readFile, writeFile };
});

vi.mock("fs/promises", () => ({
  default: mockFs,
  ...mockFs,
}));

import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.RESEND_API_KEY = "test-api-key";
    process.env.RESEND_FROM_EMAIL = "Apigen Contact Form <noreply@apigen.ca>";
    process.env.CONTACT_EMAIL = "sunny@apigen.ca";
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("uses the configured Resend identity and returns success", async () => {
    const payload = {
      name: "Ada Example",
      company: "Apigen",
      email: "ada@example.com",
      country: "CA",
      message: "Hello from Vitest",
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const body = (await response.json()) as { success: boolean; id: string };
    expect(body.success).toBe(true);
    expect(typeof body.id).toBe("string");
    expect(body.id.length).toBeGreaterThan(0);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, fetchOptions] = fetchMock.mock.calls[0];
    const resendPayload = JSON.parse(
      (fetchOptions as RequestInit).body as string
    );

    expect(resendPayload.from).toBe(
      "Apigen Contact Form <noreply@apigen.ca>"
    );
    expect(resendPayload.to).toEqual(["sunny@apigen.ca"]);
    expect(resendPayload.reply_to).toBe("ada@example.com");
    expect(resendPayload.subject).toContain("Ada Example");
  });

  it("returns 400 when required fields are missing", async () => {
    const incompletePayload = {
      name: "",
      company: "",
      email: "",
      country: "",
      message: "",
    };

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(incompletePayload),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("All fields are required");
  });

  it("propagates Resend failures so the client can retry", async () => {
    const payload = {
      name: "Failure Case",
      company: "Apigen",
      email: "fail@example.com",
      country: "CA",
      message: "Please error",
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => "resend boom",
    });

    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    expect(response.status).toBe(502);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("Failed to send notification email");
  });
});
