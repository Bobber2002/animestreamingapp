import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactHlsPlayer from 'react-hls-player';

const AnimePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [episodeURL, setEpisodeURL] = useState("");
  useEffect(() => {
    if (data.length < 1) {
      console.log("new get");
      axios
        .get(
          "https://calm-tan-reindeer-slip.cyclic.app/gogoanime/info/" +
            searchParams.get("id")
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setEpisodes(res.data.episodes);
        });
    }
  }, []);

  function handleClickEpisode(e) {
    axios.get(
      "https://calm-tan-reindeer-slip.cyclic.app/gogoanime/watch/" +
        e.currentTarget.id
    ).then((res)=>{
      console.log(res.data);
      setEpisodeURL(res.data.sources[0].file)
    })
  }

  return (
    <div className="h-full w-full">
      <div
        id="background"
        className="h-full w-full bg-cover bg-indigo-900"
        style={{
          backgroundImage: `url(${data.animeImg})`,
        }}
      >
        <div className="flex px-24 justify-center h-full w-full backdrop-blur-2xl backdrop-contrast-150 backdrop-brightness-50 backdrop-saturate-[40%]">
          <div
            className="py-12 px-12 w-full h-full bg-white bg-opacity-30"
            style={{
              boxShadow: "0px 0px 12px 24px rgba(255,255,255,0.3)",
            }}
          >
            <h1 className="text-3xl">{data.animeTitle}</h1>
            <ReactHlsPlayer
              width="100%"
              className="select-none outline-none border-none"
              controls={true}
              src={episodeURL}
            >
            </ReactHlsPlayer>
            <div className="grid grid-cols-12 gap-4">
              {episodes.map((episode) => {
                return (
                  <div
                    id={episode.episodeId}
                    key={episode.episodeId}
                    onClick={handleClickEpisode}
                    className="bg-gray-400 bg-opacity-90 text-center rounded-md py-2"
                  >
                    {episode.epNum}
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
