import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSunmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>email을 입력해 주세요</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, maxLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>필수입력</p>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <p>6글자 안으로입력해주세요</p>
        )}

        {errorFromSunmit && <p>{errorFromSunmit}</p>}
        <input type="submit" disabled={loading} />

        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
}
export default LoginPage;
