import { useState, useRef } from 'react'
import { Camera, Upload, AlertTriangle, CheckCircle, XCircle, HelpCircle, Loader2, Image, Film, FileImage, Info, ChevronDown, ChevronUp, Eye, Zap, Brain, RefreshCw, Mic, Volume2, Waveform } from 'lucide-react'

// IMAGE/VIDEO DETECTION MARKERS
const IMAGE_DETECTION_MARKERS = {
  common: [
    { id: 'fingers', label: 'Finger anomalies', description: 'Extra, missing, or malformed fingers/hands', severity: 'high' },
    { id: 'text', label: 'Garbled text', description: 'Nonsensical text on signs, shirts, books', severity: 'high' },
    { id: 'symmetry', label: 'Facial asymmetry', description: 'Unnatural facial features or asymmetric elements', severity: 'medium' },
    { id: 'background', label: 'Background inconsistencies', description: 'Warped or illogical background elements', severity: 'medium' },
    { id: 'lighting', label: 'Lighting mismatches', description: 'Shadows going different directions', severity: 'medium' },
    { id: 'edges', label: 'Edge artifacts', description: 'Blurry or jagged edges around subjects', severity: 'low' },
  ],
  uncommon: [
    { id: 'earrings', label: 'Earring mismatch', description: 'Different earrings or impossible jewelry', severity: 'medium' },
    { id: 'teeth', label: 'Teeth irregularities', description: 'Too many teeth or unnatural arrangement', severity: 'medium' },
    { id: 'hair', label: 'Hair boundary issues', description: 'Hair merges with background unrealistically', severity: 'low' },
    { id: 'patterns', label: 'Repeating patterns', description: 'Too-perfect identical elements', severity: 'low' },
    { id: 'reflections', label: 'Reflection errors', description: 'Missing/incorrect reflections', severity: 'medium' },
    { id: 'skin', label: 'Skin texture', description: 'Overly smooth or plasticky appearance', severity: 'low' },
  ],
  advanced: [
    { id: 'metadata', label: 'Metadata analysis', description: 'Missing or inconsistent EXIF data', severity: 'high' },
    { id: 'compression', label: 'Compression artifacts', description: 'Inconsistent JPEG compression', severity: 'medium' },
    { id: 'noise', label: 'Noise patterns', description: 'Different noise levels in matching areas', severity: 'medium' },
    { id: 'perspective', label: 'Perspective errors', description: 'Vanishing points don\'t align', severity: 'high' },
    { id: 'watermark', label: 'AI watermarks', description: 'Hidden or visible AI generation marks', severity: 'high' },
    { id: 'context', label: 'Contextual impossibilities', description: 'Objects from wrong era, impossible physics', severity: 'high' },
  ],
}

// AUDIO/VOICE DETECTION MARKERS
const AUDIO_DETECTION_MARKERS = {
  common: [
    { id: 'breathing', label: 'Breathing patterns', description: 'AI often lacks natural breath sounds between phrases', severity: 'high' },
    { id: 'pacing', label: 'Unnatural pacing', description: 'Too consistent timing, lacks human hesitation', severity: 'high' },
    { id: 'emotion', label: 'Flat emotion', description: 'Monotone delivery or exaggerated but fake emotion', severity: 'medium' },
    { id: 'background', label: 'Sterile background', description: 'Too clean, lacks ambient room noise', severity: 'medium' },
    { id: 'sibilants', label: 'S/F/TH sounds', description: 'Harsh or artificial fricative sounds', severity: 'medium' },
    { id: 'pitch', label: 'Pitch consistency', description: 'Unnaturally stable pitch throughout', severity: 'low' },
  ],
  uncommon: [
    { id: 'mouth', label: 'Mouth sounds', description: 'Missing lip smacks, tongue clicks, swallowing', severity: 'medium' },
    { id: 'words', label: 'Word boundaries', description: 'Unnatural transitions between words', severity: 'medium' },
    { id: 'emphasis', label: 'Strange emphasis', description: 'Wrong syllables emphasized', severity: 'low' },
    { id: 'numbers', label: 'Number pronunciation', description: 'AI often mispronounces sequences', severity: 'medium' },
    { id: 'names', label: 'Name pronunciation', description: 'Unusual names often mispronounced', severity: 'low' },
    { id: 'laughter', label: 'Artificial laughter', description: 'Robotic or uncanny valley laughs', severity: 'high' },
  ],
  advanced: [
    { id: 'spectral', label: 'Spectral analysis', description: 'Frequency patterns typical of synthesis', severity: 'high' },
    { id: 'glitches', label: 'Audio glitches', description: 'Clicks, pops, or digital artifacts', severity: 'high' },
    { id: 'cloning', label: 'Voice cloning markers', description: 'Signs of voice-to-voice conversion', severity: 'high' },
    { id: 'consistency', label: 'Voice consistency', description: 'Same voice sounds different across clips', severity: 'medium' },
    { id: 'reverb', label: 'Reverb mismatch', description: 'Room acoustics don\'t match claimed location', severity: 'medium' },
    { id: 'silence', label: 'Digital silence', description: 'Unnaturally perfect silence vs natural room tone', severity: 'medium' },
  ],
}

