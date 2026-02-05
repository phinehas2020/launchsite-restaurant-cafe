import { useMemo, useState } from 'react'
import './styles/App.css'

const navLinks = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#dishes', label: 'Dishes' },
  { href: '#cellar', label: 'Cellar' },
  { href: '#salon', label: 'Salon' },
  { href: '#book', label: 'Book' },
]

const courses = [
  {
    id: 'starter',
    label: 'Starter',
    title: 'Charred Oyster & Green Mango',
    description:
      'Live-fire oyster, preserved green mango, finger lime, and fermented chili honey.',
    price: '$28',
  },
  {
    id: 'signature',
    label: 'Signature',
    title: 'Dry-Aged Duck, Coal and Cherry',
    description:
      'Dry-aged duck, smoked cherry glaze, toasted farro, and wild fennel jus.',
    price: '$64',
  },
  {
    id: 'dessert',
    label: 'Dessert',
    title: 'Black Sesame Mille-Feuille',
    description:
      'Caramelized pastry, black sesame cream, citrus peel confit, and sea salt glass.',
    price: '$23',
  },
]

const cellarFlights = [
  {
    title: 'Old World Tension',
    notes: 'Etna Bianco · Jura Savagnin · Mosel Kabinett',
  },
  {
    title: 'Smoked Velvet Reds',
    notes: 'Northern Rhône Syrah · Barolo · Ribera Reserva',
  },
  {
    title: 'Nightcap Ritual',
    notes: 'Vintage Tawny · Armagnac · Black tea amaro',
  },
]

const testimonials = [
  {
    quote:
      'It feels authored, not manufactured. Every plate and every pause has intention.',
    author: 'Mira H.',
    role: 'Architect',
  },
  {
    quote:
      'The mood is contemporary but warm. You remember how it felt, not just what you ate.',
    author: 'Theo C.',
    role: 'Editor',
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80',
    alt: 'Chef plating seafood in warm kitchen light',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dark and intimate dining room interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80',
    alt: 'Cocktail with citrus garnish at marble bar',
  },
]

function App() {
  const [activeCourseId, setActiveCourseId] = useState(courses[0].id)
  const [requestSent, setRequestSent] = useState(false)

  const activeCourse = useMemo(
    () => courses.find((course) => course.id === activeCourseId) ?? courses[0],
    [activeCourseId],
  )

  const reservationMinDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const handleReservationSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setRequestSent(true)
  }

  return (
    <div className="page">
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="header">
        <div className="shell header-shell">
          <a className="wordmark" href="#top">
            NOIR <span>&</span> NECTAR
          </a>

          <nav aria-label="Primary" className="nav-desktop">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="header-book" href="#book">
            Reserve
          </a>
        </div>
      </header>

      <main id="content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="kicker">Lower Manhattan · Open Fire Kitchen</p>
            <h1>A dining room with a pulse.</h1>
            <p className="lede">
              We built Noir & Nectar around rhythm, smoke, and hospitality with emotional range.
              The room stays intimate. The flavors do not.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#book">
                Book A Table
              </a>
              <a className="button button-outline" href="#dishes">
                Explore Menu
              </a>
            </div>
          </div>

          <figure className="hero-figure">
            <img
              alt="Chef preparing a dish over open flame"
              fetchPriority="high"
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1800&q=80"
            />
            <figcaption>
              Tonight&apos;s pass: ember-roasted langoustine, chili butter, fermented citrus.
            </figcaption>
          </figure>
        </section>

        <section className="manifesto shell" id="manifesto">
          <div className="section-title">
            <p className="kicker">Manifesto</p>
            <h2>Precision over spectacle.</h2>
          </div>

          <div className="manifesto-grid">
            <p>
              Our menu is seasonal and specific to the week. We source from a small network of
              growers, fishers, and butchers whose work can stand on its own.
            </p>
            <p>
              We keep the room at low light, the music analog, and the service informed without
              performance. You come here for focus, not noise.
            </p>
          </div>
        </section>

        <section className="dishes shell" id="dishes">
          <div className="section-title">
            <p className="kicker">Featured Courses</p>
            <h2>Three signatures this week.</h2>
          </div>

          <div className="course-layout">
            <div className="course-tabs" role="tablist" aria-label="Featured courses">
              {courses.map((course) => (
                <button
                  key={course.id}
                  aria-selected={activeCourse.id === course.id}
                  className={activeCourse.id === course.id ? 'course-tab active' : 'course-tab'}
                  onClick={() => setActiveCourseId(course.id)}
                  role="tab"
                  type="button"
                >
                  <span>{course.label}</span>
                  <strong>{course.title}</strong>
                </button>
              ))}
            </div>

            <article className="course-panel" role="tabpanel">
              <p className="course-label">{activeCourse.label}</p>
              <h3>{activeCourse.title}</h3>
              <p>{activeCourse.description}</p>
              <div className="course-price">{activeCourse.price}</div>
            </article>
          </div>
        </section>

        <section className="cellar shell" id="cellar">
          <div className="section-title">
            <p className="kicker">Cellar</p>
            <h2>Flights built for structure and contrast.</h2>
          </div>

          <div className="cellar-list">
            {cellarFlights.map((flight) => (
              <article key={flight.title} className="cellar-item">
                <h3>{flight.title}</h3>
                <p>{flight.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery shell" id="salon">
          <div className="section-title">
            <p className="kicker">The Salon</p>
            <h2>Materials, flame, and shadow.</h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((image, imageIndex) => (
              <figure key={image.src} className={`gallery-item gallery-item-${imageIndex + 1}`}>
                <img alt={image.alt} loading="lazy" src={image.src} />
              </figure>
            ))}
          </div>
        </section>

        <section className="voices shell">
          <div className="section-title">
            <p className="kicker">Guest Notes</p>
            <h2>People remember the atmosphere first.</h2>
          </div>

          <div className="voice-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.author} className="voice-card">
                <p>“{testimonial.quote}”</p>
                <footer>
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="booking shell" id="book">
          <div className="section-title">
            <p className="kicker">Reservations</p>
            <h2>Tell us when to expect you.</h2>
          </div>

          <form className="booking-form" onSubmit={handleReservationSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required type="text" />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" required type="email" />

            <label htmlFor="date">Date</label>
            <input id="date" min={reservationMinDate} name="date" required type="date" />

            <label htmlFor="party">Party Size</label>
            <select defaultValue="" id="party" name="party" required>
              <option disabled value="">
                Select party size
              </option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6+">6+ guests</option>
            </select>

            <button className="button button-primary" type="submit">
              Send Request
            </button>

            {requestSent ? (
              <p className="booking-confirmation">Request received. Our team replies within one hour.</p>
            ) : null}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-shell">
          <div>
            <a className="wordmark" href="#top">
              NOIR <span>&</span> NECTAR
            </a>
            <p>123 Velvet Avenue · New York, NY</p>
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
