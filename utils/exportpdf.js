import axiosInstance from "./axios";

async function ExportFile(uuid) {
  await axiosInstance
    .get(`Diary/export/c0cd606d-8f84-4cad-9da4-129ad1e6cdd8`)
    .then(async (response) => {
      console.log(response.headers);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = await window.URL.createObjectURL(blob);
      const link = await document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = "รายงานการออกฝึก.pdf";
      link.click();
    })
    .catch((error) => {
      console.log(error);
    });
}
export { ExportFile };
