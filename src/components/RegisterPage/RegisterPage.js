import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5";

function RegisterPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSunmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      //firebase에서 생성한 유저에 추가 정보 입력
      await createdUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      //firebase 데이터베이스에 저장해주기
      await firebase.database().ref("users").child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      console.log("createdUser", createdUser);
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 50000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>email을 입력해 주세요</p>}

        <label>name</label>
        <input {...register("name", { required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === "required" && (
          <p>이름은 필수입력 입니다</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>이름은 10글자 안으로입력해주세요</p>
        )}
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

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && <p>필수입력</p>}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>암호확인이 일치하지 않습니다.</p>
          )}

        {errorFromSunmit && <p>{errorFromSunmit}</p>}
        <input type="submit" disabled={loading} />

        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
}
export default RegisterPage;
