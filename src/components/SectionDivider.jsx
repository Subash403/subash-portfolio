export default function SectionDivider({ label = 'SYS // 0X', accent = 'violet' }) {
  return (
    <div className={`section-divider-wrap divider-${accent}`} aria-hidden="true">
      <div className="divider-line divider-line-left" />
      <div className="divider-center">
        <span className="divider-diamond" />
        {label && <span className="divider-label mono">{label}</span>}
        <span className="divider-diamond" />
      </div>
      <div className="divider-line divider-line-right" />
    </div>
  )
}
