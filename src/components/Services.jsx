function Services({ services }) {
  const whatsappNumber = "6281459107638";

  const serviceMessages = {
    "WEB DEVELOPMENT":
      "Halo, saya tertarik dengan layanan Web Development. Saya ingin membuat website dan ingin berdiskusi mengenai project saya",

    "MOBILE APPLICATION":
      "Halo, saya tertarik dengan layanan Mobile Application. Saya ingin membuat aplikasi mobile dan ingin berdiskusi mengenai project saya",

    "UI/UX DESIGN":
      "Halo, saya tertarik dengan layanan UI/UX Design. Saya ingin mendiskusikan kebutuhan desain UI/UX untuk project saya",

    "JOKI TUGAS":
      "Halo, saya tertarik dengan layanan Joki Tugas. Saya ingin konsultasi mengenai tugas yang saya butuhkan.",
  };

  const handleServiceClick = (service) => {
    const message =
      serviceMessages[service] ||
      `Halo, saya tertarik dengan layanan ${service}. Saya ingin berdiskusi mengenai project saya.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

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
            id={service === "JOKI TUGAS" ? "joki-tugas" : undefined}
            className="service-item reveal"
            key={service}
            onClick={() =>
              handleServiceClick(service)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" ||
                e.key === " "
              ) {
                e.preventDefault();
                handleServiceClick(service);
              }
            }}
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