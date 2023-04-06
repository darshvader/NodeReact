import React, { useEffect, useState, useContext } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import AuthContext from "../context/AuthProvider";
import handleLoginHelper from "../api/helpers";

export default function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  // console.log('setauth1', setAuth);
  //console.log('authcontextlogin', useContext(AuthContext));

  const [isDesktop, setisDesktop] = useState(window.innerWidth > 768);
  const [currentWidth, setcurrentWidth] = useState(window.innerWidth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const isUsernameValid = username.length >= 4;
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [UsernameAlphanumericError, setUsernameAlphanumericError] =
    useState("");

  const isPasswordValid = password.length >= 4;
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordAlphanumericError, setPasswordAlphanumericError] =
    useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  let navigate = useNavigate();

  const handleLogin = () => {
    setSubmitted(true);
    console.log("a");
    handleLoginHelper(username, password).then(
      (res) => {
        console.log("b");
        if (res.accessToken) {
          console.log("res", res);
          let acc = res.accessToken;
          const roles = res?.data?.roles;
          setAuth({ username, password, roles, acc });
        }
      },
      (err) => {
        setErrMsg(err.errhelper);
        console.log("error", errMsg);
      }
    );
    console.log("c");
  };

  const updateMedia = () => {
    setisDesktop(window.innerWidth > 768);
    setcurrentWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  function checkComplexity(str) {
    let firstCharAlphabet = /^[a-z]/i.test(str.charAt(0));
    let regularExpression = /^[a-zA-Z0-9]+$/;
    let alphanumeric = regularExpression.test(str);

    return [alphanumeric, firstCharAlphabet];
  }

  return (
    <div className="card">
      <div className="flex flex-column md:flex-row">
        {isDesktop && (
          <div className="w-full md:w-5 ">
            <Image src="left.png" alt="Image" width="100%" />
          </div>
        )}

        <div className="w-full md:w-2">
          <Divider layout="vertical" className="hidden md:hidden"></Divider>
          <Divider
            layout="horizontal"
            className=" hidden md:hidden"
            align="center"
          ></Divider>
        </div>

        <div
          className="w-full md:w-4 flex flex-column  justify-content-center gap-3 py-5"
          style={{ paddingLeft: "1rem", paddingRight: "1rem", margin: "auto" }}
        >
          <Image
            src="gemini-logo-small-black.png"
            alt="Image"
            width={isDesktop ? "250px" : currentWidth - 35}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <label htmlFor="username" style={{ marginLeft: "5px" }}>
              Username
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <InputText
                id="username"
                type="text"
                style={{
                  width: isDesktop ? "25vw" : currentWidth - 35,
                  margin: isDesktop ? "0" : "auto",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => {
                  if (username.length === 0)
                    setUsernameErrorMessage("Username cannot be empty");
                  if (username.length > 0 && username.length < 4)
                    setUsernameErrorMessage(
                      "Username cannot be less than 4 characters"
                    );
                  if (username.length >= 4) setUsernameErrorMessage("");

                  let valid = checkComplexity(username);
                  if (!valid[0] || !valid[1])
                    setUsernameAlphanumericError(
                      "Username should be alphanumeric and first letter alphabet. "
                    );
                  else setUsernameAlphanumericError("");
                }}
              />
              {!isUsernameValid && (
                <div style={{ color: "red" }}> {usernameErrorMessage} </div>
              )}
              {!isUsernameValid &&
                submitted &&
                usernameErrorMessage.length === 0 && (
                  <div style={{ color: "red" }}> Username cannot be empty </div>
                )}
              {
                <div style={{ color: "red" }}>
                  {" "}
                  {UsernameAlphanumericError}{" "}
                </div>
              }
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <label htmlFor="password" style={{ marginLeft: "5px" }}>
              Password
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <InputText
                id="password"
                type="password"
                style={{
                  width: isDesktop ? "25vw" : currentWidth - 35,
                  margin: isDesktop ? "0" : "auto",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => {
                  if (password.length === 0)
                    setPasswordErrorMessage("Password cannot be empty");
                  if (password.length > 0 && password.length < 4)
                    setPasswordErrorMessage(
                      "Password cannot be less than 4 characters"
                    );
                  if (password.length >= 4) setPasswordErrorMessage("");

                  let valid = checkComplexity(password);
                  if (!valid[0])
                    setPasswordAlphanumericError(
                      "Password should be alphanumeric. "
                    );
                  else setPasswordAlphanumericError("");
                }}
              />
              {!isPasswordValid && (
                <div style={{ color: "red" }}> {passwordErrorMessage} </div>
              )}
              {!isPasswordValid &&
                submitted &&
                passwordErrorMessage.length === 0 && (
                  <div style={{ color: "red" }}> Password cannot be empty </div>
                )}
              {
                <div style={{ color: "red" }}>
                  {" "}
                  {passwordAlphanumericError}{" "}
                </div>
              }
            </div>
          </div>
          <Button
            label="Login"
            icon="pi pi-user"
            className="w-10rem"
            onClick={handleLogin}
            style={{ margin: isDesktop ? "0" : "auto" }}
          />
          <Button
            label="Sign Up"
            icon="pi pi-user-plus"
            className="p-button-success w-10rem"
            onClick={(e) => navigate(`/register`)}
            style={{ margin: isDesktop ? "0" : "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
