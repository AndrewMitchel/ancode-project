function ProjectModal({ activeProject, onClose }) {
  if (!activeProject) {
    return null;
  }

  return (
    <div
      className="project-modal-layer"
      onClick={onClose}
    >

      <div className="project-modal-backdrop"></div>

      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          CLOSE
          <span>×</span>
        </button>

        <div className="modal-content">

          <div className="modal-top">

            <span>
              {activeProject.number}
            </span>

            <span>
              {activeProject.type}
            </span>

          </div>

          <div
            className={`modal-visual ${activeProject.className}`}
          >

            <div className="modal-visual-grid"></div>

            <div className="modal-visual-shape"></div>

            <span>
              {activeProject.title}
            </span>

          </div>

          <div className="modal-info">

            <div>

              <p className="modal-label">
                ABOUT THE PROJECT
              </p>

              <h2>
                {activeProject.title}
              </h2>

            </div>

            <div className="modal-description">

              <p>
                {activeProject.description}
              </p>

              <div className="modal-stack">

                {activeProject.stack.map(
                  (tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

          <div className="modal-footer">

            <span>
              DIGITAL EXPERIENCE
            </span>

            <span>
              ancode. / 2026
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectModal;