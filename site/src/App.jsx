import { useState, useEffect, useRef } from 'react'
import homeContent from './data/homeContent'
import heroImg from './assets/hero.png'

function App() {
  const [locale, setLocale] = useState('zh')
  const [editMode, setEditMode] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [content, setContent] = useState(homeContent)
  const active = content[locale]
  const resumeRef = useRef(null)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [flippedId, setFlippedId] = useState(null)

  const toggleFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id))
  }

  const handleTiltMove = (e) => {
    const card = e.currentTarget
    const inner = card.querySelector('.postcard-inner')
    if (!inner) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const tiltX = ((y - cy) / cy) * -7
    const tiltY = ((x - cx) / cx) * 7
    inner.style.setProperty('--tilt-x', `${tiltX}deg`)
    inner.style.setProperty('--tilt-y', `${tiltY}deg`)
  }

  const handleTiltLeave = (e) => {
    const inner = e.currentTarget.querySelector('.postcard-inner')
    if (!inner) return
    inner.style.setProperty('--tilt-x', '0deg')
    inner.style.setProperty('--tilt-y', '0deg')
  }

  const [postcards, setPostcards] = useState(() => {
    try {
      const saved = localStorage.getItem('postcards_v2')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return [
      { id: 'about', pos: 'top-l', front: 'About', back: 'Intro', zhFront: '关于我', zhBack: '简介', top: '10%', left: '5%', duration: '18s', delay: '0s', alt: false, image: null, frontLabel: '', frontTitle: '', backTitle: '', backDate: '', backNote: '' },
      { id: 'projects', pos: 'top-r', front: 'Projects', back: 'Work', zhFront: '项目作品', zhBack: '作品', top: '8%', left: '66%', duration: '22s', delay: '1.8s', alt: true, image: null, frontLabel: '', frontTitle: '', backTitle: '', backDate: '', backNote: '' },
      { id: 'education', pos: 'bottom-l', front: 'Education', back: 'Story', zhFront: '教育背景', zhBack: '故事', top: '56%', left: '6%', duration: '20s', delay: '0.9s', alt: true, image: null, frontLabel: '', frontTitle: '', backTitle: '', backDate: '', backNote: '' },
      { id: 'experience', pos: 'bottom-r', front: 'Experience', back: 'Journey', zhFront: '经历故事', zhBack: '旅程', top: '54%', left: '70%', duration: '24s', delay: '2.4s', alt: false, image: null, frontLabel: '', frontTitle: '', backTitle: '', backDate: '', backNote: '' },
    ]
  })

  const updatePostcard = (id, patch) => {
    setPostcards((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
      try { localStorage.setItem('postcards_v2', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  const handlePostcardImage = (id) => (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => updatePostcard(id, { image: e.target.result })
    reader.readAsDataURL(file)
  }

  const handlePostcardField = (id, field) => (event) => {
    updatePostcard(id, { [field]: event.target.value })
  }

  const updateContent = (path, value) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const target = next[locale]
      const keys = path.split('.')
      let current = target
      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = Number.isNaN(Number(keys[i])) ? keys[i] : Number(keys[i])
        current = current[key]
      }
      const lastKey = Number.isNaN(Number(keys[keys.length - 1]))
        ? keys[keys.length - 1]
        : Number(keys[keys.length - 1])
      current[lastKey] = value
      try { localStorage.setItem('site_content_v1', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  const handleUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target.result
        setProfileImage(dataUrl)
        setContent((prev) => {
          const next = JSON.parse(JSON.stringify(prev))
          next[locale].photo = dataUrl
          try { localStorage.setItem('site_content_v1', JSON.stringify(next)) } catch (err) {}
          return next
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFieldChange = (field) => (event) => {
    updateContent(field, event.target.value)
  }

  useEffect(() => {
    // Load persisted content
    try {
      const saved = localStorage.getItem('site_content_v1')
      if (saved) {
        setContent(JSON.parse(saved))
      }
    } catch (e) {}

    // ── Cinematic reveal: observe all reveal variants ──
    const revealNodes = document.querySelectorAll('.reveal,.reveal-up,.reveal-right,.reveal-left,.reveal-scale')
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            revealObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    revealNodes.forEach((n) => revealObs.observe(n))

    // ── Parallax: tiered depth speeds ──
    const parallaxEls = Array.from(document.querySelectorAll('.parallax-deep,.parallax-mid,.parallax-surface,.parallax-fast,[data-parallax-speed]'))
    const getParallaxSpeed = (el) => {
      const styleVal = getComputedStyle(el).getPropertyValue('--parallax-speed').trim()
      if (styleVal) return parseFloat(styleVal)
      if (el.hasAttribute('data-parallax-speed')) return parseFloat(el.getAttribute('data-parallax-speed'))
      return 0
    }
    let parallaxTick = 0
    const onScroll = () => {
      parallaxTick = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset
        for (let i = 0; i < parallaxEls.length; i += 1) {
          const el = parallaxEls[i]
          const speed = getParallaxSpeed(el)
          el.style.transform = `translateY(${y * speed}px)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      revealObs.disconnect()
      cancelAnimationFrame(parallaxTick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleCollapse = (cardEl) => {
    if (!cardEl) return
    cardEl.classList.toggle('collapsed')
  }

  const copyResumeAsMarkdown = async () => {
    const md = []
    md.push(`# ${active.name}`)
    md.push(`**${active.education}**`)
    md.push('')
    md.push(`- 邮箱: ${active.contact.email}`)
    md.push(`- 电话: ${active.contact.phone}`)
    md.push(`- 地点: ${active.contact.location}`)
    md.push('\n## 主要经历')
    active.experience.forEach((e) => {
      md.push(`### ${e.role} — ${e.company}`)
      md.push(`${e.period} · ${e.location}`)
      md.push(e.description)
      md.push('')
    })
    try {
      await navigator.clipboard.writeText(md.join('\n'))
      // minimal feedback: browser toast missing; leave as is
    } catch (e) {}
  }

  const downloadResumePDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).jsPDF
      const el = resumeRef.current || document.body
      const canvas = await html2canvas(el, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgProps = pdf.getImageProperties(imgData)
      const imgWidth = pageWidth - 40
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width
      pdf.addImage(imgData, 'JPEG', 20, 20, imgWidth, imgHeight)
      pdf.save(`${active.name.replace(/\s+/g, '_')}_resume.pdf`)
    } catch (e) {
      console.error('PDF export failed', e)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="glass-panel sticky top-4 z-30 mb-12 px-6 py-4 transition duration-500 sm:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-indigo-300/70">Editorial Portfolio</p>
              <p className="mt-1 text-2xl font-display font-semibold text-white/95">Chenxi Lu / 路晨曦</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setLocale('zh')}
                className={`rounded-full border px-4 py-2 transition ${locale === 'zh' ? 'border-indigo-300/80 bg-indigo-400/12 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-full border px-4 py-2 transition ${locale === 'en' ? 'border-indigo-300/80 bg-indigo-400/12 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setEditMode((prev) => !prev)}
                className="edit-control"
              >
                {editMode ? active.controls.editing : active.controls.edit}
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-14">
          <section id="landing" className="ocean-section relative overflow-hidden p-8 h-screen min-h-screen rounded-[32px] border border-white/10 shadow-glow">
            {/* SVG filters for crumpled paper texture */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
              <filter id="crumple" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="6" result="noise" />
                <feDiffuseLighting in="noise" surfaceScale="3.5" diffuseConstant="0.92" lighting-color="#fff8ee" result="light">
                  <feDistantLight azimuth="130" elevation="32" />
                </feDiffuseLighting>
                <feBlend in="SourceGraphic" in2="light" mode="multiply" result="blended" />
                <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" result="edgeRough" />
                <feDisplacementMap in="blended" in2="edgeRough" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feComposite in="displaced" in2="SourceGraphic" operator="in" />
              </filter>
            </svg>
            {/* Postcards drifting on water */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {postcards.map((card) => (
                <div
                  key={card.id}
                  className={`postcard-group postcard-pos-${card.pos} pointer-events-auto absolute${card.alt ? ' alt' : ''}${flippedId === card.id ? ' flipped' : ''}`}
                  style={{ top: card.top, left: card.left, animationDuration: card.duration, animationDelay: card.delay }}
                  onClick={() => toggleFlip(card.id)}
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                >
                  <div className="postcard-inner">
                    <div className={`postcard-face postcard-front${card.image ? ' has-image' : ''}`}>
                      {card.image && <img src={card.image} alt="" className="postcard-image" />}
                      <input
                        className="postcard-field postcard-front-label"
                        placeholder={locale === 'zh' ? card.zhFront : card.front}
                        value={card.frontLabel}
                        onChange={handlePostcardField(card.id, 'frontLabel')}
                        onClick={(e) => e.stopPropagation()}
                        style={{ position: 'relative', zIndex: 2 }}
                      />
                      <input
                        className="postcard-field postcard-front-title mt-2"
                        placeholder={locale === 'zh' ? card.zhBack : card.back}
                        value={card.frontTitle}
                        onChange={handlePostcardField(card.id, 'frontTitle')}
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontFamily: 'KaiTi, serif', position: 'relative', zIndex: 2 }}
                      />
                      <div className="mt-3 h-[1px] w-8 bg-amber-700/20" style={{ position: 'relative', zIndex: 2 }} />
                      {/* Upload button */}
                      <button
                        className="postcard-upload"
                        title={locale === 'zh' ? '上传照片' : 'Upload photo'}
                        onClick={(e) => { e.stopPropagation(); document.getElementById(`upload-${card.id}`).click() }}
                      >+</button>
                      <input id={`upload-${card.id}`} type="file" accept="image/*" className="hidden" onChange={handlePostcardImage(card.id)} />
                    </div>
                    <div className="postcard-face postcard-back">
                      <div className="postcard-label text-[10px] uppercase tracking-[0.4em] font-medium">{locale === 'zh' ? card.zhFront : card.front}</div>
                      <div className="h-[1px] w-6 bg-amber-700/15 mt-1 mb-2" />
                      <input
                        className="postcard-field"
                        placeholder={locale === 'zh' ? '标题...' : 'Title...'}
                        value={card.backTitle}
                        onChange={handlePostcardField(card.id, 'backTitle')}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        className="postcard-field mt-2"
                        placeholder={locale === 'zh' ? '日期...' : 'Date...'}
                        value={card.backDate}
                        onChange={handlePostcardField(card.id, 'backDate')}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <textarea
                        className="postcard-field mt-2 flex-1"
                        placeholder={locale === 'zh' ? '写点心得...' : 'Write a note...'}
                        value={card.backNote}
                        onChange={handlePostcardField(card.id, 'backNote')}
                        onClick={(e) => e.stopPropagation()}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="home-content" className="grid gap-12 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-10">
              <div className="glass-card relative overflow-hidden p-8 sm:p-10 shadow-glow reveal-up">
                <p className="text-xs uppercase tracking-[0.38em] text-indigo-300/70">{locale === 'zh' ? '欢迎来到主页' : 'Welcome to the homepage'}</p>
                <h2 className="mt-6 text-4xl font-display font-semibold leading-tight text-white/95 sm:text-5xl">{locale === 'zh' ? '探索我的个人简介与作品经历' : 'Explore my profile and portfolio'}</h2>
                <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">{locale === 'zh' ? '明信片是入口，下面是完整的简历、项目和联系方式。' : 'The postcards are the entry point; scroll down for the full profile, work, and contact info.'}</p>
              </div>
              <div className="glass-card relative overflow-hidden p-8 sm:p-10 shadow-glow reveal-up">
                <div className="parallax-mid parallax absolute -right-20 top-4 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
                <div className="parallax-deep parallax absolute left-0 top-24 h-48 w-48 rounded-full bg-fuchsia-500/12 blur-3xl" />
                {editMode ? (
                  <input
                    value={active.heroBadge}
                    onChange={handleFieldChange('heroBadge')}
                    className="mt-2 w-full max-w-xs rounded-full border border-indigo-300/20 bg-indigo-950/30 px-4 py-2 text-xs uppercase tracking-[0.38em] text-indigo-200"
                  />
                ) : (
                  <span className="reveal-scale inline-flex rounded-full border border-indigo-300/20 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.38em] text-indigo-200/90" style={{ '--reveal-delay': '100ms' }}>
                    {active.heroBadge}
                  </span>
                )}
                <div className="mt-8 max-w-3xl">
                  {editMode ? (
                    <textarea
                      rows={2}
                      value={active.heroHeadline}
                      onChange={handleFieldChange('heroHeadline')}
                      className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-4xl font-display font-semibold leading-tight text-white sm:text-5xl"
                    />
                  ) : (
                    <h1 className="text-6xl font-display font-semibold leading-[1.08] tracking-[-0.04em] text-white/95 sm:text-7xl">
                      {active.heroHeadline}
                    </h1>
                  )}
                </div>
                {editMode ? (
                  <textarea
                    rows={3}
                    value={active.heroDescription}
                    onChange={handleFieldChange('heroDescription')}
                    className="mt-8 w-full max-w-3xl resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-base leading-8 text-slate-100"
                  />
                ) : (
                  <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                    {active.heroDescription}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#resume" className="inline-flex rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5">
                    {editMode ? (
                      <input value={active.ctaPrimary} onChange={handleFieldChange('ctaPrimary')} className="w-full bg-transparent text-left text-sm font-semibold text-white outline-none" />
                    ) : (
                      active.ctaPrimary
                    )}
                  </a>
                  <a href="#contact" className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/40">
                    {editMode ? (
                      <input value={active.ctaSecondary} onChange={handleFieldChange('ctaSecondary')} className="w-full bg-transparent text-left text-sm font-semibold text-slate-100 outline-none" />
                    ) : (
                      active.ctaSecondary
                    )}
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {active.stats.map((item, index) => (
                    <div key={index} className="reveal-scale rounded-3xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl transition hover:border-indigo-300/30 hover:bg-slate-900/70" style={{ '--reveal-delay': `${index * 120}ms` }}>
                      {editMode ? (
                        <input
                          value={item.label}
                          onChange={(e) => updateContent(`stats.${index}.label`, e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-2 py-1 text-xs uppercase tracking-[0.3em] text-slate-200"
                        />
                      ) : (
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                      )}
                      {editMode ? (
                        <input
                          value={item.value}
                          onChange={(e) => updateContent(`stats.${index}.value`, e.target.value)}
                          className="mt-3 w-full rounded-lg border border-white/10 bg-slate-950/80 px-2 py-2 text-xl font-semibold text-white"
                        />
                      ) : (
                        <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div id="resume" className="glass-card p-8 reveal-up">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-indigo-300/70">{active.sections.resume.label}</p>
                    <h2 className="mt-3 text-3xl font-display font-semibold text-white">{active.sections.resume.title}</h2>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowResumeModal(true)} className="inline-flex rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5">
                      {locale === 'zh' ? '查看精选简历' : 'View Featured'}
                    </button>
                    <a href={`mailto:${active.contact.email}`} className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/40">
                      {active.sections.resume.cta}
                    </a>
                  </div>
                </div>
                <div className="mt-8 space-y-6">
                  {active.experience.map((item, index) => (
                    <div key={index} role="button" tabIndex={0} onClick={() => setActiveCard({ title: `${item.role} — ${item.company}`, detail: item.detail || item.description })} className="reveal-right rounded-3xl border border-white/10 bg-slate-950/40 p-6 transition hover:border-indigo-300/30 hover:bg-slate-900/60 cursor-pointer" style={{ '--reveal-delay': `${index * 150}ms` }}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm text-slate-400">{item.period}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">{item.role}</h3>
                        </div>
                        <div className="text-sm text-slate-300 sm:text-right">
                          <p>{item.company}</p>
                          <p>{item.location}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-slate-300 leading-7">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-4">
            <div className="glass-card yuque-card compact-resume reveal-left" style={{ '--reveal-delay': '80ms' }}>
              <div className="resume-header" ref={resumeRef}>
                <div className="resume-meta">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/8">
                    <img src={profileImage || active.photo || heroImg} alt={active.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    {editMode ? (
                      <input
                        value={active.profileLabel}
                        onChange={handleFieldChange('profileLabel')}
                        className="mb-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                      />
                    ) : (
                      <div className="text-sm text-slate-400">{active.profileLabel}</div>
                    )}
                    {editMode ? (
                      <input
                        value={active.name}
                        onChange={handleFieldChange('name')}
                        className="mb-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-lg font-semibold text-white"
                      />
                    ) : (
                      <div className="text-lg font-semibold text-white">{active.name}</div>
                    )}
                    {editMode ? (
                      <textarea
                        rows={2}
                        value={active.profileTagline}
                        onChange={handleFieldChange('profileTagline')}
                        className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-2 py-2 text-sm text-slate-100"
                      />
                    ) : (
                      <div className="small-note">{active.profileTagline}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button title={locale === 'zh' ? '复制为 Markdown' : 'Copy as Markdown'} className="icon-button" onClick={copyResumeAsMarkdown}>
                    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6M9 16h6M7 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {locale === 'zh' ? '复制' : 'Copy'}
                  </button>
                  <button title={locale === 'zh' ? '下载 JSON' : 'Download JSON'} className="icon-button" onClick={() => {
                    const blob = new Blob([JSON.stringify(active, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `${active.name.replace(/\s+/g, '_')}_resume.json`;
                    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                  }}>{locale === 'zh' ? 'JSON' : 'JSON'}</button>
                  <button title={locale === 'zh' ? '下载 PDF' : 'Download PDF'} className="icon-button" onClick={downloadResumePDF}>
                    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    PDF
                  </button>
                </div>
              </div>

              <div className="resume-row">
                <div className="text-sm text-slate-300">
                  {editMode ? (
                    <input
                      value={active.labels.email}
                      onChange={handleFieldChange('labels.email')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-200"
                    />
                  ) : (
                    active.labels.email
                  )}
                </div>
                <div className="text-sm text-slate-200">
                  {editMode ? (
                    <input
                      value={active.contact.email}
                      onChange={handleFieldChange('contact.email')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    active.contact.email
                  )}
                </div>
              </div>
              <div className="resume-row">
                <div className="text-sm text-slate-300">
                  {editMode ? (
                    <input
                      value={active.labels.phone}
                      onChange={handleFieldChange('labels.phone')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-200"
                    />
                  ) : (
                    active.labels.phone
                  )}
                </div>
                <div className="text-sm text-slate-200">
                  {editMode ? (
                    <input
                      value={active.contact.phone}
                      onChange={handleFieldChange('contact.phone')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    active.contact.phone
                  )}
                </div>
              </div>
              <div className="resume-row">
                <div className="text-sm text-slate-300">
                  {editMode ? (
                    <input
                      value={active.labels.location}
                      onChange={handleFieldChange('labels.location')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-200"
                    />
                  ) : (
                    active.labels.location
                  )}
                </div>
                <div className="text-sm text-slate-200">
                  {editMode ? (
                    <input
                      value={active.contact.location}
                      onChange={handleFieldChange('contact.location')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    active.contact.location
                  )}
                </div>
              </div>
              <div className="resume-row">
                <div className="text-sm text-slate-300">
                  {editMode ? (
                    <input
                      value={active.labels.school}
                      onChange={handleFieldChange('labels.school')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-200"
                    />
                  ) : (
                    active.labels.school
                  )}
                </div>
                <div className="text-sm text-slate-200">
                  {editMode ? (
                    <input
                      value={active.education}
                      onChange={handleFieldChange('education')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                    />
                  ) : (
                    active.education
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card yuque-card reveal-left" style={{ '--reveal-delay': '200ms' }}>
              <div className="resume-row">
                <div>
                  {editMode ? (
                    <input
                      value={active.sections.summary.label}
                      onChange={handleFieldChange('sections.summary.label')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-xs uppercase tracking-[0.28em] text-slate-200"
                    />
                  ) : (
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{active.sections.summary.label}</div>
                  )}
                  {editMode ? (
                    <input
                      value={active.sections.summary.title}
                      onChange={handleFieldChange('sections.summary.title')}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-lg font-semibold text-white"
                    />
                  ) : (
                    <div className="mt-1 font-semibold text-white">{active.sections.summary.title}</div>
                  )}
                </div>
                <div>
                  <button className="resume-toggle" onClick={(e) => toggleCollapse(e.currentTarget.closest('.yuque-card'))}>{locale === 'zh' ? '折叠' : 'Toggle'}</button>
                </div>
              </div>
              <div className="summary-body" style={{ padding: '0 1rem 1rem 1rem' }}>
                {editMode ? (
                  <textarea
                    rows={6}
                    value={active.sections.summary.text}
                    onChange={handleFieldChange('sections.summary.text')}
                    className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-slate-100"
                  />
                ) : (
                  active.sections.summary.text
                )}
              </div>
            </div>

            <div className="glass-card yuque-card reveal-left" style={{ '--reveal-delay': '300ms' }}>
              <div className="resume-row">
                <div>
                  {editMode ? (
                    <input
                      value={active.sections.tools.label}
                      onChange={handleFieldChange('sections.tools.label')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-xs uppercase tracking-[0.28em] text-slate-200"
                    />
                  ) : (
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{active.sections.tools.label}</div>
                  )}
                  {editMode ? (
                    <input
                      value={active.sections.tools.title}
                      onChange={handleFieldChange('sections.tools.title')}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-lg font-semibold text-white"
                    />
                  ) : (
                    <div className="mt-1 font-semibold text-white">{active.sections.tools.title}</div>
                  )}
                </div>
                <div>
                  <button className="resume-toggle" onClick={(e) => toggleCollapse(e.currentTarget.closest('.yuque-card'))}>{locale === 'zh' ? '折叠' : 'Toggle'}</button>
                </div>
              </div>
              <div className="tools-body" style={{ padding: '0 1rem 1rem 1rem' }}>
                <ul className="grid gap-2">
                  {active.sections.tools.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-200">
                      {editMode ? (
                        <input
                          value={item}
                          onChange={(e) => updateContent(`sections.tools.items.${idx}`, e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-sm text-slate-100"
                        />
                      ) : (
                        `• ${item}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass-card yuque-card reveal-left" style={{ '--reveal-delay': '400ms' }}>
              <div className="resume-row">
                <div>
                  {editMode ? (
                    <input
                      value={active.sections.resume.label}
                      onChange={handleFieldChange('sections.resume.label')}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-xs uppercase tracking-[0.28em] text-slate-200"
                    />
                  ) : (
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{active.sections.resume.label}</div>
                  )}
                  {editMode ? (
                    <input
                      value={active.sections.resume.title}
                      onChange={handleFieldChange('sections.resume.title')}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-2 py-1 text-lg font-semibold text-white"
                    />
                  ) : (
                    <div className="mt-1 font-semibold text-white">{active.sections.resume.title}</div>
                  )}
                </div>
                <div>
                  <button className="resume-toggle" onClick={(e) => toggleCollapse(e.currentTarget.closest('.yuque-card'))}>{locale === 'zh' ? '折叠' : 'Toggle'}</button>
                </div>
              </div>
              <div className="resume-body" style={{ padding: '0 1rem 1rem 1rem' }}>
                {active.experience.map((item, i) => (
                  <div key={i} className="py-3 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-300">{item.period}</div>
                      <div className="text-sm text-slate-400">{item.location}</div>
                    </div>
                    <div className="mt-1 text-white font-medium">{item.role}</div>
                    <div className="mt-1 text-slate-300 text-sm">{item.company}</div>
                  </div>
                ))}
                <div className="mt-3 text-center">
                  <button onClick={() => setShowResumeModal(true)} className="inline-flex rounded-full bg-indigo-500/80 px-3 py-2 text-sm text-white">{locale === 'zh' ? '查看完整简历' : 'Open Full'}</button>
                </div>
              </div>
            </div>

            {editMode && (
              <div className="glass-card p-4">
                <div className="text-sm text-slate-300">{active.controls.editPanelTitle}</div>
                <div className="mt-3 space-y-2">
                  <input type="text" value={active.heroHeadline} onChange={handleFieldChange('heroHeadline')} className="w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
            )}
          </aside>
          </section>
        </main>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowResumeModal(false)} />
            <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-white">{active.name} — {locale === 'zh' ? '精选简历' : 'Featured Resume'}</h3>
                <button onClick={() => setShowResumeModal(false)} className="text-slate-300 hover:text-white">关闭</button>
              </div>
              <div className="mt-4 space-y-4 text-slate-300">
                <p className="font-medium">{active.education}</p>
                <p>{active.contact.email} · {active.contact.phone} · {active.contact.location}</p>
                <div className="mt-4 space-y-4">
                  {active.experience.map((item, i) => (
                    <div key={i} className="rounded-lg border border-white/5 p-4">
                      <p className="text-sm text-slate-400">{item.period}</p>
                      <h4 className="mt-1 text-lg font-semibold text-white">{item.role} — {item.company}</h4>
                      <p className="mt-2 text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setActiveCard(null)} />
            <div className="relative z-10 max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-white">{activeCard.title}</h3>
                <button onClick={() => setActiveCard(null)} className="text-slate-300 hover:text-white">关闭</button>
              </div>
              <div className="mt-4 text-slate-300 leading-7">
                <div style={{ whiteSpace: 'pre-wrap' }}>{activeCard.detail || activeCard.text}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
