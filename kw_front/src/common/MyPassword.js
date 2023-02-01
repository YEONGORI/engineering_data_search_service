import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPassword({ myEmployNumber, setPasswordModal, token }) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const test_check = () => {
    navigate("/profile");
    setPasswordModal(false);
  };
  const check = () => {
    axios
      .post(
        "http://localhost:8000/auth/check",
        {
          employNumber: myEmployNumber,
          password: inputPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/profile");
        setPasswordModal(false);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorText("비밀번호를 확인하세요.");
      });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row font-bold text-3xl pl-5 pt-3 pb-2">
        개인정보 확인
      </div>
      <div className="pb-2 pl-2">
        개인정보를 확인하기 위해서 비밀번호를 다시한번 입력해 주세요.
      </div>
      <input
        type="password"
        className="flex border border-slate-300 h-[40px] pl-2 mb-3"
        placeholder="현재 비밀번호"
        onChange={onChangePassword}
      />
      <div class=" flex flex-col justify-center ">
        <div class=" text-red-600 text-center text-[15px] ">{errorText}</div>
        <button
          className="border  w-[100px] h-[40px]  text-[16px] text-center text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg"
          onClick={() => {
            check();
          }}
        >
          확인
        </button>
        <button
          className="border mt-[10px] w-[100px] h-[40px]  text-[16px] text-center text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg"
          onClick={() => {
            test_check();
          }}
        >
          test
        </button>
      </div>
    </div>
  );
}

export default MyPassword;
