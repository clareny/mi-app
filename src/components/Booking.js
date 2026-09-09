
const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1RpW4yhmM8-7hD28D4A_SrfbCi55cjZ_Hi6blJ5NskJyipp0s2Yf0NdJEmNaMdmkLWGftMICOp?gv=true';

export default function Booking() {
  return (
    <section id="booking" className="services-section">
      <h2 className="section-title">Disponibilidad y reservas</h2>
      <p className="intro">Podés ver mis espacios disponibles y reservar una llamada.</p>

      <div style={{ marginTop: 12 }}>
        <iframe
          title="Google Calendar Booking"
          src={BOOKING_URL}
          style={{ border: 0, width: '100%', minHeight: 520, borderRadius: 12 }}
          frameBorder="0"
          loading="lazy"
        ></iframe>

        <div style={{ marginTop: 8 }}>
          <p style={{ color: '#cfcfcf' }}>
            Si el calendario no carga aquí, abrilo en una nueva pestaña:
          </p>
          <a
            className="portfolio-link"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 6 }}
          >
            Abrir sistema de reservas
          </a>
        </div>
      </div>
    </section>
  );
}
