import axios from "axios";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const SearchPage = ({ setCurrAnime }) => {
  const [data, setData] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    axios
      .get(
        "https://calm-tan-reindeer-slip.cyclic.app/gogoanime/search?keyw=" +
          e.currentTarget.children[0].value +
          "&page=0"
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
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
    <>
      <div id="form_container">
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for an anime"
            className="bg-gray-200 outline-none border-none p-4"
          />
        </form>
      </div>
      <div
        id="videos_container"
        className="h-full w-full p-6 grid grid-cols-4 gap-y-4 justify-items-center"
      >
        {data.map((anime) => {
          return (
            <Link to={"/anime?id="+anime.animeId}>
              <div
                id={anime.animeId}
                className="w-[20vw] h-[25vw] bg-slate-200 flex items-center flex-col gap-3"
                onMouseEnter={handleStopScroll}
                onMouseLeave={handleStartScroll}
              >
                <div className="flex-grow w-full">
                  <div
                    alt=""
                    className="w-full h-2/3 bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${anime.animeImg})`,
                    }}
                  />
                  <div className="w-full px-4">
                    <Marquee gradient={false} speed={20} className="w-full">
                      {anime.animeTitle + "⠀⠀⠀"}
                    </Marquee>
                    <p>{anime.status}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SearchPage;
