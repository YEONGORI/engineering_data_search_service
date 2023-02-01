import axios from "axios";
import { useState } from "react";

function Register({ setModalContent }) {
  const [inputEmployNumber, setInputEmployNumber] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBirthday, setInputBirthday] = useState("");
  const [inputAdminKey, setInputAdminKey] = useState("");

  const [errorText, setErrorText] = useState("");

  const onChangeEmployNumber = (e) => {
    setInputEmployNumber(e.target.value);
  };
  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };
  const onChangeUsername = (e) => {
    setInputUserName(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setInputPhoneNumber(e.target.value);
  };
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangeBirthday = (e) => {
    setInputBirthday(e.target.value);
  };
  const onChangeAdminKey = (e) => {
    setInputAdminKey(e.target.value);
  };

  const regist = () => {
    axios
      .post(
        "http://localhost:8000/auth/register", //DB 프로젝트에서 가져옴
        {
          employNumber: inputEmployNumber,
          password: inputPassword,
          username: inputUserName,
          phoneNumber: inputPhoneNumber,
          email: inputEmail,
          birthday: inputBirthday,
          adminkey: inputAdminKey,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);

        setModalContent(0);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorText("회원가입 정보를 확인해주세요.");
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
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">한글이름</div>
          <input
            onChange={onChangeUsername}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="한글이름"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">휴대폰</div>
          <input
            onChange={onChangePhoneNumber}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="tel"
            placeholder="예)010-1234-5678"
            required
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">e-mail</div>
          <input
            onChange={onChangeEmail}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="email"
            placeholder="예)kwangwoon@kw.ac.kr"
            required
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">생년월일</div>
          <input
            onChange={onChangeBirthday}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="date"
            placeholder="생년월일"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">관리자권한</div>
          <input
            onChange={onChangeAdminKey}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="number"
            placeholder="관리자 권한을 원하시면 인증키를 입력하세요"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center mt-[20px] mb-[40px]">
        <div class=" text-red-600 text-center text-[15px] mb-[10px]">
          {errorText}
        </div>
        <button
          class="border w-full text-center text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 justify-center  cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            regist();
          }}
        >
          REGISTER
        </button>
        <button
          class="w-full text-center text-black bg-white cursor-pointer border-solid border-[1px] border-black text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            setModalContent(0);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default Register;
