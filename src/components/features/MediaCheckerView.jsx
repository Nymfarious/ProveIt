import { useState, useRef } from 'react'
import { Camera, Upload, AlertTriangle, CheckCircle, XCircle, HelpCircle, Loader2, Image, Film, FileImage, Info, ChevronDown, ChevronUp, Eye, Zap } from 'lucide-react'

// Detection markers checklist
const DETECTION_MARKERS = {
  common: [
    { id: 'fingers', label: 'Finger anomalies', description: 'Extra, missing, or malformed fingers/hands', severity: 'high' },
    { id: 'text', label: 'Garbled text', description: 'Nonsensical text on signs, shirts, books', severity: 'high' },
    { id: 'symmetry', label: 'Facial asymmetry', description: 'Unnatural facial features or asymmetric elements', severity: 'medium' },
    { id: 'background', label: 'Background inconsistencies', description: 'Warped or illogical background elements', severity: 'medium' },
    { id: 'lighting', label: 'Lighting mismatches', description: 'Shadows going different directions, inconsistent highlights', severity: 'medium' },
    { id: 'edges', label: 'Edge artifacts', description: 'Blurry or jagged edges around subjects', severity: 'low' },
  ],
  uncommon: [
    { id: 'earrings', label: 'Earring mismatch', description: 'Different earrings or impossible jewelry placement', severity: 'medium' },
    { id: 'teeth', label: 'Teeth irregularities', description: 'Too many teeth, merged teeth, or unnatural arrangement', severity: 'medium' },
    { id: 'hair', label: 'Hair boundary issues', description: 'Hair that merges with background or has unrealistic flow', severity: 'low' },
    { id: 'patterns', label: 'Repeating patterns', description: 'Identical elements (tiles, leaves) that are too perfect', severity: 'low' },
    { id: 'reflections', label: 'Reflection errors', description: 'Missing or incorrect reflections in glasses/mirrors', severity: 'medium' },
    { id: 'skin', label: 'Skin texture', description: 'Overly smooth or plasticky skin appearance', severity: 'low' },
  ],
  advanced: [
    { id: 'metadata', label: 'Metadata analysis', description: 'Missing or inconsistent EXIF data', severity: 'high' },
    { id: 'compression', label: 'Compression artifacts', description: 'Inconsistent JPEG compression in different areas', severity: 'medium' },
    { id: 'noise', label: 'Noise patterns', description: 'Different noise levels in areas that should match', severity: 'medium' },
    { id: 'perspective', label: 'Perspective errors', description: 'Vanishing points that don\'t align correctly', severity: 'high' },
    { id: 'watermark', label: 'AI watermarks', description: 'Hidden or visible AI generation watermarks', severity: 'high' },
    { id: 'context', label: 'Contextual impossibilities', description: 'Things that couldn\'t exist in real life (wrong era objects, etc.)', severity: 'high' },
  ],
}

