import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";


function LoadingPage() {

  const navigate = useNavigate();


  useEffect(() => {

    const loader =
      document.querySelector(
        ".loader"
      );


    const loaderNumber =
      document.querySelector(
        ".loader-number"
      );


    if (
      !loader ||
      !loaderNumber
    ) {
      return;
    }


    /*
      Halaman tujuan setelah loading.

      Kalau refresh di:
      /
      maka kembali ke /

      Kalau refresh di:
      /project/coffee-spot
      maka kembali ke:
      /project/coffee-spot
    */

    const returnTo =
      sessionStorage.getItem(
        "ancode-loading-return"
      ) || "/";


    const value = {
      value: 0,
    };


    const animation =
      gsap.to(
        value,
        {

          value: 100,

          duration: 2,

          ease: "power2.inOut",


          onUpdate: () => {

            loaderNumber.textContent =
              Math.floor(
                value.value
              )
                .toString()
                .padStart(
                  2,
                  "0"
                );

          },


          onComplete: () => {

            gsap.to(
              loader,
              {

                clipPath:
                  "inset(0 0 100% 0)",

                duration: 1.2,

                ease: "power4.inOut",

                delay: 0.2,


                onComplete: () => {

                  /*
                    Tandai bahwa session
                    sudah pernah melewati loading.
                  */

                  sessionStorage.setItem(
                    "ancode-session-started",
                    "true"
                  );


                  /*
                    Tujuan sementara
                    sudah tidak diperlukan.
                  */

                  sessionStorage.removeItem(
                    "ancode-loading-return"
                  );


                  /*
                    Kembali ke halaman asal
                    menggunakan React Router.
                  */

                  navigate(
                    returnTo,
                    {
                      replace: true,
                    }
                  );

                },

              }
            );

          },

        }
      );


    return () => {

      animation.kill();

    };

  }, [navigate]);


  return (
    <div className="loader">

      <div className="loader-brand">
        ancode.
      </div>


      <div className="loader-content">

        <span className="loader-label">
          BUILDING DIGITAL EXPERIENCES
        </span>


        <span className="loader-number">
          00
        </span>

      </div>


      <div className="loader-line"></div>

    </div>
  );
}


export default LoadingPage;