import { useCallback } from 'react';

const useDownload = () => {
  const downloadFile = useCallback((path: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop() || 'download'; // Extract filename from path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return downloadFile;
};

export default useDownload;
