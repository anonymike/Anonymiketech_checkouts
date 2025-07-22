import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          background: "linear-gradient(135deg, #00E6E6 0%, #00BFFF 100%)",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        A
      </div>
    </div>,
    size,
  )
}
