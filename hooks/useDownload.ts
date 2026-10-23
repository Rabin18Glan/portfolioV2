import { useCallback } from "react";

const useDownload = () => {
  const downloadFile = useCallback(async (path: string, customFilename?: string) => {
    const filename = customFilename || path.split("/").pop() || "download";

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback to direct anchor download
      const link = document.createElement("a");
      link.href = path;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  return downloadFile;
};

export default useDownload;
