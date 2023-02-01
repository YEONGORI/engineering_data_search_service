import axios from "axios";
import { useEffect, useState } from "react";
import Mymodify from "./Mymodify";
import { useNavigate } from "react-router-dom";

function Authority({ auth }) {
  if (auth === 2) {
    return <div>관리자</div>;
  } else {
    return <div>일반사원</div>;
  }
}

function MyInform({
  testMode,
  setTestMode,
  token,
  setToken,
  auth,
  setAuth,
  myEmployNumber,
  myUserName,
  myPhoneNumber,
  myEmail,
  myBirthday,
  setMyPhoneNumber,
  setMyEmail,
  setMyBirthday,
}) {
  const [inputNewPassword_First, setInputNewPassword_First] = useState("");
  const [inputNewPassword_Second, setInputNewPassword_Second] = useState("");
  const [inputNewPhoneNumber, setInputNewPhoneNumber] = useState("");
  const [inputNewEmail, setInputNewEmail] = useState("");
  const [inputOldPassword, setInputOldPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  const onChangeNewPassword_First = (e) => {
    setInputNewPassword_First(e.target.value);
  };
  const onChangeNewPassword_Second = (e) => {
    setInputNewPassword_Second(e.target.value);
  };
  const onChangeNewPhoneNumber = (e) => {
    setInputNewPhoneNumber(e.target.value);
  };
  const onChangeNewEmail = (e) => {
    setInputNewEmail(e.target.value);
  };
  const onChangeOldPassword = (e) => {
    setInputOldPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌

    e.preventDefault();

    if (inputNewPassword_First !== inputNewPassword_Second) {
      setErrorText("신규 비밀번호가 일치하지 않습니다.");
    } else if (inputOldPassword === "") {
      setErrorText("이전 비밀번호를 입력하세요.");
    } else {
      return Mymodify(
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
      );
    }

    // 입력란에 있던 글씨 지워주기
  };

  useEffect(() => {
    if (testMode === true) {
      setMyPhoneNumber("테스트모드");
      setMyEmail("테스트모드");
      setMyBirthday("테스트모드");
    } else {
      axios
        .post(
          "http://localhost:8000/auth/detail",
          {
            employNumber: myEmployNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setMyPhoneNumber(res.data.userinform.phoneNumber);
          setMyEmail(res.data.userinform.email);
          setMyBirthday(res.data.userinform.birthday);
        })
        .catch((err) => {
          console.log(err.response);
          navigate("/"); // 토큰의 유효시간이 지나 유효하지 않거나 프론트에서 서버로 잘못된 토큰을 넘겨 주었을 시
        });
    }
  });

  return (
    <div className="flex flex-col w-full border">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row  h-[80px] text-2xl ml-3 mt-3">
          개인정보수정
        </div>
        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            이름
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            {myUserName}
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            사번
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            {myEmployNumber}
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            생년월일
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2 ">
            {myBirthday}
          </div>

          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            권한
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            <Authority auth={auth} />
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            e-mail
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              onChange={onChangeNewEmail}
              value={inputNewEmail}
              className="flex items-center border w-5/6 h-11/12 border-slate-300 justify-center placeholder:text-black"
              type="email"
              placeholder={myEmail}
            />
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            휴대폰
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              onChange={onChangeNewPhoneNumber}
              value={inputNewPhoneNumber}
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center placeholder:text-black"
              type="tel"
              placeholder={myPhoneNumber}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center ">
          <div className="mt-[15px] font-bold">비밀번호 변경 /&nbsp;</div>
          <div className="mt-[15px] font-bold text-[#ff0000]">
            비밀번호를 변경하고자 할 경우에만 입력하세요.
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            신규 비밀번호
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              onChange={onChangeNewPassword_First}
              value={inputNewPassword_First}
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center"
              type="password"
              placeholder="신규 비밀번호"
            />
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            비밀번호 확인
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              onChange={onChangeNewPassword_Second}
              value={inputNewPassword_Second}
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center ">
          <div className="mt-[15px] font-bold">
            정보 수정을 위해 이전 비밀번호를 입력하세요.
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-[#f1f6fe]">
            이전 비밀번호
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              onChange={onChangeOldPassword}
              value={inputOldPassword}
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center"
              type="password"
              placeholder="이전 비밀번호"
            />
          </div>
        </div>

        <div className="flex flex-row justify-end items-center h-[80px] pr-5">
          <div class=" text-[#ff0000] text-center text-[15px] mb-[10px] font-bold">
            {errorText}&nbsp;&nbsp;&nbsp;
          </div>
          <input
            value="제출"
            type="submit"
            className="border w-[100px] h-[50px]  text-[19px] text-center text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
export default MyInform;
