export default function ScrollProgress({ progress }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 1,
        width: `${progress}%`,
        background: 'rgba(255,255,255,0.35)',
        zIndex: 200,
        transition: 'width 0.05s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
