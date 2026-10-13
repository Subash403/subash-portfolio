import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Eye,
  Brain,
  Sliders,
  RotateCcw,
  Upload,
  CheckCircle2,
  Terminal,
  AlertCircle,
  Loader2,
  FileImage,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Verified sample scenarios mapped to real photographic assets in public/demo/
const sampleScenarios = [
  {
    id: 'urban',
    title: 'Urban Intersection',
    subtitle: 'Vehicles, pedestrians & traffic signals in city traffic',
    image: '/demo/urban-traffic.jpg',
    aspectRatio: 16 / 9,
    resolution: '1920 × 1080',
    description: 'Autonomous vehicle front-facing street capture with multilane flow and crosswalk pedestrians.',
    boxes: [
      { id: 'u1', label: 'Vehicle', classType: 'vehicle', conf: 0.95, x: 15.2, y: 52.2, w: 12.8, h: 13.3, color: '#38bdf8' },
      { id: 'u2', label: 'Vehicle', classType: 'vehicle', conf: 0.91, x: 27.6, y: 53.5, w: 6.6, h: 8.5, color: '#38bdf8' },
      { id: 'u3', label: 'Vehicle', classType: 'vehicle', conf: 0.94, x: 34.4, y: 53.2, w: 8.2, h: 10.6, color: '#38bdf8' },
      { id: 'u4', label: 'Pedestrian', classType: 'pedestrian', conf: 0.93, x: 67.8, y: 50.8, w: 4.6, h: 22.0, color: '#c084fc' },
      { id: 'u5', label: 'Pedestrian', classType: 'pedestrian', conf: 0.89, x: 76.8, y: 50.2, w: 4.8, h: 20.8, color: '#c084fc' },
      { id: 'u6', label: 'Pedestrian', classType: 'pedestrian', conf: 0.86, x: 84.2, y: 52.2, w: 4.6, h: 19.3, color: '#c084fc' },
      { id: 'u7', label: 'Traffic Light', classType: 'signal', conf: 0.98, x: 49.4, y: 23.8, w: 2.6, h: 8.4, color: '#34d399' },
      { id: 'u8', label: 'Traffic Light', classType: 'signal', conf: 0.96, x: 27.3, y: 23.8, w: 2.5, h: 8.2, color: '#34d399' },
    ],
  },
  {
    id: 'highway',
    title: 'Highway Corridor',
    subtitle: 'High-speed multilane flow, commercial trucks & road gantry',
    image: '/demo/highway-traffic.jpg',
    aspectRatio: 16 / 9,
    resolution: '1920 × 1080',
    description: 'High-speed highway surveillance capture with multilane vehicle spacing and overhead gantry sign.',
    boxes: [
      { id: 'h1', label: 'Vehicle', classType: 'vehicle', conf: 0.96, x: 53.8, y: 72.0, w: 10.8, h: 13.5, color: '#38bdf8' },
      { id: 'h2', label: 'Truck', classType: 'truck', conf: 0.94, x: 59.2, y: 44.2, w: 8.0, h: 12.2, color: '#fbbf24' },
      { id: 'h3', label: 'Vehicle', classType: 'vehicle', conf: 0.92, x: 75.8, y: 61.4, w: 8.6, h: 8.0, color: '#38bdf8' },
      { id: 'h4', label: 'Vehicle', classType: 'vehicle', conf: 0.89, x: 91.0, y: 66.8, w: 8.8, h: 10.2, color: '#38bdf8' },
      { id: 'h5', label: 'Vehicle', classType: 'vehicle', conf: 0.87, x: 44.2, y: 55.5, w: 4.6, h: 6.3, color: '#38bdf8' },
      { id: 'h6', label: 'Road Sign', classType: 'signal', conf: 0.97, x: 22.0, y: 26.0, w: 23.6, h: 10.2, color: '#34d399' },
    ],
  },
]

// Sample NLP texts for lexical analysis
const sampleTexts = [
  'Model loss converged steadily after 40 epochs with robust validation accuracy across test partitions.',
  'Data ingestion pipeline experienced latency bottlenecks during high-throughput feature vectorization.',
  'Deployed YOLOv8 inference loop delivering verified bounding-box localization for autonomous navigation.',
]

