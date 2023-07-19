import React, { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

function Profile() {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    lastName: user ? user.lastName : "",
    location: user ? user.location : "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.location
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(updateUser(userData));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labeText="last name"
            name="lastName"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="email"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
