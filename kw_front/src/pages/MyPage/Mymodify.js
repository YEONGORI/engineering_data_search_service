import axios from "axios";
function Mymodify(
  testMode,
  setTestMode,
  token,
  setToken,
  setAuth,
  myEmployNumber,
  myUserName,
  myPhoneNumber,
  myEmail,
  myBirthday,
  inputNewEmail,
  inputNewPassword_Second,
  inputNewPhoneNumber,
  inputOldPassword,
  setErrorText
) {
  if (testMode === true) {
    setAuth(0);
    setToken("");
    setTestMode(false);
  } else {
    axios
      .post(
        "http://localhost:8000/auth/modify",
        {
          employNumber: myEmployNumber,
          password: inputOldPassword,
          username: myUserName,
          phoneNumber: myPhoneNumber,
          email: myEmail,
          birthday: myBirthday,
          newPassword: inputNewPassword_Second,
          newPhoneNumber: inputNewPhoneNumber,
          newEmail: inputNewEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //로그아웃
        console.log(res);
        setAuth(0);
        setToken("");
        setTestMode(false);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorText("이전 비밀번호를 확인하세요.");
      });
  }
}

export default Mymodify;
