import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory()
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const newPasssword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDedBHYe2uofJucMhn7a91WQ0y-hVoYvxo",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPasssword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
       if(res.ok){
        history.replace('/')
       }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
