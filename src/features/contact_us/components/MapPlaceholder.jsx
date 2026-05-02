export default function MapPlaceholder() {
  const latitude = 30.0444;
  const longitude = 31.2357;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto 60px",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          height: "300px",
        }}
      >
        <a
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0, pointerEvents: "none" }}
            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </a>
      </div>
    </div>
  );
}
