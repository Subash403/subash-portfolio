// Authentic vector provider logos for certifications
export function OracleLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Oracle Cloud logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* Oracle Red Pill Logo */}
      <path
        d="M17 17H31C35.4183 17 39 20.134 39 24C39 27.866 35.4183 31 31 31H17C12.5817 31 9 27.866 9 24C9 20.134 12.5817 17 17 17ZM30.5 27.5C32.7091 27.5 34.5 25.933 34.5 24C34.5 22.067 32.7091 20.5 30.5 20.5H17.5C15.2909 20.5 13.5 22.067 13.5 24C13.5 25.933 15.2909 27.5 17.5 27.5H30.5Z"
        fill="#f80000"
      />
    </svg>
  )
}

export function SimplilearnLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Simplilearn logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* Simplilearn Infinity / Dual Nodes */}
      <circle cx="18" cy="24" r="7" stroke="#2563eb" strokeWidth="4" />
      <circle cx="30" cy="24" r="7" stroke="#f97316" strokeWidth="4" />
      <circle cx="24" cy="24" r="2.5" fill="#ffffff" />
    </svg>
  )
}

export function ExcelLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Microsoft Excel logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* Excel Green Badge */}
      <rect x="10" y="11" width="28" height="26" rx="4" fill="#107c41" />
      <path d="M19 18L24 24L19 30H22.5L25.5 26.2L28.5 30H32L27 24L32 18H28.5L25.5 21.8L22.5 18H19Z" fill="#ffffff" />
    </svg>
  )
}

export function HackerRankLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="HackerRank logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* HackerRank Green [H] mark */}
      <rect x="11" y="11" width="26" height="26" rx="4" fill="#00ea64" />
      <path d="M18 17V31H21V25.5H27V31H30V17H27V22.5H21V17H18Z" fill="#080910" />
    </svg>
  )
}

export function TataForageLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Tata and Forage logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* Tata Blue Crest / Forage Chevron */}
      <rect x="10" y="11" width="28" height="26" rx="4" fill="#005a9c" />
      <path d="M16 18H32V21H25.5V30H22.5V21H16V18Z" fill="#ffffff" />
      <path d="M28 27L32 30L36 27" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function HpLifeLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="HP LIFE logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* HP Blue Circle with diagonal slashes */}
      <circle cx="24" cy="24" r="14" fill="#0096d6" />
      <path
        d="M20 16L18 32H20.5L22.5 16H20ZM24.5 16L22.5 32H25L27 16H24.5ZM28 21C29.5 21 31 22 30.5 24C30 26 28 27 26.5 27H25L26 21H28Z"
        fill="#ffffff"
      />
    </svg>
  )
}

export function PantechLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Pantech Learning logo" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      {/* Pantech Tech Crest */}
      <rect x="10" y="11" width="28" height="26" rx="4" fill="#6366f1" />
      <path d="M18 17V31H21.5V25H25.5C28 25 30 23.5 30 21C30 18.5 28 17 25.5 17H18ZM21.5 20H25C26 20 27 20.3 27 21C27 21.7 26 22 25 22H21.5V20Z" fill="#ffffff" />
    </svg>
  )
}

export function DefaultCertLogo({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-label="Certificate Badge" role="img">
      <rect width="48" height="48" rx="8" fill="#1b1c28" />
      <circle cx="24" cy="24" r="12" stroke="#a184ff" strokeWidth="2.5" />
      <path d="M18 24L22 28L30 19" stroke="#80dcff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function getProviderLogo(issuer, title) {
  const normIssuer = (issuer || '').toLowerCase()
  const normTitle = (title || '').toLowerCase()

  if (normIssuer.includes('oracle') || normTitle.includes('oracle')) {
    return OracleLogo
  }
  if (normIssuer.includes('simplilearn') || normTitle.includes('simplilearn')) {
    return SimplilearnLogo
  }
  if (normIssuer.includes('hackerrank') || normTitle.includes('hackerrank')) {
    return HackerRankLogo
  }
  if (normIssuer.includes('forage') || normIssuer.includes('tata') || normTitle.includes('forage') || normTitle.includes('tata')) {
    return TataForageLogo
  }
  if (normIssuer.includes('hp') || normTitle.includes('hp life')) {
    return HpLifeLogo
  }
  if (normIssuer.includes('pantech') || normTitle.includes('pantech')) {
    return PantechLogo
  }
  if (normTitle.includes('excel') || normTitle.includes('analytics with excel')) {
    return ExcelLogo
  }
  return DefaultCertLogo
}
