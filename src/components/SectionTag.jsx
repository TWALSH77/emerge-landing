export default function SectionTag({ children, center = false }) {
  return (
    <div
      className="sec-tag"
      style={{
        fontSize: '0.68rem',
        fontWeight: 400,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--faint)',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...(center ? { justifyContent: 'center' } : {}),
      }}
    >
      {children}
    </div>
  )
}
