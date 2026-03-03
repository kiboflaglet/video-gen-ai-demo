import axios from "axios";
import { Check, Clock, FileText, Loader2, Play, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { authClient } from "../../lib/auth-client";
import { SOCKET_EVENTS } from "../../lib/socket";
import "./dashboard.css";

const socket = io("http://localhost:3000");

type AIVideoStatus = "queued" | "processing" | "completed" | "failed";

interface AIVIdeoType {
  id: string;
  prompt: string;
  status: AIVideoStatus;
  userId: string;
  provider: string;
  duration: number;
  videoURL: string | null;
}

const VideoGenerator = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<AIVIdeoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");

  // Function to handle the generation trigger
  const handleGenerateVideo = async () => {
    if (!promptInput) return;

    setIsLoading(true);

    const tempId = uuidv4(); // generate temporary ID for optimistic update

    const newVideo: AIVIdeoType = {
      id: tempId,
      duration: 5,
      prompt: promptInput,
      userId: "1",
      provider: "test",
      status: "queued", // start with queued
      videoURL: null,
    };

    // Optimistically add the video to state
    setVideos((prev) => [newVideo, ...prev]);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/video/generate",
        newVideo
      );

      if (data.success) {
        const backendVideo: AIVIdeoType = data.data;

        setVideos((prev) =>
          prev.map((v) => (v.id === tempId ? { ...v, ...backendVideo } : v))
        );
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      // Optionally mark video as failed
      setVideos((prev) =>
        prev.map((v) => (v.id === tempId ? { ...v, status: "failed" } : v))
      );
    }

    setIsLoading(false);
  };

  const truncatePrompt = (text: string) => {
    return (
      text.split(" ").slice(0, 10).join(" ") +
      (text.split(" ").length > 10 ? "..." : "")
    );
  };

  const signOut = async () => {
    const { data } = await authClient.signOut();
    if (data?.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    // Listen for server connection
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // Listen for AI video updates from backend
    socket.on(SOCKET_EVENTS.AI_VIDEO_GET, (data: AIVIdeoType) => {
      console.log("New AI video data received:", data);

      setVideos((prev) => {
        const exists = prev.find((v) => v.id === data.id);

        if (exists) {
          // Update the existing video
          return prev.map((v) => (v.id === data.id ? { ...v, ...data } : v));
        } else {
          // Optional: add new video if it doesn't exist
          return [data, ...prev];
        }
      });
    });

    return () => {
      socket.off("connect");
      socket.off(SOCKET_EVENTS.AI_VIDEO_GET);
    };
  }, []);

  return (
    <div className="container">
      {/* Left Side: Video Gallery */}
      <div className="gallery-section">
        <h2>
          Generated Videos<button onClick={signOut}>Sign out</button>{" "}
        </h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-placeholder">
                <Play size={32} />
              </div>
              <div className="video-info">
                <div className="meta">
                  <span>
                    {video.status !== "completed" ? (
                      <Loader2 size={12} className={"spin"} />
                    ) : (
                      <Check size={15} />
                    )}
                    {video.status}
                  </span>
                  <span>
                    <Clock size={12} /> {video.duration}
                  </span>
                </div>
                <p className="prompt-preview">
                  <FileText size={12} /> {truncatePrompt(video.prompt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Controls */}
      <div className="control-section">
        <div className="input-group">
          <h2>Create New</h2>
          <textarea
            placeholder="Describe the video you want to generate..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <button
            onClick={handleGenerateVideo}
            disabled={isLoading || !promptInput}
            className="generate-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="spin" /> Generating...
              </>
            ) : (
              <>
                <Plus /> Generate Video
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
