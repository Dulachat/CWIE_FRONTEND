import axiosInstance from "./axios";

const POLL_INTERVAL = 2500;
const MAX_POLL_ATTEMPTS = 300; // ~2.5 นาที

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ExportFile(uuid) {
  const { data } = await axiosInstance.post(`Diary/export/${uuid}`);
  const jobId = data?.jobId ?? data?.job_id ?? data?.id;
  if (!jobId) throw new Error("ไม่ได้รับ jobId จาก API");

  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    const { data: statusData } = await axiosInstance.get(
      `Diary/export/${uuid}/status/${jobId}`
    );
    const status = statusData?.status ?? statusData?.state;

    if (status === "ready") {
      const res = await axiosInstance.get(
        `Diary/export/${uuid}/download/${jobId}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "รายงานการออกฝึก.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      return;
    }
    if (status === "failed" || status === "error") {
      throw new Error(statusData?.message ?? "การ export ล้มเหลว");
    }
    await sleep(POLL_INTERVAL);
  }
  throw new Error("หมดเวลารอการ export");
}

export { ExportFile };
