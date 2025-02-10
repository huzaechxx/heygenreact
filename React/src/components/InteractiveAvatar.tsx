// import type { StartAvatarResponse } from "@heygen/streaming-avatar";

// import StreamingAvatar, {
//   AvatarQuality,
//   StreamingEvents,
//   TaskMode,
//   TaskType,
//   VoiceEmotion,
// } from "@heygen/streaming-avatar";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Divider,
//   Input,
//   Select,
//   SelectItem,
//   Spinner,
//   Chip,
//   Tabs,
//   Tab,
// } from "@nextui-org/react";
// import { useEffect, useRef, useState } from "react";
// import { useMemoizedFn, usePrevious } from "ahooks";

// import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";

// import { AVATARS, STT_LANGUAGE_LIST } from "../lib/constants";

// export default function InteractiveAvatar() {
//   const [isLoadingSession, setIsLoadingSession] = useState(false);
//   const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
//   const [stream, setStream] = useState<MediaStream>();
//   const [debug, setDebug] = useState<string>();
//   const [knowledgeId, setKnowledgeId] = useState<string>("");
//   const [avatarId, setAvatarId] = useState<string>("");
//   const [language, setLanguage] = useState<string>("en");

//   const [, setData] = useState<StartAvatarResponse>();
//   const [text, setText] = useState<string>("");
//   const mediaStream = useRef<HTMLVideoElement>(null);
//   const avatar = useRef<StreamingAvatar | null>(null);
//   const [chatMode, setChatMode] = useState("text_mode");
//   const [isUserTalking, setIsUserTalking] = useState(false);

//   async function fetchAccessToken() {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/get-access-token",
//         {
//           method: "POST",
//         }
//       );
//       const token = await response.text();

//       console.log("Access Token:", token); // Log the token to verify

//       return token;
//     } catch (error) {
//       console.error("Error fetching access token:", error);
//     }

//     return "";
//   }

//   async function startSession() {
//     setIsLoadingSession(true);
//     const newToken = await fetchAccessToken();

//     avatar.current = new StreamingAvatar({
//       token: newToken,
//     });
//     avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
//       console.log("Avatar started talking", e);
//     });
//     avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
//       console.log("Avatar stopped talking", e);
//     });
//     avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
//       console.log("Stream disconnected");
//       endSession();
//     });
//     avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
//       console.log(">>>>> Stream ready:", event.detail);
//       setStream(event.detail);
//     });
//     avatar.current?.on(StreamingEvents.USER_START, (event) => {
//       console.log(">>>>> User started talking:", event);
//       setIsUserTalking(true);
//     });
//     avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
//       console.log(">>>>> User stopped talking:", event);
//       setIsUserTalking(false);
//     });
//     try {
//       const res = await avatar.current.createStartAvatar({
//         quality: AvatarQuality.Low,
//         avatarName: avatarId,
//         knowledgeId: knowledgeId, // Or use a custom `knowledgeBase`.
//         voice: {
//           rate: 1.5, // 0.5 ~ 1.5
//           emotion: VoiceEmotion.EXCITED,
//           // elevenlabsSettings: {
//           //   stability: 1,
//           //   similarity_boost: 1,
//           //   style: 1,
//           //   use_speaker_boost: false,
//           // },
//         },
//         language: language,
//         disableIdleTimeout: true,
//       });

//       setData(res);
//       // default to voice mode
//       await avatar.current?.startVoiceChat({
//         useSilencePrompt: false,
//       });
//       setChatMode("voice_mode");
//     } catch (error) {
//       console.error("Error starting avatar session:", error);
//     } finally {
//       setIsLoadingSession(false);
//     }
//   }
//   async function handleSpeak() {
//     setIsLoadingRepeat(true);
//     if (!avatar.current) {
//       setDebug("Avatar API not initialized");

//       return;
//     }
//     // speak({ text: text, task_type: TaskType.REPEAT })
//     await avatar.current
//       .speak({ text: text, taskType: TaskType.REPEAT, taskMode: TaskMode.SYNC })
//       .catch((e) => {
//         setDebug(e.message);
//       });
//     setIsLoadingRepeat(false);
//   }
//   async function handleInterrupt() {
//     if (!avatar.current) {
//       setDebug("Avatar API not initialized");

//       return;
//     }
//     await avatar.current.interrupt().catch((e) => {
//       setDebug(e.message);
//     });
//   }
//   async function endSession() {
//     await avatar.current?.stopAvatar();
//     setStream(undefined);
//   }

//   const handleChangeChatMode = useMemoizedFn(async (v) => {
//     if (v === chatMode) {
//       return;
//     }
//     if (v === "text_mode") {
//       avatar.current?.closeVoiceChat();
//     } else {
//       await avatar.current?.startVoiceChat();
//     }
//     setChatMode(v);
//   });

