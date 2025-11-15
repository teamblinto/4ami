// Health check endpoint
export default function healthCheck() {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
