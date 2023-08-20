import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "../Components/Common/Header";
import { toast } from "react-toastify";
import Button from "../Components/Common/Button";
import EpisodesDetails from "../Components/Podcasts/EpisodeDetails";
import AudioPlayer from "../Components/Podcasts/AudioPlayer";

function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("DOcument data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("No such Podcast!");
        toast.error("No such Podcast!");
        navigate("/podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="input-container" style={{ margin: "0", paddingBottom:'5.5rem' }}>
        <div className="input-wrapper" style={{ margin: "0" }}>
          {podcast.id && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h1 className="podcast-title-heading">{podcast.title}</h1>
                {podcast.createdBy == auth.currentUser.uid && (
                  <Button
                    width={"200px"}
                    text={"Create Episode"}
                    onClick={() => navigate(`/podcast/${id}/create-episode`)}
                  />
                )}
              </div>
              <div className="banner-wrapper">
                <img src={podcast.bannerImage}></img>
              </div>
              <p className="podcast-description">{podcast.description}</p>
              <h1 className="podcast-title-heading">Episodes</h1>
              {episodes.length > 0 ? (
                <div style={{ width: "100%" }}>
                  {episodes.map((episode, index) => {
                    return (
                      <EpisodesDetails
                        key={index}
                        index={index + 1}
                        title={episode.title}
                        description={episode.description}
                        audioFile={episode.audioFile}
                        onClick={(file) => setPlayingFile(file)}
                      />
                    );
                  })}
                </div>
              ) : (
                <p>No Episodes</p>
              )}
            </>
          )}
        </div>
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
}

export default PodcastDetailsPage;