//   const previousText = usePrevious(text);
//   useEffect(() => {
//     if (!previousText && text) {
//       avatar.current?.startListening();
//     } else if (previousText && !text) {
//       avatar?.current?.stopListening();
//     }
//   }, [text, previousText]);

//   useEffect(() => {
//     return () => {
//       endSession();
//     };
//   }, []);

//   useEffect(() => {
//     if (stream && mediaStream.current) {
//       mediaStream.current.srcObject = stream;
//       mediaStream.current.onloadedmetadata = () => {
//         mediaStream.current!.play();
//         setDebug("Playing");
//       };
//     }
//   }, [mediaStream, stream]);

//   return (
//     <div className="w-full flex flex-col gap-4">
//       <Card>
//         <CardBody className="h-[500px] flex flex-col justify-center items-center">
//           {stream ? (
//             <div className="h-[500px] w-[900px] justify-center items-center flex rounded-lg overflow-hidden">
//               <video
//                 ref={mediaStream}
//                 autoPlay
//                 playsInline
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                 }}
//               >
//                 <track kind="captions" />
//               </video>
//               <div className="flex flex-col gap-2 absolute bottom-3 right-3">
//                 <Button
//                   className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white rounded-lg"
//                   size="md"
//                   variant="shadow"
//                   onClick={handleInterrupt}
//                 >
//                   Interrupt task
//                 </Button>
//                 <Button
//                   className="bg-gradient-to-tr from-indigo-500 to-indigo-300  text-white rounded-lg"
//                   size="md"
//                   variant="shadow"
//                   onClick={endSession}
//                 >
//                   End session
//                 </Button>
//               </div>
//             </div>
//           ) : !isLoadingSession ? (
//             <div className="h-full justify-center items-center flex flex-col gap-8 w-[500px] self-center">
//               <div className="flex flex-col gap-2 w-full">
//                 <p className="text-sm font-medium leading-none">
//                   Custom Knowledge ID (optional)
//                 </p>
//                 <Input
//                   placeholder="Enter a custom knowledge ID"
//                   value={knowledgeId}
//                   onChange={(e) => setKnowledgeId(e.target.value)}
//                 />
//                 <p className="text-sm font-medium leading-none">
//                   Custom Avatar ID (optional)
//                 </p>
//                 <Input
//                   placeholder="Enter a custom avatar ID"
//                   value={avatarId}
//                   onChange={(e) => setAvatarId(e.target.value)}
//                 />
//                 <Select
//                   placeholder="Or select one from these example avatars"
//                   size="md"
//                   onChange={(e) => {
//                     setAvatarId(e.target.value);
//                   }}
//                 >
//                   {AVATARS.map((avatar) => (
//                     <SelectItem
//                       key={avatar.avatar_id}
//                       textValue={avatar.avatar_id}
//                     >
//                       {avatar.name}
//                     </SelectItem>
//                   ))}
//                 </Select>
//                 <Select
//                   label="Select language"
//                   placeholder="Select language"
//                   className="max-w-xs"
//                   selectedKeys={[language]}
//                   onChange={(e) => {
//                     setLanguage(e.target.value);
//                   }}
//                 >
//                   {STT_LANGUAGE_LIST.map((lang) => (
//                     <SelectItem key={lang.key}>{lang.label}</SelectItem>
//                   ))}
//                 </Select>
//               </div>
//               <Button
//                 className="bg-gradient-to-tr from-indigo-500 to-indigo-300 w-full text-white"
//                 size="md"
//                 variant="shadow"
//                 onClick={startSession}
//               >
//                 Start session
//               </Button>
//             </div>
//           ) : (
//             <Spinner color="default" size="lg" />
//           )}
//         </CardBody>
//         <Divider />
//         <CardFooter className="flex flex-col gap-3 relative">
//           <Tabs
//             aria-label="Options"
//             selectedKey={chatMode}
//             onSelectionChange={(v) => {
//               handleChangeChatMode(v);
//             }}
//           >
//             <Tab key="text_mode" title="Text mode" />
//             <Tab key="voice_mode" title="Voice mode" />
//           </Tabs>
//           {chatMode === "text_mode" ? (
//             <div className="w-full flex relative">
//               <InteractiveAvatarTextInput
//                 disabled={!stream}
//                 input={text}
//                 label="Chat"
//                 loading={isLoadingRepeat}
//                 placeholder="Type something for the avatar to respond"
//                 setInput={setText}
//                 onSubmit={handleSpeak}
//               />
//               {text && (
//                 <Chip className="absolute right-16 top-3">Listening</Chip>
//               )}
//             </div>
//           ) : (
//             <div className="w-full text-center">
//               <Button
//                 isDisabled={!isUserTalking}
//                 className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white"
//                 size="md"
//                 variant="shadow"
//               >
//                 {isUserTalking ? "Listening" : "Voice chat"}
//               </Button>
//             </div>
//           )}
//         </CardFooter>
//       </Card>
//       <p className="font-mono text-right">
//         <span className="font-bold">Console:</span>
//         <br />
//         {debug}
//       </p>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { AVATARS, STT_LANGUAGE_LIST } from "../lib/constants";
import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";

