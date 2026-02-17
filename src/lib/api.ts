import imageCompression from "browser-image-compression";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export class ApiError extends Error {
  code: number;
  statusCode: number;

  constructor(message: string, code: number, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

interface UploadImageResponse {
  url: string;
}

export const apiClient = {
  async uploadImage(file: File): Promise<{ url: string }> {
    try {
      // Compress image
      const options = {
        maxSizeMB: 0.5,
        useWebWorker: true,
        maxIteration: 30,
      };
      const compressedFile = await imageCompression(file, options);

      // Create form data
      const formData = new FormData();
      formData.append("image", compressedFile);

      // Get auth token
      let token: string | null = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("auth_token");
      }

      // Upload to backend
      const url = `${API_BASE_URL}/api/upload`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || "Upload failed",
          errorData.code || 0,
          response.status
        );
      }

      const data = await response.json();
      return { url: data.url };
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message || "Upload failed", 0, 500);
    }
  },
};
