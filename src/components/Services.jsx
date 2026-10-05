function Services({ services }) {
  return (
    <section
      id="services"
      className="services section"
    >

      <div className="section-label reveal">

        <span>
        </span>

        <span>
          WHAT WE DO
        </span>

      </div>

      <div className="services-heading reveal">

        <h2>
          DIGITAL
          <br />

          <span>
            CRAFT.
          </span>

        </h2>

      </div>

      <div className="service-list">

        {services.map((service, index) => (

          <div
            className="service-item reveal"
            key={service}
          >

            <span>
              0{index + 1}
            </span>

            <h3>
              {service}
            </h3>

            <span className="service-arrow">
              ↗
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Services;