export default function InteractiveAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [knowledgeId, setKnowledgeId] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const [text, setText] = useState<string>("");
  const [chatMode, setChatMode] = useState("text_mode");
  const [isUserTalking, setIsUserTalking] = useState(false);
  const mediaStream = useRef<HTMLVideoElement>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/get-access-token",
        {
          method: "POST",
        }
      );
      const token = await response.text();
      console.log("Access Token:", token);
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
    return "";
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();
    console.log("Starting avatar session with token:", newToken);

    // Simulate API call
    setTimeout(() => {
      setStream(new MediaStream()); // Fake stream for demo
      setChatMode("voice_mode");
      setIsLoadingSession(false);
    }, 2000);
  }

  async function handleSpeak() {
    setIsLoadingRepeat(true);
    console.log("Speaking:", text);
    setTimeout(() => {
      setIsLoadingRepeat(false);
    }, 1000);
  }

  async function endSession() {
    console.log("Ending session...");
    setStream(undefined);
  }

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          backgroundColor: "",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderBottom: "none",
            borderRadius: "8px",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: "10px",
            backgroundColor: "#18181B",
          }}
        >
          {/* Video Streaming */}
          <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {stream ? (
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              >
                <track kind="captions" />
              </video>
            ) : !isLoadingSession ? (
              <div style={{ textAlign: "center" }}>
                <p>Custom Knowledge ID (optional)</p>
                <input
                  type="text"
                  placeholder="Enter a custom knowledge ID"
                  value={knowledgeId}
                  onChange={(e) => setKnowledgeId(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "77%",
                    marginBottom: "10px",
                  }}
                />
                <p>Custom Avatar ID (optional)</p>
                <input
                  type="text"
                  placeholder="Enter a custom avatar ID"
                  value={avatarId}
                  onChange={(e) => setAvatarId(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "77%",
                    marginBottom: "10px",
                  }}
                />
                <select
                  onChange={(e) => setAvatarId(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "80%",
                    marginBottom: "10px",
                  }}
                >
                  <option value="">Select an Avatar</option>
                  {AVATARS.map((avatar) => (
                    <option key={avatar.avatar_id} value={avatar.avatar_id}>
                      {avatar.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                  style={{
                    padding: "8px",
                    width: "80%",
                    marginBottom: "10px",
                  }}
                >
                  {STT_LANGUAGE_LIST.map((lang) => (
                    <option key={lang.key} value={lang.key}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={startSession}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #6a5acd, #9fa2ff)", // Gradient effect
                    color: "white",
                    padding: "10px",
                    width: "80%",
                    boxShadow: "0px 0px 3px 1px rgba(255, 255, 255, 0.8)", // White shadow
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Start session
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Chat Mode Tabs */}
        <div
          style={{
            borderTop: "1px solid #ddd",
            borderRight: "1px solid #ddd",
            borderLeft: "1px solid #ddd",
            paddingTop: "10px",
            backgroundColor: "#18181B",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "#222",
                borderRadius: "30px",
                padding: "5px",
                gap: "5px",
                width: "200px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "85%",
                  background: "gray",
                  borderRadius: "30px",
                  transition: "0.3s",
                  left: chatMode === "text_mode" ? "0%" : "50%",
                }}
              />
              <button
                onClick={() => setChatMode("text_mode")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "transparent",
                  color: chatMode === "text_mode" ? "white" : "#aaa",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Text Mode
              </button>
              <button
                onClick={() => setChatMode("voice_mode")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "transparent",
                  color: chatMode === "voice_mode" ? "white" : "#aaa",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Voice Mode
              </button>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        {chatMode === "text_mode" ? (
          <InteractiveAvatarTextInput
            disabled={!stream}
            input={text}
            label="Chat"
            loading={isLoadingRepeat}
            placeholder="Type something for the avatar to respond"
            setInput={setText}
            onSubmit={handleSpeak}
          />
        ) : (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              disabled={!isUserTalking}
              style={{
                backgroundColor: isUserTalking ? "green" : "gray",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isUserTalking ? "Listening" : "Voice chat"}
            </button>
          </div>
        )}

        {/* Debug Console */}
        <p style={{ fontFamily: "monospace", textAlign: "right" }}>
          <strong>Console:</strong>
          <br />
          {debug}
        </p>
      </div>
    </div>
  );
}
