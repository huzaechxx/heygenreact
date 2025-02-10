// import {
//   Link,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
// } from "@nextui-org/react";
// import { GithubIcon, HeyGenLogo } from "./Icons";
// import ThemeSwitch from "./ThemeSwitch";

// export default function NavBar() {
//   return (
//     <Navbar
//       className="w-full"
//       style={{
//         display: "flex",
//         backgroundColor: "blueviolet",
//         flexDirection: "row",
//       }}
//     >
//       <NavbarBrand
//         style={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "blue",
//         }}
//       >
//         <Link isExternal aria-label="HeyGen" href="https://app.heygen.com/">
//           <img
//             src="/heygen-logo.png"
//             style={{ height: 30, padding: 5 }}
//             alt="HeyGen Logo"
//           />
//         </Link>
//         <div
//           style={{
//             backgroundImage:
//               "linear-gradient(to bottom right, #7dd3fc, #6366f1)", // from-sky-300 to-indigo-500
//             WebkitBackgroundClip: "text", // bg-clip-text equivalent
//             color: "transparent", // Ensures text is visible only through the gradient
//             marginLeft: "1rem", // ml-4
//           }}
//           className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4"
//         >
//           <p
//             className="text-xl font-semibold text-transparent"
//             style={{
//               fontSize: "1.25rem", // text-xl (equivalent to 20px)
//               fontWeight: "600", // font-semibold
//               color: "transparent", // text-transparent
//             }}
//           >
//             HeyGen Interactive Avatar SDK NextJS Demo
//           </p>
//         </div>
//       </NavbarBrand>
//       <NavbarContent justify="center" style={{ backgroundColor: "red" }}>
//         <NavbarItem
//           style={{
//             display: "flex", // flex
//             flexDirection: "row", // flex-row
//             alignItems: "center", // items-center
//             gap: "1rem", // gap-4 (4 * 0.25rem = 1rem)
//             backgroundColor: "violet",
//           }}
//           className="flex flex-row items-center gap-4"
//         >
//           <Link
//             isExternal
//             color="foreground"
//             href="https://labs.heygen.com/interactive-avatar"
//           >
//             Avatars
//           </Link>
//           <Link
//             isExternal
//             color="foreground"
//             href="https://docs.heygen.com/reference/list-voices-v2"
//           >
//             Voices
//           </Link>
//           <Link
//             isExternal
//             color="foreground"
//             href="https://docs.heygen.com/reference/new-session-copy"
//           >
//             API Docs
//           </Link>
//           <Link
//             isExternal
//             color="foreground"
//             href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
//           >
//             Guide
//           </Link>
//           <Link
//             isExternal
//             aria-label="Github"
//             style={{
//               display: "flex", // flex
//               flexDirection: "row", // flex-row
//               justifyContent: "center", // justify-center
//               gap: "0.25rem", // gap-1 (1 × 0.25rem = 0.25rem)
//               color: "currentColor", // text-foreground (Tailwind's foreground color is usually inherited)
//             }}
//             href="https://github.com/HeyGen-Official/StreamingAvatarSDK"
//             className="flex flex-row justify-center gap-1 text-foreground"
//           >
//             <GithubIcon className="text-default-500" />
//             SDK
//           </Link>
//           <ThemeSwitch />
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }

import { GithubIcon, HeyGenLogo } from "./Icons";
import ThemeSwitch from "./ThemeSwitch";

export default function NavBar() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginBottom: 100 }}
    >
      <nav
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "0px",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          backgroundColor: "#111",
        }}
      >
        {/* Left Section - Brand Logo and Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px",
            borderRadius: "5px",
          }}
        >
          <a
            href="https://app.heygen.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HeyGen"
          >
            <img
              src="/heygen-logo.png"
              style={{ height: 30, padding: 5 }}
              alt="HeyGen Logo"
            />
          </a>
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #7dd3fc, #6366f1)", // Gradient effect
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginLeft: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "1.25rem", // text-xl (20px)
                fontWeight: "600", // font-semibold
                color: "transparent",
              }}
            >
              HeyGen Interactive Avatar SDK Demo
            </p>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0rem", // Spacing between links
            listStyle: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <li style={{ listStyle: "none" }}>
            <a
              href="https://labs.heygen.com/interactive-avatar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Avatars
            </a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a
              href="https://docs.heygen.com/reference/list-voices-v2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Voices
            </a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a
              href="https://docs.heygen.com/reference/new-session-copy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              API Docs
            </a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a
              href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Guide
            </a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a
              href="https://github.com/HeyGen-Official/StreamingAvatarSDK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.25rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              <GithubIcon />
              SDK
            </a>
          </li>
        </ul>

        {/* Right Section - Theme Switch */}
        <ThemeSwitch />
      </nav>
    </div>
  );
}
