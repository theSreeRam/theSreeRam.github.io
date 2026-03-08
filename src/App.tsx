import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Journey = {
  id: string
  company: string
  role: string
  period: string
  highlights: string[]
}

type Project = {
  title: string
  tag: string
  company: string
  impact: string
  details: string
}

type LegacyProject = {
  title: string
  description: string
  image: string
  link: string
}

const journeyData: Journey[] = [
  {
    id: 'gs',
    company: 'Goldman Sachs',
    role: 'Associate (SDE2)',
    period: 'March 2024 - Present | Hyderabad',
    highlights: [
      'Redesigned the netting engine powering $140M+ monthly intercompany settlements with better efficiency and accuracy.',
      'Built an AI-driven Angular-to-React converter that reduced manual migration effort by 70%.',
      'Migrated critical jobs to SFTP and retired legacy protocols for audit compliance.',
    ],
  },
  {
    id: 'swiggy-sde1',
    company: 'Swiggy',
    role: 'SDE1',
    period: 'July 2022 - August 2024 | Bengaluru',
    highlights: [
      'Led RDS to DynamoDB migration at 700k rpm with zero downtime.',
      'Migrated Kafka to AWS SQS and cut latency with async flow redesign.',
      'Unified 4 legacy Java ingestion flows into 1 Go flow.',
      'Redesigned APIs with Protobuf and gRPC, reducing response time to around 800ms.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'SDE Intern',
    period: 'January 2022 - June 2022 | Bengaluru',
    highlights: [
      'Built CI/CD for Lambda + DynamoDB service with CloudWatch metrics.',
      'Reduced Lambda API latency from 200ms to 20ms in internal network path.',
      'Delivered service using AWS CDK with high availability and SLA alignment.',
    ],
  },
  {
    id: 'swiggy-intern',
    company: 'Swiggy',
    role: 'SDE Intern',
    period: 'July 2021 - December 2021',
    highlights: [
      'Designed high-scale DynamoDB reconciliation storage for missed orders.',
      'Reduced unreconciled initial volume by around 90% after root-cause fix.',
    ],
  },
]

const projects: Project[] = [
  {
    title: 'Netting Engine Overhaul',
    tag: 'systems',
    company: 'Goldman Sachs',
    impact: '$140M+ monthly settlements flow',
    details: 'Reworked settlement netting logic and processing strategy to improve correctness and throughput.',
  },
  {
    title: 'Angular-to-React AI Converter',
    tag: 'frontend-migration',
    company: 'Goldman Sachs',
    impact: '70% migration effort reduced',
    details: 'Automated large parts of component migration and accelerated internal React framework adoption.',
  },
  {
    title: 'RDS to DynamoDB Migration',
    tag: 'data',
    company: 'Swiggy',
    impact: '700k rpm, zero downtime',
    details: 'Executed dual-write and consistency validation strategy for large-scale SQL to NoSQL transition.',
  },
  {
    title: 'Kafka to AWS SQS',
    tag: 'messaging',
    company: 'Swiggy',
    impact: 'Major latency reduction',
    details: 'Shifted message flow to SQS using asynchronous processing and reduced queue bottlenecks.',
  },
  {
    title: 'Java to Go Consolidation',
    tag: 'platform',
    company: 'Swiggy',
    impact: '4 flows unified into 1',
    details: 'Consolidated ingestion architecture and lowered maintenance complexity without downtime.',
  },
  {
    title: 'Lambda Performance Library',
    tag: 'performance',
    company: 'Amazon',
    impact: '200ms to 20ms latency',
    details: 'Built internal optimization path to bypass overhead-heavy routes in trusted service networks.',
  },
]

const skills = [
  { name: 'AWS Architecture', desc: 'Lambda, SQS, S3, CDK, CloudWatch' },
  { name: 'Backend Systems', desc: 'Java, Spring Boot, GoLang, gRPC' },
  { name: 'Data Engineering', desc: 'RDS, DynamoDB, migration patterns' },
  { name: 'Performance', desc: 'Latency optimization and throughput tuning' },
  { name: 'Reliability', desc: 'Zero-downtime delivery and resiliency' },
  { name: 'Leadership', desc: 'Cross-team migration ownership and delivery' },
]

const achievements = [
  { title: 'Scale Guardian', text: 'Handled workloads at 700k rpm with reliable throughput.' },
  { title: 'Latency Slayer', text: 'Reduced API latencies up to 10x in critical services.' },
  { title: 'Migration Strategist', text: 'Delivered SQL->NoSQL and Kafka->SQS transitions safely.' },
  { title: 'Cost Optimizer', text: 'Reduced payload/storage footprint and cloud cost overhead.' },
  { title: 'Framework Accelerator', text: 'AI-driven migration accelerated frontend modernization.' },
  { title: 'Audit Compliant', text: 'Modernized transfer protocols to satisfy key audit requirements.' },
]

const legacyProjects: LegacyProject[] = [
  {
    title: 'Pricing Panel',
    description: 'Simple responsive pricing panel UI.',
    image: '/assets/museum_of_candy.png',
    link: 'https://thesreeram.github.io/pricing_panel/',
  },
  {
    title: 'Museum Of Candy',
    description: 'Clone project with strong visual layout and transitions.',
    image: '/assets/museum_of_candy.png',
    link: 'https://thesreeram.github.io/museum_of_candy/',
  },
  {
    title: 'Snake Game',
    description: 'OOP + game loop implementation project.',
    image: '/assets/snake_game.png',
    link: 'https://github.com/theSreeRam/DSA_Projects',
  },
  {
    title: 'Splitwise Algorithm',
    description: 'Bill splitting optimization and UX demo.',
    image: '/assets/splitwise_algo.png',
    link: 'https://github.com/theSreeRam/DSA_Projects',
  },
  {
    title: 'Fruit Collector',
    description: 'Arcade style gameplay in Phaser framework.',
    image: '/assets/fruit_collector.png',
    link: 'https://github.com/theSreeRam/DSA_Projects',
  },
  {
    title: 'Todo React',
    description: 'React + local storage productivity app.',
    image: '/assets/todo-list.png',
    link: 'https://thesreeram.github.io/todos-react/',
  },
]

const statConfig = [
  { label: 'Latency Reduction', count: 90, suffix: '%' },
  { label: 'Peak Traffic', count: 700, suffix: 'k rpm' },
  { label: 'Settlement Scale', count: 140, prefix: '$', suffix: 'M+' },
  { label: 'Migration Effort Saved', count: 70, suffix: '%' },
]

function AnimatedStat({
  label,
  count,
  prefix = '',
  suffix = '',
}: {
  label: string
  count: number
  prefix?: string
  suffix?: string
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const duration = 1000
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setValue(Math.round(count * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [count])

  return (
    <article className="tiltable">
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {prefix}
        {value}
        {suffix}
      </p>
    </article>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [bootLine, setBootLine] = useState('Initializing mission payload...')
  const [xp, setXp] = useState(0)
  const [selectedJourney, setSelectedJourney] = useState(journeyData[0].id)
  const [projectFilter, setProjectFilter] = useState('all')
  const [unlocked, setUnlocked] = useState<number[]>([])
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  const addXp = (amount: number) => setXp((prev) => Math.min(100, prev + amount))

  const categories = useMemo(() => ['all', ...new Set(projects.map((p) => p.tag))], [])
  const filteredProjects = useMemo(
    () => (projectFilter === 'all' ? projects : projects.filter((p) => p.tag === projectFilter)),
    [projectFilter],
  )
  const activeJourney = useMemo(
    () => journeyData.find((item) => item.id === selectedJourney) ?? journeyData[0],
    [selectedJourney],
  )

  const guideMessage = useMemo(() => {
    if (xp < 20) return 'Welcome to Cloud Quest. Explore the map and start unlocking quests.'
    if (activeSection === 'bosses') return 'Boss zone active. Open strategies to inspect architecture decisions.'
    if (activeSection === 'skills') return 'Unlock skill nodes. Press U for instant full unlock.'
    if (xp < 80) return 'Great progress. Keep collecting XP by interacting with cards and missions.'
    return 'Elite mode unlocked. Ready to recruit this engineer for your next platform mission.'
  }, [activeSection, xp])

  useEffect(() => {
    const lines = [
      'Initializing mission payload...',
      'Loading character controllers...',
      'Spawning quest map and battle effects...',
      'Ready: press start',
    ]

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      if (index >= lines.length) {
        window.clearInterval(timer)
        return
      }
      setBootLine(lines[index])
    }, 700)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? (window.scrollY / max) * 100 : 0
      setScrollPercent(value)
    }

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth
      const y = event.clientY / window.innerHeight
      document.documentElement.style.setProperty('--orb-ax', `${x * 18}px`)
      document.documentElement.style.setProperty('--orb-ay', `${y * 14}px`)
      document.documentElement.style.setProperty('--orb-bx', `${-x * 16}px`)
      document.documentElement.style.setProperty('--orb-by', `${-y * 12}px`)
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key >= '1' && event.key <= '6') {
        const ids = ['hero', 'journey', 'bosses', 'skills', 'arcade', 'contact']
        const id = ids[Number(event.key) - 1]
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        addXp(2)
      }
      if (event.key.toLowerCase() === 'u') {
        setUnlocked(skills.map((_, idx) => idx))
        addXp(20)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    const panels = document.querySelectorAll('.panel')
    const sections = document.querySelectorAll('main section[id]')

    const panelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.18 },
    )

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 },
    )

    panels.forEach((panel) => panelObserver.observe(panel))
    sections.forEach((section) => sectionObserver.observe(section))

    return () => {
      panelObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const tiltables = Array.from(document.querySelectorAll<HTMLElement>('.tiltable'))

    const onMove = (event: Event) => {
      const mouse = event as MouseEvent
      const card = event.currentTarget as HTMLElement
      const rect = card.getBoundingClientRect()
      const px = (mouse.clientX - rect.left) / rect.width
      const py = (mouse.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * 10
      const ry = (px - 0.5) * 10
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
    }

    const onLeave = (event: Event) => {
      const card = event.currentTarget as HTMLElement
      card.style.transform = ''
    }

    tiltables.forEach((card) => {
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })

    return () => {
      tiltables.forEach((card) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [projectFilter, unlocked])

  return (
    <>
      <div className={`boot-screen ${started ? 'hidden' : ''}`}>
        <div className="boot-panel">
          <p className="boot-title">Cloud Quest Console</p>
          <p className="boot-line">{bootLine}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setStarted(true)
              addXp(6)
            }}
          >
            Press Start
          </button>
        </div>
      </div>

      <div className="cursor-glow" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />

      <header className="hud">
        <div className="brand">
          <img src="/assets/logo.svg" alt="Sreeram logo" />
          <span>CLOUD QUEST</span>
        </div>
        <nav>
          <a className={activeSection === 'hero' ? 'active' : ''} href="#hero">
            Hero
          </a>
          <a className={activeSection === 'journey' ? 'active' : ''} href="#journey">
            Journey
          </a>
          <a className={activeSection === 'bosses' ? 'active' : ''} href="#bosses">
            Bosses
          </a>
          <a className={activeSection === 'skills' ? 'active' : ''} href="#skills">
            Skills
          </a>
          <a className={activeSection === 'arcade' ? 'active' : ''} href="#arcade">
            Arcade
          </a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact">
            Contact
          </a>
        </nav>
        <div className="xp-wrap">
          <span>
            XP {xp} / 100
          </span>
          <div className="xp-bar">
            <span style={{ width: `${xp}%` }} />
          </div>
        </div>
      </header>

      <aside className="guide-character" aria-live="polite">
        <div className="guide-sprite" aria-hidden="true">
          <span className="eye left" />
          <span className="eye right" />
        </div>
        <p>{guideMessage}</p>
      </aside>

      <div id="scroll-progress" style={{ width: `${scrollPercent}%` }} />

      <main>
        <section id="hero" className="panel hero">
          <div className="hero-copy">
            <p className="kicker">Player Profile</p>
            <h1>Sreeram Panigrahi</h1>
            <p className="subtitle">Backend Engineer | AWS, Java, Spring Boot | Systems at Scale</p>
            <p>I build reliable, high-throughput backend systems and lead platform migrations with zero downtime.</p>
            <div className="runner-track" aria-hidden="true">
              <div className="runner" style={{ left: `calc(${scrollPercent}% - 14px)` }} />
            </div>
            <div className="cta-row">
              <a className="btn btn-primary" href="#bosses">
                Start Mission
              </a>
              <a className="btn btn-ghost" href="#contact">
                Recruit Player
              </a>
            </div>
            <div className="quick-badges">
              <span>$140M+ monthly settlements engine</span>
              <span>700k rpm scale systems</span>
              <span>10x latency improvements</span>
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-avatar tiltable">
              <img src="/assets/home_screen.jpg" alt="Sreeram profile" />
            </div>
            <div className="hero-stats">
              {statConfig.map((s) => (
                <AnimatedStat key={s.label} label={s.label} count={s.count} prefix={s.prefix} suffix={s.suffix} />
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="panel">
          <div className="section-head">
            <p className="kicker">Quest Map</p>
            <h2>Career Journey</h2>
          </div>
          <div className="journey-grid">
            <div className="journey-list">
              {journeyData.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`journey-item tiltable ${item.id === selectedJourney ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedJourney(item.id)
                    addXp(4)
                  }}
                >
                  <strong>{item.company}</strong>
                  <p>{item.role}</p>
                </button>
              ))}
            </div>
            <div className="journey-detail">
              <h3>{activeJourney.company}</h3>
              <p>{activeJourney.role}</p>
              <p className="project-meta">{activeJourney.period}</p>
              <ul>
                {activeJourney.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="bosses" className="panel">
          <div className="section-head">
            <p className="kicker">Boss Battles</p>
            <h2>High-Impact Projects</h2>
          </div>
          <div className="filter-row">
            {categories.map((tag) => (
              <button
                type="button"
                key={tag}
                className={tag === projectFilter ? 'active' : ''}
                onClick={() => {
                  setProjectFilter(tag)
                  addXp(3)
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card tiltable" key={project.title}>
                <div>
                  <p className="project-meta">
                    {project.company} | {project.tag}
                  </p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-impact">{project.impact}</p>
                <details onToggle={(event) => (event.currentTarget.open ? addXp(2) : undefined)}>
                  <summary>View strategy</summary>
                  <p>{project.details}</p>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="panel">
          <div className="section-head">
            <p className="kicker">Skill Tree</p>
            <h2>Unlock Engineering Abilities</h2>
            <p>
              Click any node to unlock. Keyboard shortcut: press <kbd>U</kbd> to unlock all.
            </p>
          </div>
          <div className="skill-tree">
            {skills.map((skill, idx) => {
              const isUnlocked = unlocked.includes(idx)
              return (
                <button
                  type="button"
                  key={skill.name}
                  className={`skill-node tiltable ${isUnlocked ? 'unlocked' : ''}`}
                  onClick={() => {
                    if (isUnlocked) return
                    setUnlocked((prev) => [...prev, idx])
                    addXp(8)
                  }}
                >
                  <strong>{skill.name}</strong>
                  <p>{skill.desc}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section id="achievements" className="panel">
          <div className="section-head">
            <p className="kicker">Achievement Vault</p>
            <h2>Milestones and Outcomes</h2>
          </div>
          <div className="achievement-grid">
            {achievements.map((a) => (
              <article className="achievement-card tiltable" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="arcade" className="panel">
          <div className="section-head">
            <p className="kicker">Legacy Arcade</p>
            <h2>Past Projects Gallery</h2>
          </div>
          <div className="legacy-grid">
            {legacyProjects.map((item) => (
              <a className="legacy-card tiltable" key={item.title} href={item.link} target="_blank" rel="noreferrer">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="panel contact-panel">
          <div className="section-head">
            <p className="kicker">Contact Arena</p>
            <h2>Start the Next Mission</h2>
          </div>
          <p>Looking for backend ownership, distributed systems design, cloud modernization, and platform reliability.</p>
          <p className="contact-meta">Email: panigrahi.sreeram@gmail.com | Phone: (+91) 7978426120</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:panigrahi.sreeram@gmail.com">
              Email
            </a>
            <a className="btn btn-ghost" href="https://github.com/theSreeRam" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.linkedin.com/in/sreeram-panigrahi/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <p className="footnote">Built with Vite + React for GitHub Pages deployment.</p>
        </section>
      </main>

      <aside className="hotkeys">
        <p>
          Hotkeys: <kbd>1</kbd>-<kbd>6</kbd> jump sections, <kbd>U</kbd> unlock skills
        </p>
      </aside>
    </>
  )
}

export default App
