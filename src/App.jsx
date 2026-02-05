import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './styles/App.css'

const navigationItems = [
  { href: '#story', label: 'Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#experience', label: 'Experience' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reserve', label: 'Reserve' },
]

const heroMetrics = [
  { value: '17', label: 'Course Signature Journey' },
  { value: '4.9', label: 'Average Guest Rating' },
  { value: '11PM', label: 'Late-Night Kitchen Service' },
]

const signaturePlates = [
  {
    name: 'Ember Lobster Vol-au-Vent',
    detail:
      'Butter-poached lobster, saffron espuma, and charred fennel pollen in flaky layers.',
    image:
      'https://images.unsplash.com/photo-1625944233019-68d52198e1be?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Coal-Roasted Aged Duck',
    detail:
      'Dry-aged duck breast with black fig lacquer, smoked shallot confit, and herb jus.',
    image:
      'https://images.unsplash.com/photo-1598514982901-ae8f57c4b74d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Midnight Cacao Entremet',
    detail:
      '72% cacao cremeux, olive oil sponge, sea salt caramel glass, and vanilla fog.',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=80',
  },
]

const menuCollections = {
  Degustation: [
    {
      title: 'Ocean Silk Crudo',
      description:
        'Line-caught kampachi, blood orange granita, cucumber blossom oil, and caviar pearls.',
      pairing: 'Pairing: Blanc de Blancs, Loire Valley',
      price: '$42',
    },
    {
      title: 'Forest Broth Cappuccino',
      description:
        'Porcini consommé, truffle milk foam, toasted chestnut crumbs, and black garlic ribbon.',
      pairing: 'Pairing: Barrel-fermented Chardonnay',
      price: '$28',
    },
    {
      title: 'Emberline Wagyu',
      description:
        'A5 striploin, smoked marrow emulsion, wild carrot reduction, and pickled mustard seed.',
      pairing: 'Pairing: Nebbiolo Riserva',
      price: '$96',
    },
  ],
  Cocktails: [
    {
      title: 'Velvet Thunder',
      description:
        'Reposado tequila, roasted pineapple cordial, bitter cacao, and aromatic cedar smoke.',
      pairing: 'Signature with duck or dark chocolate',
      price: '$24',
    },
    {
      title: 'Garden at Dusk',
      description:
        'Gin, green shiso, jasmine distillate, white peach, and sparkling yuzu veil.',
      pairing: 'Signature with seafood and herb-forward dishes',
      price: '$21',
    },
    {
      title: 'Nocturne Old Fashioned',
      description:
        'Three-grain whiskey, blackstrap reduction, saffron bitters, and burnt citrus perfume.',
      pairing: 'Signature with tasting finale courses',
      price: '$23',
    },
  ],
  Cellar: [
    {
      title: 'Côte-Rôtie “La Nuit” 2018',
      description:
        'Northern Rhône syrah offering plum skin, graphite, violet, and peppered smoke.',
      pairing: 'Recommended for Emberline Wagyu',
      price: '$245',
    },
    {
      title: 'Etna Bianco Contrada 2022',
      description:
        'Mineral-driven carricante with saline precision and volcanic citrus lift.',
      pairing: 'Recommended for Ocean Silk Crudo',
      price: '$118',
    },
    {
      title: 'Vintage Tawny 20 Year',
      description:
        'Textural layers of dried fig, walnut toffee, and warm spice for dessert service.',
      pairing: 'Recommended for Midnight Cacao Entremet',
      price: '$36 glass',
    },
  ],
}

const ritualTimeline = [
  {
    moment: '18:00',
    title: 'Golden Hour Prelude',
    detail:
      'A gentle opening hour with low-volume vinyl and botanical apertif flights at the marble bar.',
  },
  {
    moment: '19:30',
    title: 'Open-Flame Theatre',
    detail:
      'The central hearth ignites, revealing chef finishing stations and fire-kissed final plating.',
  },
  {
    moment: '22:00',
    title: 'Nocturnal Dessert Salon',
    detail:
      'Lighting dims, dessert carts roll, and sommelier-led nightcaps conclude the experience.',
  },
]

const galleryMoments = [
  {
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1300&q=80',
    alt: 'Chef plating a premium seafood course',
  },
  {
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1300&q=80',
    alt: 'Modern dining room with low ambient lighting',
  },
  {
    image:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1300&q=80',
    alt: 'Close-up of craft cocktail with citrus garnish',
  },
  {
    image:
      'https://images.unsplash.com/photo-1612152328626-947f2f42026c?auto=format&fit=crop&w=1300&q=80',
    alt: 'Dessert tasting plate styled with edible petals',
  },
]

const testimonials = [
  {
    quote:
      'Noir & Nectar feels like stepping inside a cinematic scene where every dish is choreographed to perfection.',
    guest: 'Amara L.',
    role: 'Creative Director',
  },
  {
    quote:
      'From reservation to final pour, every touchpoint is intentional. This is hospitality as high design.',
    guest: 'Jasper M.',
    role: 'Travel Writer',
  },
  {
    quote:
      'The tasting journey is bold, emotional, and technically flawless. Easily one of the best dining rooms in NYC.',
    guest: 'Selene K.',
    role: 'Sommelier',
  },
]

const revealIn = (shouldReduceMotion, delay = 0) => ({
  initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: shouldReduceMotion ? 0 : 0.75,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1],
  },
})