export default function MediaCheckerView() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [expandedSection, setExpandedSection] = useState('common')
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
      setFile(droppedFile)
      setResult(null)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(droppedFile)
    }
  }

  const analyzeMedia = async () => {
    if (!file) return
    setIsAnalyzing(true)
    
    // Simulate analysis (in production, this would call an AI vision API)
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Mock result - in production, each marker would be checked by AI
    const mockChecks = {}
    Object.entries(DETECTION_MARKERS).forEach(([category, markers]) => {
      markers.forEach(marker => {
        // Randomly assign detection status for demo
        const rand = Math.random()
        mockChecks[marker.id] = {
          detected: rand < 0.2,
          confidence: rand < 0.2 ? 0.6 + Math.random() * 0.3 : 0,
          note: rand < 0.2 ? 'Potential issue detected' : null,
        }
      })
    })
    
    // Calculate overall score
    const detectedCount = Object.values(mockChecks).filter(c => c.detected).length
    const totalChecks = Object.keys(mockChecks).length
    const authenticityScore = Math.max(0, 100 - (detectedCount * 15))
    
    setResult({
      score: authenticityScore,
      verdict: authenticityScore > 80 ? 'likely_real' : authenticityScore > 50 ? 'uncertain' : 'likely_fake',
      checks: mockChecks,
      detectedIssues: detectedCount,
      totalChecks,
      timestamp: new Date().toISOString(),
    })
    
    setIsAnalyzing(false)
  }

  const getVerdictDisplay = (verdict) => {
    switch (verdict) {
      case 'likely_real':
        return { icon: CheckCircle, color: 'text-forest', bg: 'bg-forest/10', label: 'Likely Authentic' }
      case 'uncertain':
        return { icon: HelpCircle, color: 'text-copper', bg: 'bg-copper/10', label: 'Uncertain' }
      case 'likely_fake':
        return { icon: XCircle, color: 'text-burgundy', bg: 'bg-burgundy/10', label: 'Likely AI-Generated' }
      default:
        return { icon: HelpCircle, color: 'text-steel', bg: 'bg-steel/10', label: 'Unknown' }
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-burgundy'
      case 'medium': return 'text-copper'
      case 'low': return 'text-steel'
      default: return 'text-ink/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Camera size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold">Media Authenticity Checker</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Analyze images and videos for AI generation markers
            </p>
          </div>
        </div>
        
        <button onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="mt-3 text-xs text-steel hover:text-copper flex items-center gap-1">
          <Info size={14} />
          How does this work?
          {showHowItWorks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {showHowItWorks && (
          <div className="mt-3 p-3 rounded-lg bg-steel/10 border border-steel/20 text-xs text-ink/60 dark:text-paper/60">
            <p className="mb-2"><strong>We check for 18+ detection markers in 3 categories:</strong></p>
            <ul className="space-y-1">
              <li>• <strong>Common:</strong> Fingers, text, facial symmetry, lighting</li>
              <li>• <strong>Uncommon:</strong> Jewelry, teeth, hair, reflections</li>
              <li>• <strong>Advanced:</strong> Metadata, compression, noise patterns</li>
            </ul>
            <p className="mt-2 text-[10px] text-ink/40">
              Note: This tool provides indicators, not definitive proof. AI detection is an evolving field.
            </p>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div 
        className="card border-2 border-dashed border-ink/20 dark:border-paper/20 hover:border-copper/50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!preview ? (
          <div className="py-12 text-center">
            <Upload size={40} className="mx-auto mb-4 text-ink/30 dark:text-paper/30" />
            <p className="font-medium mb-1">Drop media here or click to upload</p>
            <p className="text-sm text-ink/50 dark:text-paper/50">
              Supports: JPG, PNG, GIF, WebP, MP4
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-ink/30 dark:text-paper/30">
              <Image size={24} />
              <Film size={24} />
              <FileImage size={24} />
            </div>
          </div>
        ) : (
          <div className="relative">
            {file?.type.startsWith('video/') ? (
              <video src={preview} controls className="max-h-64 mx-auto rounded-lg" />
            ) : (
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null) }}
              className="absolute top-2 right-2 p-2 rounded-full bg-ink/80 text-white hover:bg-burgundy transition-colors"
            >
              <XCircle size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      {preview && !result && (
        <button
          onClick={analyzeMedia}
          disabled={isAnalyzing}
          className="btn-primary w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing media...
            </>
          ) : (
            <>
              <Eye size={18} />
              Check Authenticity
            </>
          )}
        </button>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Verdict */}
          <div className="card">
            {(() => {
              const v = getVerdictDisplay(result.verdict)
              const Icon = v.icon
              return (
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${v.bg}`}>
                    <Icon size={32} className={v.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-headline text-xl font-bold ${v.color}`}>
                      {v.label}
                    </h3>
                    <p className="text-sm text-ink/60 dark:text-paper/60">
                      {result.detectedIssues} potential issues found out of {result.totalChecks} checks
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      result.score > 80 ? 'text-forest' : result.score > 50 ? 'text-copper' : 'text-burgundy'
                    }`}>
                      {result.score}%
                    </div>
                    <div className="text-xs text-ink/40">Authenticity</div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Authenticity Spectrum */}
          <div className="card">
            <h3 className="card-headline mb-3">Authenticity Spectrum</h3>
            <div className="relative h-6 rounded-full bg-gradient-to-r from-burgundy via-copper to-forest overflow-hidden">
              <div 
                className="absolute top-0 h-full w-1 bg-white shadow-lg"
                style={{ left: `${result.score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-ink/50 dark:text-paper/50 mt-2">
              <span>Likely Fake</span>
              <span>Uncertain</span>
              <span>Likely Real</span>
            </div>
          </div>

          {/* Detection Checklist */}
          <div className="card">
            <h3 className="card-headline mb-4 flex items-center gap-2">
              <Zap size={18} className="text-copper" />
              Detection Checklist
            </h3>

            {Object.entries(DETECTION_MARKERS).map(([category, markers]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === category ? null : category)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10"
                >
                  <span className="font-medium text-sm capitalize">{category} Signs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink/50">{markers.length} checks</span>
                    {expandedSection === category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {expandedSection === category && (
                  <div className="mt-2 space-y-2">
                    {markers.map((marker) => {
                      const check = result.checks[marker.id]
                      return (
                        <div 
                          key={marker.id}
                          className={`p-3 rounded-lg border ${
                            check?.detected 
                              ? 'bg-burgundy/10 border-burgundy/30' 
                              : 'bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              {check?.detected ? (
                                <AlertTriangle size={16} className="text-burgundy mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle size={16} className="text-forest mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className="font-medium text-sm">{marker.label}</p>
                                <p className="text-xs text-ink/50 dark:text-paper/50">{marker.description}</p>
                                {check?.detected && check.note && (
                                  <p className="text-xs text-burgundy mt-1">{check.note}</p>
                                )}
                              </div>
                            </div>
                            <span className={`text-xs ${getSeverityColor(marker.severity)}`}>
                              {marker.severity}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-steel/10 border border-steel/20">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-steel mt-0.5 flex-shrink-0" />
              <div className="text-xs text-ink/60 dark:text-paper/60">
                <p className="mb-1"><strong>Important:</strong> This analysis provides indicators, not definitive proof.</p>
                <p>AI-generated media detection is an evolving field. High-quality fakes may evade detection, and real images may trigger false positives. Use this as one tool among many for verification.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button 
              onClick={() => { setFile(null); setPreview(null); setResult(null) }}
              className="btn-ghost flex-1"
            >
              Check Another
            </button>
            <button className="btn-secondary flex-1">
              Download Report
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-ink/40 dark:text-paper/40">
        <p>Detection methods based on current AI generation patterns. Results may vary.</p>
      </div>
    </div>
  )
}
