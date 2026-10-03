function CustomCursor({ cursorRef }) {
  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    >
      <span></span>
      <strong>VIEW</strong>
    </div>
  );
}

export default CustomCursor;