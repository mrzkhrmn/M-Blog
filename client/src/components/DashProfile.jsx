import { useDispatch, useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export const DashProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState("");

  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();
  console.log(formData);

  function handleFormDataChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User`s profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 border p-8 shadow-lg "
      >
        <div className="cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
          />
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user profile pic"
            className="w-[5rem] rounded-full border-2 border-black hover:opacity-85"
            onClick={() => filePickerRef.current.click()}
          />
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
        </div>
        {imageFileUploadError && (
          <p className="text-red-500">{imageFileUploadError}</p>
        )}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username..."
            defaultValue={currentUser.username}
            className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
            id="username"
            onChange={handleFormDataChange}
          />
          <input
            type="email"
            placeholder="Email..."
            defaultValue={currentUser.email}
            className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
            id="email"
            onChange={handleFormDataChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
              id="password"
              onChange={handleFormDataChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
              className="absolute top-2.5 text-xl right-2"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="border border-black py-2 hover:bg-gray-100 rounded-md"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <div className="flex justify-between text-red-600">
            <button type="button" className="hover:underline">
              Sign Out
            </button>
            <button type="button" className="hover:underline">
              Delete User
            </button>
          </div>
        </div>
      </form>
      <p className="text-green-500">{updateUserSuccess}</p>
    </div>
  );
};
