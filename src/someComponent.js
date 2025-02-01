import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const SomeComponent = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {currentUser ? (
        <>
          <p>Name: {currentUser.displayName}</p>
          <p>Email: {currentUser.email}</p>
        </>
      ) : (
        <p>No user signed in</p>
      )}
    </div>
  );
};

export default SomeComponent;