// Critical Thinking Questions
const CRITICAL_THINKING_QUESTIONS = [
  { id: 'source', question: 'Where did this media originate?', hint: 'Trace it to first appearance. Reverse search helps.', importance: 'Original source reveals intent.' },
  { id: 'motive', question: 'Who benefits if believed?', hint: 'Consider political, financial, social motivations.', importance: 'Understanding motive assesses likelihood.' },
  { id: 'timing', question: 'Why is it appearing now?', hint: 'Tied to election, controversy, trending topic?', importance: 'Fakes surface at strategic moments.' },
  { id: 'corroboration', question: 'Do other credible sources confirm?', hint: 'Real events have multiple witnesses.', importance: 'Lack of corroboration is a red flag.' },
  { id: 'plausibility', question: 'Is this physically/technically possible?', hint: 'Consider physics, timeline, known facts.', importance: 'Big picture often clearest tell.' },
]

export default function MediaCheckerView() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [mediaType, setMediaType] = useState(null) // 'image', 'video', 'audio'
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [expandedSection, setExpandedSection] = useState('common')
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showCriticalQuestions, setShowCriticalQuestions] = useState(false)
  const fileInputRef = useRef(null)

  const getMediaType = (file) => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|m4a|ogg|webm|flac|aac)$/i)) return 'audio'
    return null
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const type = getMediaType(selectedFile)
      if (!type) {
        alert('Unsupported file type. Please use images, videos, or audio files.')
        return
      }
      setFile(selectedFile)
      setMediaType(type)
      setResult(null)
      
      if (type === 'audio') {
        setPreview(URL.createObjectURL(selectedFile))
      } else {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target.result)
        reader.readAsDataURL(selectedFile)
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      const type = getMediaType(droppedFile)
      if (type) {
        setFile(droppedFile)
        setMediaType(type)
        setResult(null)
        if (type === 'audio') {
          setPreview(URL.createObjectURL(droppedFile))
        } else {
          const reader = new FileReader()
          reader.onload = (e) => setPreview(e.target.result)
          reader.readAsDataURL(droppedFile)
        }
      }
    }
  }

  const analyzeMedia = async () => {
    if (!file) return
    setIsAnalyzing(true)
    
    // Simulate analysis (in production: Gemini Vision API for images, audio analysis API for voice)
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const markers = mediaType === 'audio' ? AUDIO_DETECTION_MARKERS : IMAGE_DETECTION_MARKERS
    const mockChecks = {}
    
    Object.entries(markers).forEach(([category, markerList]) => {
      markerList.forEach(marker => {
        const rand = Math.random()
        mockChecks[marker.id] = {
          detected: rand < 0.2,
          confidence: rand < 0.2 ? 0.6 + Math.random() * 0.3 : 0,
          note: rand < 0.2 ? 'Potential issue detected' : null,
        }
      })
    })
    
    const detectedCount = Object.values(mockChecks).filter(c => c.detected).length
    const totalChecks = Object.keys(mockChecks).length
    const authenticityScore = Math.max(0, 100 - (detectedCount * 15))
    
    setResult({
      score: authenticityScore,
      verdict: authenticityScore > 80 ? 'likely_real' : authenticityScore > 50 ? 'uncertain' : 'likely_fake',
      checks: mockChecks,
      detectedIssues: detectedCount,
      totalChecks,
      mediaType,
      timestamp: new Date().toISOString(),
    })
    
    setIsAnalyzing(false)
    setShowCriticalQuestions(true)
  }

  const getVerdictDisplay = (verdict) => {
    switch (verdict) {
      case 'likely_real': return { icon: CheckCircle, color: 'text-forest', bg: 'bg-forest/10', label: 'Likely Authentic' }
      case 'uncertain': return { icon: HelpCircle, color: 'text-copper', bg: 'bg-copper/10', label: 'Uncertain' }
      case 'likely_fake': return { icon: XCircle, color: 'text-burgundy', bg: 'bg-burgundy/10', label: 'Likely AI-Generated' }
      default: return { icon: HelpCircle, color: 'text-steel', bg: 'bg-steel/10', label: 'Unknown' }
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-burgundy'
      case 'medium': return 'text-copper'
      case 'low': return 'text-steel'
      default: return 'text-ink/50 dark:text-paper/50'
    }
  }

  const currentMarkers = mediaType === 'audio' ? AUDIO_DETECTION_MARKERS : IMAGE_DETECTION_MARKERS

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-copper/10">
            <Camera size={24} className="text-copper" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-semibold text-ink dark:text-paper">Media Authenticity Checker</h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Analyze images, videos, and <strong>audio/voice</strong> for AI generation markers
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
            <p className="mb-2"><strong className="text-ink dark:text-paper">Image/Video Detection (18 markers):</strong></p>
            <ul className="space-y-1 mb-3">
              <li>• <strong>Common:</strong> Fingers, text, facial symmetry, lighting</li>
              <li>• <strong>Uncommon:</strong> Jewelry, teeth, hair, reflections</li>
              <li>• <strong>Advanced:</strong> Metadata, compression, noise patterns</li>
            </ul>
            <p className="mb-2"><strong className="text-ink dark:text-paper">Audio/Voice Detection (18 markers):</strong></p>
            <ul className="space-y-1">
              <li>• <strong>Common:</strong> Breathing, pacing, emotion, background noise</li>
              <li>• <strong>Uncommon:</strong> Mouth sounds, word boundaries, laughter</li>
              <li>• <strong>Advanced:</strong> Spectral analysis, glitches, voice cloning</li>
            </ul>
            <p className="mt-2 text-[10px] text-ink/40 dark:text-paper/40">
              Note: Detection is probabilistic. AI technology evolves rapidly.
            </p>
          </div>
        )}
      </div>

      {/* Supported Formats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
          <Image size={20} className="mx-auto mb-1 text-copper" />
          <p className="text-xs text-ink/60 dark:text-paper/60">Images</p>
          <p className="text-[10px] text-ink/40 dark:text-paper/40">JPG, PNG, GIF, WebP</p>
        </div>
        <div className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 text-center">
          <Film size={20} className="mx-auto mb-1 text-copper" />
          <p className="text-xs text-ink/60 dark:text-paper/60">Videos</p>
          <p className="text-[10px] text-ink/40 dark:text-paper/40">MP4, WebM</p>
        </div>
        <div className="p-3 rounded-lg bg-forest/10 border border-forest/20 text-center">
          <Mic size={20} className="mx-auto mb-1 text-forest" />
          <p className="text-xs text-forest font-medium">Audio/Voice</p>
          <p className="text-[10px] text-forest/70">MP3, WAV, M4A, OGG</p>
        </div>
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
          accept="image/*,video/*,audio/*,.mp3,.wav,.m4a,.ogg,.webm,.flac"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!preview ? (
          <div className="py-12 text-center">
            <Upload size={40} className="mx-auto mb-4 text-ink/30 dark:text-paper/30" />
            <p className="font-medium mb-1 text-ink dark:text-paper">Drop media here or click to upload</p>
            <p className="text-sm text-ink/50 dark:text-paper/50">
              Images, videos, or audio/voice files
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-ink/30 dark:text-paper/30">
              <Image size={24} />
              <Film size={24} />
              <Volume2 size={24} />
            </div>
          </div>
        ) : (
          <div className="relative">
            {mediaType === 'video' && (
              <video src={preview} controls className="max-h-64 mx-auto rounded-lg" />
            )}
            {mediaType === 'image' && (
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            )}
            {mediaType === 'audio' && (
              <div className="p-6 rounded-lg bg-ink/10 dark:bg-paper/10 text-center">
                <Mic size={48} className="mx-auto mb-4 text-forest" />
                <p className="font-medium text-ink dark:text-paper mb-2">{file?.name}</p>
                <audio src={preview} controls className="w-full max-w-md mx-auto" />
                <p className="text-xs text-ink/50 dark:text-paper/50 mt-2">
                  {(file?.size / 1024 / 1024).toFixed(2)} MB • {file?.type || 'audio'}
                </p>
              </div>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); setMediaType(null); setShowCriticalQuestions(false) }}
              className="absolute top-2 right-2 p-2 rounded-full bg-ink/80 text-white hover:bg-burgundy transition-colors"
            >
              <XCircle size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      {preview && !result && (
        <button onClick={analyzeMedia} disabled={isAnalyzing} className="btn-primary w-full">
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing {mediaType}...
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
          {/* Media Type Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            result.mediaType === 'audio' ? 'bg-forest/20 text-forest' : 'bg-copper/20 text-copper'
          }`}>
            {result.mediaType === 'audio' ? <Mic size={14} /> : <Image size={14} />}
            {result.mediaType === 'audio' ? 'Voice/Audio Analysis' : 'Image/Video Analysis'}
          </div>

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
                    <h3 className={`font-headline text-xl font-bold ${v.color}`}>{v.label}</h3>
                    <p className="text-sm text-ink/60 dark:text-paper/60">
                      {result.detectedIssues} potential issues of {result.totalChecks} checks
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      result.score > 80 ? 'text-forest' : result.score > 50 ? 'text-copper' : 'text-burgundy'
                    }`}>
                      {result.score}%
                    </div>
                    <div className="text-xs text-ink/40 dark:text-paper/40">Authenticity</div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Spectrum */}
          <div className="card">
            <h3 className="card-headline mb-3 text-ink dark:text-paper">Authenticity Spectrum</h3>
            <div className="relative h-6 rounded-full bg-gradient-to-r from-burgundy via-copper to-forest overflow-hidden">
              <div className="absolute top-0 h-full w-1 bg-white shadow-lg" style={{ left: `${result.score}%` }} />
            </div>
            <div className="flex justify-between text-xs text-ink/50 dark:text-paper/50 mt-2">
              <span>Likely Fake</span>
              <span>Uncertain</span>
              <span>Likely Real</span>
            </div>
          </div>

          {/* Critical Thinking */}
          {showCriticalQuestions && (
            <div className="card border-copper/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="card-headline flex items-center gap-2 text-ink dark:text-paper">
                  <Brain size={18} className="text-copper" />
                  Critical Thinking Questions
                </h3>
                <button onClick={() => setShowCriticalQuestions(false)} className="text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper">
                  <ChevronUp size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {CRITICAL_THINKING_QUESTIONS.map((q, i) => (
                  <div key={q.id} className="p-3 rounded-lg bg-ink/5 dark:bg-paper/5 border-l-4 border-copper">
                    <p className="font-medium text-sm text-ink dark:text-paper mb-1">{i + 1}. {q.question}</p>
                    <p className="text-xs text-ink/50 dark:text-paper/50 mb-1">💡 {q.hint}</p>
                    <p className="text-[10px] text-copper">Why: {q.importance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detection Checklist */}
          <div className="card">
            <h3 className="card-headline mb-4 flex items-center gap-2 text-ink dark:text-paper">
              <Zap size={18} className="text-copper" />
              {result.mediaType === 'audio' ? 'Voice' : 'Visual'} Detection Checklist
            </h3>

            {Object.entries(currentMarkers).map(([category, markers]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === category ? null : category)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-ink/5 dark:bg-paper/5 hover:bg-ink/10 dark:hover:bg-paper/10"
                >
                  <span className="font-medium text-sm capitalize text-ink dark:text-paper">{category} Signs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink/50 dark:text-paper/50">{markers.length} checks</span>
                    {expandedSection === category ? <ChevronUp size={16} className="text-ink/50 dark:text-paper/50" /> : <ChevronDown size={16} className="text-ink/50 dark:text-paper/50" />}
                  </div>
                </button>

                {expandedSection === category && (
                  <div className="mt-2 space-y-2">
                    {markers.map((marker) => {
                      const check = result.checks[marker.id]
                      return (
                        <div key={marker.id} className={`p-3 rounded-lg border ${
                          check?.detected ? 'bg-burgundy/10 border-burgundy/30' : 'bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              {check?.detected ? (
                                <AlertTriangle size={16} className="text-burgundy mt-0.5 flex-shrink-0" />
                              ) : (
                                <CheckCircle size={16} className="text-forest mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className="font-medium text-sm text-ink dark:text-paper">{marker.label}</p>
                                <p className="text-xs text-ink/50 dark:text-paper/50">{marker.description}</p>
                              </div>
                            </div>
                            <span className={`text-xs ${getSeverityColor(marker.severity)}`}>{marker.severity}</span>
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
                <p><strong className="text-ink dark:text-paper">Important:</strong> This is probabilistic analysis, not proof.</p>
                <p>AI detection evolves rapidly. High-quality fakes may evade detection. Use multiple verification methods.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => { setFile(null); setPreview(null); setResult(null); setMediaType(null); setShowCriticalQuestions(false) }}
              className="flex-1 px-4 py-2 text-sm text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper border border-ink/20 dark:border-paper/20 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Check Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
