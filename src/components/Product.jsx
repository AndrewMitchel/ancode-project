function Product({ projects, onProjectClick }) {
  return (
    <section
      id="PRODUCT"
      className="PRODUCT section"
    >

      <div className="section-label reveal">

        <span>
        </span>

        <span>
          SELECTED PRODUCT
        </span>

      </div>

      <div className="projects">

        {projects.map((project) => (

          <article
            className="project-card"
            key={project.number}
            data-project={project.number}
            onClick={() => onProjectClick(project)}
          >

            <div
              className={`project-visual ${project.className}`}
            >

              {/* PROJECT IMAGE */}
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />

              <div className="visual-grid"></div>

              <div className="visual-orb"></div>

              <span className="visual-title">
                {project.title}
              </span>

              <span className="visual-arrow">
                ↗
              </span>

              <div className="project-hover-label">

                <span>
                  EXPLORE PROJECT
                </span>

                <span>
                  ↗
                </span>

              </div>

            </div>

            <div className="project-info">

              <div>

                <span>
                  {project.number}
                </span>

                <div>

                  <h3>
                    {project.title}
                  </h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tags">

                    {project.stack.map((tag) => (

                      <span key={tag}>
                        {tag}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              <div className="project-type">
                {project.type}
              </div>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}

export default Product;