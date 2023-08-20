import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/input";
import { toast } from "react-toastify";
import Button from "../Common/Button";
import FileInput from "../Common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log("handeling form");
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {

        //Banner image uploaded to storage
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/banner_images/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        //Display image uploaded to storage
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/display_images/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        //saving in database
        const podcastData =  {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db,'podcasts'), podcastData);

        //setting all the fields to empty
        setTitle('');
        setdesc('');
        setBannerImage(null);
        setDisplayImage(null);

        toast.success("Podcast Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.log("Error",error);
        setLoading(false);
      }

    } else {
      toast.error("Please Enter All Values!");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        type="text"
        setState={setTitle}
        placeholder="Title"
        required={true}
      />
      <InputComponent
        state={desc}
        type="text"
        setState={setdesc}
        placeholder="Description"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Upload Display Image"}
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Upload Banner Image"}
      />

      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
