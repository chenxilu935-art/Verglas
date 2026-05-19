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

  const postcards = [
    { label: 'Volunteering', top: '8%', left: '6%', duration: '18s', delay: '0s' },
    { label: "St. Patrick's Day", top: '16%', left: '72%', duration: '22s', delay: '1.8s' },
    { label: 'Alumni Badge', top: '56%', left: '14%', duration: '20s', delay: '0.9s' },
    { label: 'Ming Postcard', top: '40%', left: '80%', duration: '24s', delay: '2.4s' },
  ]

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

    // Reveal on scroll
    const nodes = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.12 }
    )
    nodes.forEach((n) => obs.observe(n))

    // Parallax
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax-speed]'))
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0')
        const t = y * speed
        el.style.transform = `translateY(${t}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      obs.disconnect()
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <header className="glass-panel sticky top-4 z-30 mb-10 border-white/10 bg-slate-950/60 backdrop-blur-xl px-5 py-4 transition duration-500 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Editorial Portfolio</p>
              <p className="mt-1 text-2xl font-display font-semibold text-white">Chenxi Lu / 路晨曦</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setLocale('zh')}
                className={`rounded-full border px-4 py-2 transition ${locale === 'zh' ? 'border-sky-300/80 bg-sky-300/15 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-full border px-4 py-2 transition ${locale === 'en' ? 'border-sky-300/80 bg-sky-300/15 text-white' : 'border-white/10 text-slate-300 hover:border-white/20'}`}
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

        <main className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <section className="space-y-8">
            <div className="glass-card relative overflow-hidden p-8 shadow-glow">
              <div data-parallax-speed="0.22" className="parallax absolute -right-20 top-4 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
              <div data-parallax-speed="0.12" className="parallax absolute left-0 top-24 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />
              {editMode ? (
                <input
                  value={active.heroBadge}
                  onChange={handleFieldChange('heroBadge')}
                  className="mt-2 w-full max-w-xs rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-100"
                />
              ) : (
                <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-200">
                  {active.heroBadge}
                </span>
              )}
              <div className="mt-6 max-w-3xl">
                {editMode ? (
                  <textarea
                    rows={2}
                    value={active.heroHeadline}
                    onChange={handleFieldChange('heroHeadline')}
                    className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-4xl font-display font-semibold leading-tight text-white sm:text-5xl"
                  />
                ) : (
                  <h1 className="text-5xl font-display font-semibold leading-tight tracking-[-0.05em] text-white sm:text-6xl">
                    {active.heroHeadline}
                  </h1>
                )}
              </div>
              {editMode ? (
                <textarea
                  rows={3}
                  value={active.heroDescription}
                  onChange={handleFieldChange('heroDescription')}
                  className="mt-6 w-full max-w-3xl resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-base leading-8 text-slate-100"
                />
              ) : (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
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
                <a href="#contact" className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/40">
                  {editMode ? (
                    <input value={active.ctaSecondary} onChange={handleFieldChange('ctaSecondary')} className="w-full bg-transparent text-left text-sm font-semibold text-slate-100 outline-none" />
                  ) : (
                    active.ctaSecondary
                  )}
                </a>
              </div>

              <div className="pointer-events-none absolute inset-0">
                {postcards.map((card) => (
                  <div
                    key={card.label}
                    className="postcard-group pointer-events-auto absolute"
                    style={{ top: card.top, left: card.left, animationDuration: card.duration, animationDelay: card.delay }}
                  >
                    <div className="postcard-inner">
                      <div className="postcard-face postcard-front">
                        <div className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Project</div>
                        <p className="mt-4 text-lg font-semibold text-white leading-tight">{card.label}</p>
                      </div>
                      <div className="postcard-face postcard-back">
                        <div className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Story</div>
                        <p className="mt-4 text-lg font-semibold text-white leading-tight">{card.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {active.stats.map((item, index) => (
                  <div key={index} className="reveal rounded-3xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl transition hover:border-sky-300/30 hover:bg-slate-900/70">
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

            <div id="resume" className="glass-card p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-300/70">{active.sections.resume.label}</p>
                  <h2 className="mt-3 text-3xl font-display font-semibold text-white">{active.sections.resume.title}</h2>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowResumeModal(true)} className="inline-flex rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5">
                    {locale === 'zh' ? '查看精选简历' : 'View Featured'}
                  </button>
                  <a href={`mailto:${active.contact.email}`} className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-300/40">
                    {active.sections.resume.cta}
                  </a>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                {active.experience.map((item, index) => (
                  <div key={index} role="button" tabIndex={0} onClick={() => setActiveCard({ title: `${item.role} — ${item.company}`, detail: item.detail || item.description })} className="reveal rounded-3xl border border-white/10 bg-slate-950/40 p-6 transition hover:border-sky-300/30 hover:bg-slate-900/60 cursor-pointer">
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
          </section>

          <aside className="space-y-4">
            <div className="glass-card yuque-card compact-resume">
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

            <div className="glass-card yuque-card">
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

            <div className="glass-card yuque-card">
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

            <div className="glass-card yuque-card">
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
                  <button onClick={() => setShowResumeModal(true)} className="inline-flex rounded-full bg-sky-500/80 px-3 py-2 text-sm text-white">{locale === 'zh' ? '查看完整简历' : 'Open Full'}</button>
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
