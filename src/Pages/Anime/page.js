import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
const AnimePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [episodeURL, setEpisodeURL] = useState("");
  useEffect(() => {
    if (data.length < 1) {
      console.log("new get");
      axios
        .get(`${process.env.REACT_APP_API_URL}/anime/zoro/info?id=${searchParams.get("id")}`
        )
        .then((res) => {
          console.log(res.data.episodes);
          setData(res.data);
          setEpisodes(res.data.episodes);
        });
    }
  }, []);

  function handleClickEpisode(e) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/anime/zoro/watch?episodeId=${e.currentTarget.id}`
      )
      .then((res) => {
        console.log(res.data);
        setEpisodeURL(res.data.sources[0].url);
      });
  }

  return (
    <div className="flex">
      <div
        id="background"
        className="h-full w-full bg-animeBlack"
      // style={{
      //   backgroundImage: `url(${data.animeImg})`,
      // }}
      >
        <div className="flex md:px-24 justify-center h-full w-full ">
          <div
            className="py-12 px-12 w-full h-full bg-transparent"
          >
            <div className="flex justify-between px-4">
              <h1 className="text-3xl text-animeDarkGreen">{data.animeTitle}</h1>
              <Link to="/">
                <button className="bg-transparent text-center p-2 border-2 border-animeLightGreen text-animeDarkGreen">
                  Back to search
                </button>
              </Link>
            </div>
            <ReactHlsPlayer
              width="100%"
              className="select-none outline-none border-none my-4"
              controls={true}
              src={episodeURL}
            ></ReactHlsPlayer>
            <div className="grid grid-cols-4 md:grid-cols-12 gap-4">
              {episodes.map((episode) => {
                return (
                  <div
                    id={episode.id}
                    key={episode.id}
                    onClick={handleClickEpisode}
                    className="hover:bg-white hover:bg-opacity-20 cursor-pointer bg-transparent text-center text-animeDarkGreen p-2 border-animeLightGreen border-2"
                  >
                    {episode.number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