function App() {
  const shouldReduceMotion = useReducedMotion()
  const motionEnabled = !shouldReduceMotion && Boolean(motion)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Degustation')
  const [isReservationSubmitted, setIsReservationSubmitted] = useState(false)
  const minReservationDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isReservationSubmitted) {
      return undefined
    }

    const successTimer = window.setTimeout(() => {
      setIsReservationSubmitted(false)
    }, 5000)

    return () => {
      window.clearTimeout(successTimer)
    }
  }, [isReservationSubmitted])

  const handleReservationSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setIsReservationSubmitted(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="aurora-layer" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-mark" href="#top" onClick={closeMenu}>
            NOIR <span>&</span> NECTAR
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="#reserve">
            Book The Evening
          </a>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
            type="button"
          >
            Menu
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className="mobile-nav-overlay"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.nav
                animate={{ x: 0 }}
                className="mobile-nav-panel"
                id="mobile-navigation"
                initial={{ x: '100%' }}
                transition={{ duration: motionEnabled ? 0.35 : 0, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <div className="mobile-nav-top">
                  <span>Explore</span>
                  <button aria-label="Close menu" onClick={closeMenu} type="button">
                    Close
                  </button>
                </div>

                {navigationItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                ))}

                <a className="mobile-booking" href="#reserve" onClick={closeMenu}>
                  Reserve Your Table
                </a>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <section className="hero section" id="top">
          <div className="container hero-layout">
            <motion.div className="hero-copy" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Michelin-inspired dining · Manhattan</p>
              <h1>A theater of fire, smoke, and unforgettable flavor.</h1>
              <p className="hero-description">
                Noir & Nectar is an immersive modern bistro where open-flame cooking,
                obsessive detail, and sensory storytelling shape every evening.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#reserve">
                  Reserve Now
                </a>
                <a className="btn btn-secondary" href="#menu">
                  View Signature Courses
                </a>
              </div>

              <div className="hero-metrics" role="list">
                {heroMetrics.map((metric) => (
                  <article key={metric.label} className="metric-card" role="listitem">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-visual" {...revealIn(shouldReduceMotion, 0.15)}>
              <figure className="hero-photo hero-photo-main">
                <img
                  alt="Fine dining course on ceramic plate"
                  loading="eager"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80"
                />
              </figure>

              <figure className="hero-photo hero-photo-accent">
                <img
                  alt="Chef finishing dish at open kitchen"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                />
              </figure>

              <aside className="hero-note">
                <p>
                  <span>Tonight&apos;s feature</span>
                  Coal-roasted langoustine with black garlic silk and smoked citrus ash.
                </p>
              </aside>
            </motion.div>
          </div>
        </section>

        <section className="story section" id="story">
          <div className="container">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Our philosophy</p>
              <h2>Crafted intensity. Radical hospitality.</h2>
            </motion.div>

            <div className="story-layout">
              <motion.article className="story-copy" {...revealIn(shouldReduceMotion, 0.1)}>
                <p>
                  We built Noir & Nectar for guests who crave more than a meal. Every service is
                  designed as a progression: bright, textured openings; deep savory crescendos;
                  and elegant late-night endings.
                </p>
                <p>
                  Our sourcing is hyper-seasonal, our kitchen is open-flame first, and our team is
                  trained to choreograph a seamless experience from first pour to final espresso.
                </p>
              </motion.article>

              <motion.div className="pillar-grid" {...revealIn(shouldReduceMotion, 0.2)}>
                <article className="pillar-card">
                  <h3>Ingredient Ritual</h3>
                  <p>
                    Daily market-driven sourcing with small producers and lineage-grade proteins.
                  </p>
                </article>

                <article className="pillar-card">
                  <h3>Fire Kitchen</h3>
                  <p>
                    Oak embers and controlled smoke build depth without masking ingredient clarity.
                  </p>
                </article>

                <article className="pillar-card">
                  <h3>Sound + Light Design</h3>
                  <p>
                    Dynamic ambient profiles evolve through the evening for cinematic pacing.
                  </p>
                </article>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="signature section">
          <div className="container">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Signature plates</p>
              <h2>Composed for impact, plated with restraint.</h2>
            </motion.div>

            <div className="signature-grid">
              {signaturePlates.map((plate, index) => (
                <motion.article
                  key={plate.name}
                  className="signature-card"
                  {...revealIn(shouldReduceMotion, 0.08 * (index + 1))}
                >
                  <div className="signature-media">
                    <img alt={plate.name} loading="lazy" src={plate.image} />
                  </div>
                  <div className="signature-content">
                    <h3>{plate.name}</h3>
                    <p>{plate.detail}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="menu section" id="menu">
          <div className="container menu-shell">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Chef-led selections</p>
              <h2>Seasonal menu architecture.</h2>
            </motion.div>

            <motion.div className="menu-switcher" {...revealIn(shouldReduceMotion, 0.1)}>
              {Object.keys(menuCollections).map((collectionName) => (
                <button
                  key={collectionName}
                  aria-pressed={activeMenu === collectionName}
                  className={activeMenu === collectionName ? 'menu-tab active' : 'menu-tab'}
                  onClick={() => setActiveMenu(collectionName)}
                  type="button"
                >
                  {collectionName}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={activeMenu}
                animate={{ opacity: 1, y: 0 }}
                className="course-list"
                exit={{ opacity: 0, y: motionEnabled ? -18 : 0 }}
                initial={{ opacity: 0, y: motionEnabled ? 18 : 0 }}
                transition={{ duration: motionEnabled ? 0.35 : 0 }}
              >
                {menuCollections[activeMenu].map((course) => (
                  <li key={course.title}>
                    <article className="course-card">
                      <div>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <span>{course.pairing}</span>
                      </div>
                      <strong>{course.price}</strong>
                    </article>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="container experience-layout">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Evening rhythm</p>
              <h2>Designed to unfold in three movements.</h2>
            </motion.div>

            <motion.ol className="ritual-list" {...revealIn(shouldReduceMotion, 0.12)}>
              {ritualTimeline.map((ritual) => (
                <li key={ritual.title} className="ritual-item">
                  <span>{ritual.moment}</span>
                  <div>
                    <h3>{ritual.title}</h3>
                    <p>{ritual.detail}</p>
                  </div>
                </li>
              ))}
            </motion.ol>
          </div>
        </section>

        <section className="gallery section" id="gallery">
          <div className="container">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Visual atmosphere</p>
              <h2>The room, the craft, the details.</h2>
            </motion.div>

            <div className="gallery-grid">
              {galleryMoments.map((moment, index) => (
                <motion.figure
                  key={moment.image}
                  className="gallery-card"
                  {...revealIn(shouldReduceMotion, 0.05 * (index + 1))}
                >
                  <img alt={moment.alt} loading="lazy" src={moment.image} />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials section">
          <div className="container">
            <motion.div className="section-heading" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Guest voices</p>
              <h2>Not just dinner. A memory imprint.</h2>
            </motion.div>

            <div className="testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.guest}
                  className="testimonial-card"
                  {...revealIn(shouldReduceMotion, 0.09 * (index + 1))}
                >
                  <p>{testimonial.quote}</p>
                  <footer>
                    <strong>{testimonial.guest}</strong>
                    <span>{testimonial.role}</span>
                  </footer>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="reserve section" id="reserve">
          <div className="container reserve-layout">
            <motion.div className="reserve-copy" {...revealIn(shouldReduceMotion)}>
              <p className="eyebrow">Reserve your evening</p>
              <h2>Let us stage an extraordinary night for you.</h2>
              <p>
                Request your preferred date and we&apos;ll confirm availability with table curation,
                dietary accommodations, and pairing options.
              </p>
              <a href="tel:+15558902345">Call concierge: +1 (555) 890-2345</a>
            </motion.div>

            <motion.form
              className="reservation-form"
              onSubmit={handleReservationSubmit}
              {...revealIn(shouldReduceMotion, 0.12)}
            >
              <label htmlFor="reservation-name">Name</label>
              <input id="reservation-name" name="name" required type="text" />

              <label htmlFor="reservation-email">Email</label>
              <input id="reservation-email" name="email" required type="email" />

              <label htmlFor="reservation-date">Preferred Date</label>
              <input id="reservation-date" min={minReservationDate} name="date" required type="date" />

              <label htmlFor="reservation-guests">Party Size</label>
              <select defaultValue="" id="reservation-guests" name="partySize" required>
                <option disabled value="">
                  Select
                </option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
                <option value="6+">6+ guests (Chef&apos;s table)</option>
              </select>

              <button className="btn btn-primary" type="submit">
                Request Reservation
              </button>

              <AnimatePresence>
                {isReservationSubmitted && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="confirmation-chip"
                    initial={{ opacity: 0, y: 8 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    Request received. Our concierge team will contact you shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a className="brand-mark" href="#top">
              NOIR <span>&</span> NECTAR
            </a>
            <p>123 Velvet Avenue · Culture District · New York, NY</p>
          </div>

          <div className="footer-links">
            <a href="https://instagram.com" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href="https://facebook.com" rel="noreferrer" target="_blank">
              Facebook
            </a>
            <a href="mailto:reservations@noirnectar.com">reservations@noirnectar.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
