/**
 * Partner application API service.
 * Handles network submission with timeout safeguards, error differentiation, and telemetry hooks.
 */

const DEFAULT_TIMEOUT_MS = 45000; // 45s for file uploads over mobile connections

/**
 * Submits partner application form data to the backend endpoint.
 *
 * @param {FormData} formData - Multipart form data including text fields and binary files.
 * @param {Object} [options] - Optional configurations.
 * @param {string} [options.endpoint] - Custom API endpoint.
 * @param {number} [options.timeoutMs] - Timeout in milliseconds.
 * @returns {Promise<Object>} Resolves with JSON response on success.
 * @throws {Error} Descriptive error on network failure, timeout, or non-2xx HTTP status.
 */
export async function submitApplication(formData, options = {}) {
  const endpoint = options.endpoint || (import.meta.env?.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/partner-applications`
    : "/api/partner-applications");

  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Note: Do NOT manually set Content-Type header with FormData;
    // the browser automatically computes boundary parameters.
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorPayload = null;
      try {
        errorPayload = await res.json();
      } catch {
        errorPayload = null;
      }
      const message = errorPayload?.message || `Application submission failed (HTTP ${res.status})`;
      const error = new Error(message);
      error.status = res.status;
      error.payload = errorPayload;
      throw error;
    }

    return await res.json().catch(() => ({ success: true }));
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs / 1000} seconds. Please check your network connection and retry.`);
    }

    // Telemetry / logging hook
    if (typeof window !== "undefined" && window.reportError) {
      window.reportError(err);
    }

    throw err;
  }
}

