import React, { useEffect, useState } from "react";
import Header from "../Components/Common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcast } from "../slices/podcastSlice";
import { db } from "../firebase";
import PodcastCard from "../Components/Podcasts/PodcastCard";
import InputComponent from "../Components/Common/input";

function PodcastPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcast(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="input-container" style={{ marginTop: "0" }}>
        <div className="input-wrapper" style={{ marginTop: "0" }}>
          <h1 style={{ fontWeight: "normal" }}>Discover Podcast</h1>
          <InputComponent
            state={search}
            type="text"
            setState={setSearch}
            placeholder="Search By Title"
          />
          {filteredPodcasts.length > 0 ? (
            <div className="podcast-flex" style={{marginTop:'1rem'}}>
              {filteredPodcasts.map((item) => (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              ))}
            </div>
          ) : (
            <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PodcastPage;
