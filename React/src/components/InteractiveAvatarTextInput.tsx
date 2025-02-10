// import { Input, Spinner, Tooltip } from "@nextui-org/react";
// import { Airplane, ArrowRight, PaperPlaneRight } from "@phosphor-icons/react";
// import clsx from "clsx";

// interface StreamingAvatarTextInputProps {
//   label: string;
//   placeholder: string;
//   input: string;
//   onSubmit: () => void;
//   setInput: (value: string) => void;
//   endContent?: React.ReactNode;
//   disabled?: boolean;
//   loading?: boolean;
// }

// export default function InteractiveAvatarTextInput({
//   label,
//   placeholder,
//   input,
//   onSubmit,
//   setInput,
//   endContent,
//   disabled = false,
//   loading = false,
// }: StreamingAvatarTextInputProps) {
//   function handleSubmit() {
//     if (input.trim() === "") {
//       return;
//     }
//     onSubmit();
//     setInput("");
//   }

//   return (
//     <Input
//       endContent={
//         <div className="flex flex-row items-center h-full">
//           {endContent}
//           <Tooltip content="Send message">
//             {loading ? (
//               <Spinner
//                 className="text-indigo-300 hover:text-indigo-200"
//                 size="sm"
//                 color="default"
//               />
//             ) : (
//               <button
//                 type="submit"
//                 className="focus:outline-none"
//                 onClick={handleSubmit}
//               >
//                 <PaperPlaneRight
//                   className={clsx(
//                     "text-indigo-300 hover:text-indigo-200",
//                     disabled && "opacity-50"
//                   )}
//                   size={24}
//                 />
//               </button>
//             )}
//           </Tooltip>
//         </div>
//       }
//       label={label}
//       placeholder={placeholder}
//       size="sm"
//       value={input}
//       onKeyDown={(e) => {
//         if (e.key === "Enter") {
//           handleSubmit();
//         }
//       }}
//       onValueChange={setInput}
//       isDisabled={disabled}
//     />
//   );
// }

import { PaperPlaneRight } from "@phosphor-icons/react";

interface StreamingAvatarTextInputProps {
  label: string;
  placeholder: string;
  input: string;
  onSubmit: () => void;
  setInput: (value: string) => void;
  endContent?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function InteractiveAvatarTextInput({
  label,
  placeholder,
  input,
  onSubmit,
  setInput,
  endContent,
  disabled = false,
  loading = false,
}: StreamingAvatarTextInputProps) {
  function handleSubmit() {
    if (input.trim() === "") return;
    onSubmit();
    setInput("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#18181B",
        padding: 10,
        paddingBottom: 20,
        borderLeft: "0px solid #ddd",
        borderRight: "0px solid #ddd",
        borderBottom: "0px solid #ddd",
        borderEndStartRadius: 8,
        borderEndEndRadius: 8,
      }}
    >
      <label style={{ fontWeight: "600", fontSize: "14px" }}>{label}</label>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: "6px",
            border: "0px solid #ccc",
            fontSize: "14px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {endContent}
          {loading ? (
            <span style={{ color: "#6366f1", fontSize: "12px" }}>
              Loading...
            </span>
          ) : (
            <button
              type="submit"
              disabled={disabled}
              onClick={handleSubmit}
              style={{
                background: "none",
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                marginLeft: "8px",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <PaperPlaneRight
                size={24}
                color={disabled ? "#ccc" : "#6366f1"}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