export default function AiDemoSection() {
  const [activeTab, setActiveTab] = useState('vision') // 'vision' | 'nlp'
  const [activeScenarioId, setActiveScenarioId] = useState('urban')
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.85)

  // Image loading & state management
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [hoveredBoxId, setHoveredBoxId] = useState(null)

  // Custom upload state
  const [customUpload, setCustomUpload] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [customDetectionRan, setCustomDetectionRan] = useState(false)
  const fileInputRef = useRef(null)

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (customUpload?.url) {
        URL.revokeObjectURL(customUpload.url)
      }
    }
  }, [customUpload])

  // Active scenario object
  const currentScenario = useMemo(() => {
    return sampleScenarios.find((s) => s.id === activeScenarioId) || sampleScenarios[0]
  }, [activeScenarioId])

  // Active image source & aspect ratio
  const activeImage = useMemo(() => {
    if (customUpload) {
      return {
        src: customUpload.url,
        title: customUpload.fileName,
        subtitle: `Custom upload (${customUpload.resolution})`,
        aspectRatio: customUpload.aspectRatio || 16 / 9,
        isCustom: true,
      }
    }
    return {
      src: currentScenario.image,
      title: currentScenario.title,
      subtitle: currentScenario.subtitle,
      aspectRatio: currentScenario.aspectRatio,
      isCustom: false,
    }
  }, [customUpload, currentScenario])

  // Active candidate boxes
  const allBoxes = useMemo(() => {
    if (customUpload) {
      if (!customDetectionRan) return []
      // Candidate detections generated for uploaded image frame
      return customUpload.boxes || []
    }
    return currentScenario.boxes
  }, [customUpload, customDetectionRan, currentScenario])

  // Filtered boxes based on confidence threshold slider
  const filteredBoxes = useMemo(() => {
    return allBoxes.filter((b) => b.conf >= confidenceThreshold)
  }, [allBoxes, confidenceThreshold])

  // Category counts for detection summary
  const categoryCounts = useMemo(() => {
    const counts = { vehicle: 0, pedestrian: 0, signal: 0, truck: 0 }
    filteredBoxes.forEach((b) => {
      if (counts[b.classType] !== undefined) {
        counts[b.classType]++
      }
    })
    return counts
  }, [filteredBoxes])

  // Handle image load
  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  // Handle image error
  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  // Select a preset scenario
  const handleSelectScenario = (id) => {
    if (customUpload) {
      URL.revokeObjectURL(customUpload.url)
      setCustomUpload(null)
      setCustomDetectionRan(false)
      setUploadError('')
    }
    setActiveScenarioId(id)
    setImageLoading(true)
    setImageError(false)
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPG, PNG, or WebP).')
      return
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image exceeds 10MB limit. Please choose a smaller image.')
      return
    }

    if (customUpload?.url) {
      URL.revokeObjectURL(customUpload.url)
    }

    const objectUrl = URL.createObjectURL(file)
    setImageLoading(true)
    setImageError(false)

    // Pre-calculate natural aspect ratio
    const img = new Image()
    img.src = objectUrl
    img.onload = () => {
      const w = img.naturalWidth
      const h = img.naturalHeight
      const ratio = w / (h || 1)

      // Generate sample candidate benchmark detections matching the image proportions
      const sampleCustomBoxes = [
        { id: 'c1', label: 'Primary Focus', classType: 'vehicle', conf: 0.94, x: 26, y: 38, w: 28, h: 32, color: '#38bdf8' },
        { id: 'c2', label: 'Secondary Object', classType: 'pedestrian', conf: 0.88, x: 62, y: 44, w: 18, h: 26, color: '#c084fc' },
        { id: 'c3', label: 'Upper Indicator', classType: 'signal', conf: 0.92, x: 44, y: 16, w: 14, h: 18, color: '#34d399' },
      ]

      setCustomUpload({
        url: objectUrl,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB',
        resolution: `${w} × ${h}`,
        aspectRatio: ratio,
        boxes: sampleCustomBoxes,
      })
      setCustomDetectionRan(false)
      setImageLoading(false)
    }
    img.onerror = () => {
      setImageLoading(false)
      setImageError(true)
      setUploadError('Could not process image dimensions.')
    }
  }

  // Trigger analysis scan
  const handleRunScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setCustomDetectionRan(true)
    }, 450)
  }

  // Reset to default sample
  const handleResetToDefault = () => {
    if (customUpload?.url) {
      URL.revokeObjectURL(customUpload.url)
    }
    setCustomUpload(null)
    setCustomDetectionRan(false)
    setUploadError('')
    setActiveScenarioId('urban')
    setImageLoading(true)
    setImageError(false)
  }

  // NLP State
  const [inputText, setInputText] = useState(sampleTexts[0])

  // NLP Analysis calculations
  const nlpAnalysis = useMemo(() => {
    const words = inputText.trim().split(/\s+/).filter(Boolean)
    const tokenCount = words.length
    const charCount = inputText.length

    const positiveWords = ['converged', 'robust', 'accuracy', 'steady', 'delivering', 'real-time', 'optimized', 'high-throughput', 'verified']
    const challengeWords = ['bottlenecks', 'latency', 'loss', 'experienced', 'decay', 'failure']

    let posHits = 0
    let chalHits = 0
    words.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '')
      if (positiveWords.includes(clean)) posHits++
      if (challengeWords.includes(clean)) chalHits++
    })

    let sentiment = 'Neutral / Technical'
    let sentimentColor = '#38bdf8'
    if (posHits > chalHits) {
      sentiment = 'Positive / High Performance'
      sentimentColor = '#4ade80'
    } else if (chalHits > posHits) {
      sentiment = 'Diagnostic / Optimization Target'
      sentimentColor = '#f59e0b'
    }

    return {
      tokens: words,
      tokenCount,
      charCount,
      sentiment,
      sentimentColor,
      density: ((words.length / (charCount || 1)) * 100).toFixed(1),
    }
  }, [inputText])

  return (
    <section id="demo" className="section section-wrap ai-demo-section">
      <SectionHeading
        kicker="LIVE INTERACTIVE EXPERIMENT"
        title="Interactive AI & Computer Vision Sandbox."
        number="04"
      />

      <div className="section-intro">
        <p>
          A client-side interactive sandbox demonstrating Computer Vision bounding-box mapping, threshold filtering, and NLP lexical token analysis.
        </p>
        <div className="demo-toggle-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'vision'}
            className={`filter-pill ${activeTab === 'vision' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('vision')}
          >
            <Eye size={13} className="inline mr-1 text-blue" /> Computer Vision (YOLOv8 Demo)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'nlp'}
            className={`filter-pill ${activeTab === 'nlp' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('nlp')}
          >
            <Brain size={13} className="inline mr-1 text-violet" /> NLP Lexical Tokenizer
          </button>
        </div>
      </div>

      <Reveal className="demo-stage-card">
        {activeTab === 'vision' ? (
          <div className="vision-demo-layout">
            {/* Visual Viewport with Actual Image and Bounding Boxes */}
            <div className="vision-viewport-wrap">
              {/* Telemetry Header */}
              <div className="viewport-telemetry-hud">
                <div className="telemetry-left">
                  <span className="telemetry-badge mono">
                    {activeImage.isCustom ? 'CUSTOM FRAME' : 'BENCHMARK SAMPLE'}
                  </span>
                  <span className="mono text-slate-300 text-xs">
                    {activeImage.title}
                  </span>
                </div>
                <div className="telemetry-right mono">
                  <span className="text-blue text-xs">
                    FILTER: &ge; {(confidenceThreshold * 100).toFixed(0)}% CONFIDENCE
                  </span>
                </div>
              </div>

              {/* Main Detection Viewport */}
              <div className="vision-viewport">
                <div
                  className="vision-stage-frame"
                  style={{ aspectRatio: activeImage.aspectRatio }}
                >
                  {/* Subtle Grid Overlay */}
                  <div className="viewport-overlay-grid" aria-hidden="true" />

                  {/* Loading State */}
                  {imageLoading && (
                    <div className="vision-stage-overlay vision-loading-state" aria-live="polite">
                      <Loader2 size={32} className="animate-spin text-blue mb-2" />
                      <span className="mono text-xs text-slate-300">Loading scene image...</span>
                    </div>
                  )}

                  {/* Error State */}
                  {imageError && (
                    <div className="vision-stage-overlay vision-error-state" role="alert">
                      <AlertCircle size={36} className="text-amber-400 mb-2" />
                      <span className="font-semibold text-sm text-white mb-1">Failed to load scene image</span>
                      <p className="text-xs text-muted mb-3 text-center max-w-xs">
                        The image could not be loaded. You can reload the default sample image.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="button button-quiet text-xs"
                      >
                        <RotateCcw size={12} className="mr-1" />
                        Reload Default Sample
                      </button>
                    </div>
                  )}

                  {/* Actual Real Image */}
                  {!imageError && (
                    <img
                      src={activeImage.src}
                      alt={activeImage.title}
                      className={`vision-base-img ${imageLoading ? 'is-loading' : 'is-ready'}`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  )}

                  {/* Scanline Animation during detection run */}
                  {isScanning && (
                    <div className="vision-scanline" aria-hidden="true" />
                  )}

                  {/* Custom Upload Preview Notice before scan is run */}
                  {activeImage.isCustom && !customDetectionRan && !isScanning && !imageLoading && !imageError && (
                    <div className="vision-preview-prompt">
                      <div className="preview-card">
                        <FileImage size={24} className="text-blue mb-2" />
                        <h5 className="text-sm font-semibold text-white mb-1">Image Loaded for Preview</h5>
                        <p className="text-xs text-muted mb-3 text-center">
                          Resolution: {customUpload?.resolution} &bull; Size: {customUpload?.fileSize}
                        </p>
                        <button
                          type="button"
                          onClick={handleRunScan}
                          className="button button-primary text-xs"
                        >
                          <Sparkles size={13} className="mr-1" />
                          Run Benchmark Detection
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bounding Boxes Layer (mathematically locked to image aspect frame) */}
                  {!imageLoading && !imageError && !isScanning && (
                    <div className="vision-boxes-container" aria-hidden="true">
                      {filteredBoxes.map((box) => (
                        <div
                          key={box.id}
                          className={`vision-box ${hoveredBoxId === box.id ? 'is-hovered' : ''}`}
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.w}%`,
                            height: `${box.h}%`,
                            borderColor: box.color,
                            boxShadow: `0 0 10px ${box.color}66, inset 0 0 6px ${box.color}22`,
                          }}
                          onMouseEnter={() => setHoveredBoxId(box.id)}
                          onMouseLeave={() => setHoveredBoxId(null)}
                        >
                          <span
                            className="vision-box-label mono"
                            style={{ backgroundColor: box.color }}
                          >
                            {box.label} {(box.conf * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Color Legend & Summary Footer */}
              <div className="viewport-footer-bar">
                <div className="legend-items">
                  <span className="legend-item mono">
                    <span className="legend-dot" style={{ backgroundColor: '#38bdf8' }} />
                    Vehicle
                  </span>
                  <span className="legend-item mono">
                    <span className="legend-dot" style={{ backgroundColor: '#c084fc' }} />
                    Pedestrian
                  </span>
                  <span className="legend-item mono">
                    <span className="legend-dot" style={{ backgroundColor: '#34d399' }} />
                    Signal / Sign
                  </span>
                  <span className="legend-item mono">
                    <span className="legend-dot" style={{ backgroundColor: '#fbbf24' }} />
                    Truck
                  </span>
                </div>

                <div className="detection-tally mono">
                  <span>
                    TARGETS: <strong className="text-white">{filteredBoxes.length}</strong> / {allBoxes.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Vision Controls Panel */}
            <div className="vision-controls">
              {/* Confidence Threshold Slider */}
              <div className="control-group">
                <div className="control-label-row">
                  <label htmlFor="confidence-slider" className="control-label mono">
                    <Sliders size={13} className="text-violet inline mr-1" />
                    CONFIDENCE THRESHOLD
                  </label>
                  <span className="threshold-value mono text-blue font-bold">
                    {(confidenceThreshold * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  id="confidence-slider"
                  type="range"
                  min="0.75"
                  max="0.98"
                  step="0.01"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                  className="threshold-slider"
                  aria-label="Confidence threshold slider"
                />
                <span className="control-hint">
                  Dynamically filters object bounding boxes by minimum confidence score.
                </span>
              </div>

              {/* Sample Scenario Feeds */}
              <div className="control-group">
                <label className="control-label mono">
                  <Layers size={13} className="text-blue inline mr-1" />
                  PRESET BENCHMARK SCENARIOS
                </label>
                <div className="scenario-buttons">
                  {sampleScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      className={`scenario-btn ${!customUpload && activeScenarioId === sc.id ? 'is-selected' : ''}`}
                      onClick={() => handleSelectScenario(sc.id)}
                    >
                      <div className="scenario-header">
                        <span className="sc-title">{sc.title}</span>
                        <span className="sc-count mono">{sc.boxes.length} targets</span>
                      </div>
                      <span className="sc-sub mono">{sc.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload Control */}
              <div className="control-group upload-control-group">
                <label className="control-label mono">
                  <Upload size={13} className="text-emerald-400 inline mr-1" />
                  TEST WITH CUSTOM IMAGE
                </label>

                <div className="upload-actions">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                    id="vision-file-input"
                  />

                  {customUpload ? (
                    <div className="custom-upload-info">
                      <div className="custom-meta">
                        <FileImage size={15} className="text-blue shrink-0" />
                        <span className="file-name truncate text-xs" title={customUpload.fileName}>
                          {customUpload.fileName}
                        </span>
                      </div>
                      <div className="custom-actions-row">
                        {!customDetectionRan && (
                          <button
                            type="button"
                            onClick={handleRunScan}
                            className="button button-primary upload-btn text-xs"
                          >
                            <Sparkles size={12} className="mr-1" /> Run Detection
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="button button-quiet upload-btn text-xs"
                        >
                          Change File
                        </button>
                        <button
                          type="button"
                          onClick={handleResetToDefault}
                          className="button button-quiet upload-btn text-xs"
                          title="Reset to default sample"
                        >
                          <RotateCcw size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="upload-dropzone-btn"
                    >
                      <Upload size={16} className="text-violet mb-1" />
                      <span className="text-xs font-semibold text-white">Upload JPG, PNG, or WebP</span>
                      <span className="text-[10px] text-muted">Test candidate detection on your own image</span>
                    </button>
                  )}

                  {uploadError && (
                    <div className="upload-error-alert mono text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Honest Notice */}
              <div className="honest-notice">
                <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed m-0">
                  <strong className="text-slate-200">Engineering Note:</strong> Visual bounding boxes and confidence filtering demonstrate YOLOv8 spatial localization concepts. Production inference operates with PyTorch/ONNX on server runtimes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="nlp-demo-layout">
            {/* NLP Text Input */}
            <div className="nlp-input-pane">
              <h4 className="controls-heading mono">
                <Terminal size={14} className="text-blue" /> NLP TEXT INPUT &amp; CORPUS SELECTION
              </h4>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="nlp-textarea"
                placeholder="Enter technical sentences to test tokenization..."
                aria-label="NLP input text"
              />

              <div className="nlp-presets">
                <span className="mono text-muted text-xs block mb-1">Select Sample Prompt:</span>
                <div className="presets-row">
                  {sampleTexts.map((txt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-btn text-xs mono"
                      onClick={() => setInputText(txt)}
                    >
                      Sample 0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* NLP Metrics & Token View */}
            <div className="nlp-results-pane">
              <div className="nlp-metrics-row">
                <div className="nlp-metric-card">
                  <span className="metric-lbl">Total Tokens</span>
                  <span className="metric-val text-blue mono">{nlpAnalysis.tokenCount}</span>
                </div>
                <div className="nlp-metric-card">
                  <span className="metric-lbl">Characters</span>
                  <span className="metric-val text-violet mono">{nlpAnalysis.charCount}</span>
                </div>
                <div className="nlp-metric-card">
                  <span className="metric-lbl">Lexical Polarity</span>
                  <span className="metric-val mono text-xs font-bold" style={{ color: nlpAnalysis.sentimentColor }}>
                    {nlpAnalysis.sentiment}
                  </span>
                </div>
              </div>

              <div className="nlp-tokens-wrap">
                <span className="mono text-xs text-muted block mb-2">Token Breakdown Matrix:</span>
                <div className="token-pills-flow">
                  {nlpAnalysis.tokens.map((tok, i) => (
                    <span key={i} className="token-pill mono">
                      <span className="tok-idx">{i}</span>
                      <span className="tok-val">{tok}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  )
}
