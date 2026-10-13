export default function SectionHeading({ kicker, title, number }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow"><span className="status-dot" /> {kicker}</span>
        <h2>{title}</h2>
      </div>
      <span className="section-number mono">{number}</span>
    </div>
  )
}