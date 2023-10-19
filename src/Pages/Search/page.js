import axios from "axios";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import loadingLottie from "../../lib/lotties/lf30_editor_ehobeyri.json";


const SearchPage = ({ setCurrAnime }) => {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    console.log(e.currentTarget.children[0].value);
    if (e.currentTarget.children[0].value !== "") {
      setSearching(true);
      handleScrollTo();
      axios
        .get(`${process.env.REACT_APP_API_URL}/anime/zoro/${e.currentTarget.children[0].value}`
        )
        .then((res) => {
          console.log(res);
          setData(res.data.results);
          setSearching(false);
        });
    }
  }

  function handleScrollTo() {
    document.getElementById("videos_container").style.display = "flex";
    document
      .getElementById("videos_container")
      .scrollIntoView({ behavior: "smooth" });
  }

  function handleStopScroll(e) {
    const marquees =
      e.currentTarget.children[0].children[1].children[0].children;
    for (let i = 0; i < marquees.length; i++) {
      const savedStyles = marquees[i].style.cssText;
      const styles = savedStyles.replace("--play:running", "--play:paused");
      marquees[i].style.cssText = styles;
    }
  }

  function handleStartScroll(e) {
    const marquees =
      e.currentTarget.children[0].children[1].children[0].children;
    for (let i = 0; i < marquees.length; i++) {
      const savedStyles = marquees[i].style.cssText;
      const styles = savedStyles.replace("--play:paused", "--play:running");
      marquees[i].style.cssText = styles;
    }
  }
  return (
    <main className="bg-animeBlack">
      <div
        id="form_container"
        className="w-full h-screen flex justify-evenly items-center flex-col"
      >
        <div>
          <h1 className="text-6xl font-bold text-animeDarkGreen text-center uppercase">
            Little peter spider
          </h1>
          <br />
          <p className="text-4xl font-bold text-animeDarkGreen text-center uppercase">
            Anime streaming
          </p>
        </div>
        <form action="" onSubmit={handleSearch} className="w-full px-[30%]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for an anime"
            className="bg-transparent border-2 border-animeLightGreen p-4 w-full focus:outline-0 text-animeDarkGreen placeholder:text-animeDarkGreen"
          />
        </form>
      </div>
      <div
        id="videos_container"
        className="hidden h-screen w-full justify-center items-center"
      >
        {searching ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingLottie,
            }}
            height={400}
            width={400}
          />
        ) : (
          <div className="h-full w-full p-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 justify-items-center">
            {data.map((anime) => {
              return (
                <Link to={"/anime?id=" + anime.id} key={anime.id}>
                  <div
                    id={anime.id}
                    className="w-[35vw] md:w-[20vw] h-[50vw] md:h-[25vw] bg-transparent border-2 border-animeLightGreen flex items-center flex-col gap-3"
                    onMouseEnter={handleStopScroll}
                    onMouseLeave={handleStartScroll}
                  >
                    <div className="flex-grow w-full">
                      <div
                        alt=""
                        className="w-full h-2/3 bg-contain bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url(${anime.image})`,
                        }}
                      />
                      <div className="w-full px-2 md:pt-5 text-center text-animeDarkGreen">
                        <Marquee gradient={false} speed={20} className="w-full">
                          {anime.title + "⠀⠀⠀"}
                        </Marquee>
                        <p className="pt-4">{anime.status}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
