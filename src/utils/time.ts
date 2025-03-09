export const formatMillisecondsToMMSS = (ms: number) => {
  const minutes = Math.floor(ms / 60000); // Chuyển mili giây thành phút
  const seconds = Math.floor((ms % 60000) / 1000); // Lấy số giây còn lại
  return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Định dạng MM:SS
};
