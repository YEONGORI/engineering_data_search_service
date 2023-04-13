import axios from "axios"; //통신
import { useState } from "react";
import jwt_decode from "jwt-decode"; //보안
import { NavLink, useNavigate } from "react-router-dom";

function Login({
  setTestMode,
  setToken,
  setModalContent,
  setAuth,
  setMyEmployNumber,
  setLogInModal,
  setMyUserName,
}) {
  const navigate = useNavigate();
  const [inputEmployNumber, setInputEmployNumber] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const onChangeEmployNumber = (e) => {
    setInputEmployNumber(e.target.value);
  };
  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const test_login = () => {
    setTestMode(true);
    setAuth(1);
    setMyEmployNumber("1234567890");
    setMyUserName("테스트");
    setLogInModal(false);
  };
  const admin_test_login = () => {
    setTestMode(true);
    setAuth(2);
    setMyEmployNumber("1234567890");
    setMyUserName("테스트");
    setLogInModal(false);
  };
  const login = () => {
    axios
      .post(
        "http://localhost:8000/auth/login",
        {
          employNumber: inputEmployNumber,
          password: inputPassword,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setToken(res.data.access_token);
        console.log(res);
        navigate("/search");
        setMyEmployNumber(inputEmployNumber);
        setMyUserName(res.data.username);
        if (jwt_decode(res.data.access_token).adminkey) {
          setAuth(2);
        } else {
          setAuth(1);
        }
        setLogInModal(false);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorText("아이디와 비밀번호를 확인하세요.");
      });
  };

  return (
    <div class="mx-[40px]">
      <div class="h-[40px] text-center text-[55px] font-bold leading-[40px] m-[20px] mt-[40px] mb-[40px]">
        산학회
        <div></div>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">사번</div>
          <input
            onChange={onChangeEmployNumber}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="사번"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">비밀번호</div>
          <input
            onChange={onChangePassword}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div class="flex justify-between mt-[20px] mb-[20px]">
          <div
            class="text-[13px] text-gray-400 cursor-pointer hover:text-black hover:translate-y-[12px] duration-75"
            onClick={() => {
              setModalContent(1);
            }}
          >
            회원가입
          </div>
          <div
            class="text-[13px] text-gray-400 cursor-pointer hover:text-black hover:translate-y-[12px] duration-75"
            onClick={() => {
              setModalContent(2);
            }}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center mt-[20px] mb-[40px]">
        <div class=" text-red-600 text-center text-[15px] mb-[10px]">
          {errorText}
        </div>

        <button
          class="border w-full text-center text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 justify-center  cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            login();
          }}
        >
          LOG IN
        </button>
        <NavLink
          to="/search"
          onClick={() => {
            test_login();
          }}
        >
          <button class="border w-full text-center text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 justify-center  cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]">
            TEST LOG IN (일반사원)
          </button>
        </NavLink>
        <NavLink
          to="/search"
          onClick={() => {
            admin_test_login();
          }}
        >
          <button class="border w-full text-center text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 justify-center  cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]">
            TEST LOG IN (관리자)
          </button>
        </NavLink>
      </div>
    </div>
  );
  //text-center text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg cursor-pointer
}
export default Login;
