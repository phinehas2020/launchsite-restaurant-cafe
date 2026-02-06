import { useState } from 'react'
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
    title: 'Charred Oyster & Green Mango',
    description:
      'Live-fire oyster, preserved green mango, finger lime, and fermented chili honey.',
    price: '28',
  },
  {
    id: 'signature',
    title: 'Dry-Aged Duck, Coal and Cherry',
    description:
      'Dry-aged duck, smoked cherry glaze, toasted farro, and wild fennel jus.',
    price: '64',
  },
  {
    id: 'dessert',
    title: 'Black Sesame Mille-Feuille',
    description:
      'Caramelized pastry, black sesame cream, citrus peel confit, and sea salt glass.',
    price: '23',
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
  const [requestSent, setRequestSent] = useState(false)

  const reservationMinDate = new Date().toISOString().split('T')[0]

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
        {/* HERO: dramatic, oversized, image-dominant */}
        <section className="hero" id="top">
          <figure className="hero-figure">
            <img
              alt="Chef preparing a dish over open flame"
              fetchPriority="high"
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1800&q=80"
            />
          </figure>
          <div className="hero-copy shell">
            <h1>
              Noir<br />
              <span className="hero-ampersand">&</span><br />
              Nectar
            </h1>
            <p className="lede">
              Open fire kitchen. Lower Manhattan.<br />
              Intimate room. Unrestrained flavor.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#book">
                Book A Table
              </a>
            </div>
          </div>
        </section>

        {/* MANIFESTO: single flowing text, narrowed, intimate */}
        <section className="manifesto" id="manifesto">
          <div className="shell manifesto-inner">
            <h2>Precision over spectacle.</h2>
            <div className="manifesto-body">
              <p>
                Our menu is seasonal and specific to the week. We source from a small network of
                growers, fishers, and butchers whose work can stand on its own.
              </p>
              <p>
                We keep the room at low light, the music analog, and the service informed without
                performance. You come here for focus, not noise.
              </p>
            </div>
          </div>
        </section>

        {/* DISHES: course labels, signature emphasis, no hr dividers */}
        <section className="dishes" id="dishes">
          <div className="shell">
            <h2 className="dishes-display">MENU</h2>
            <p className="dishes-subtitle">Three signatures this week</p>

            <div className="menu-list">
              {courses.map((course) => (
                <div key={course.id} className={`menu-item${course.id === 'signature' ? ' menu-item--signature' : ''}`}>
                  <span className="menu-item-course">{course.id}</span>

                  <div className="menu-item-content">
                    <h3 className="menu-item-name">{course.title}</h3>
                    <p className="menu-item-desc">{course.description}</p>
                  </div>

                  <span className="menu-item-price">${course.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY: simple horizontal scroll now */}
        <section className="gallery" id="salon">
          <div className="gallery-grid">
            {galleryImages.map((image, imageIndex) => (
              <figure key={image.src} className={`gallery-item gallery-item-${imageIndex + 1}`}>
                <img alt={image.alt} loading="lazy" src={image.src} />
              </figure>
            ))}
          </div>
        </section>

        {/* CELLAR */}
        <section className="cellar" id="cellar">
          <div className="shell">
            <h2 className="cellar-heading">The Cellar</h2>
            <div className="cellar-triptych">
              {cellarFlights.map((flight) => (
                <div key={flight.title} className="cellar-flight">
                  <h3>{flight.title}</h3>
                  <p>{flight.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VOICES */}
        <section className="voices">
          <div className="shell voices-inner">
            <div className="voice-featured">
              <blockquote>
                <p>&ldquo;{testimonials[0].quote}&rdquo;</p>
              </blockquote>
              <cite>
                {testimonials[0].author} — {testimonials[0].role}
              </cite>
            </div>

            <div className="voice-ornament" aria-hidden="true">✦</div>

            <div className="voice-secondary">
              <blockquote>
                <p>&ldquo;{testimonials[1].quote}&rdquo;</p>
              </blockquote>
              <cite>
                {testimonials[1].author} — {testimonials[1].role}
              </cite>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section className="booking" id="book">
          <div className="shell booking-inner">
            <div className="booking-heading-area">
              <h2 className="booking-display">Reserve</h2>
            </div>

            <form className="booking-form" onSubmit={handleReservationSubmit}>
              <div className="form-field">
                <input id="name" name="name" placeholder=" " required type="text" />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="form-field">
                <input id="email" name="email" placeholder=" " required type="email" />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="form-field">
                <input id="date" min={reservationMinDate} name="date" required type="date" />
                <label htmlFor="date" style={{ display: 'none' }}>Date</label>
              </div>

              <div className="form-field">
                <select defaultValue="" id="party" name="party" required>
                  <option disabled value="">
                    Party Size
                  </option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5 guests</option>
                  <option value="6+">6+ guests</option>
                </select>
              </div>

              <button className="button button-primary" type="submit">
                Request Table
              </button>

              {requestSent ? (
                <p className="booking-confirmation">Request received. We will confirm shortly.</p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-shell">
          <div>
            <a className="wordmark" href="#top">
              NOIR <span>&</span> NECTAR
            </a>
            <p>123 Velvet Avenue, New York, NY</p>
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
