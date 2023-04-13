import { useState } from "react";
import axios from "axios";
function Delete({ auth, deleteList }) {
  console.log("deleteList", deleteList);
  const [errorText, setErrorText] = useState("");
  const check = () => {
    if (deleteList.length === 0) {
      setErrorText("삭제할 데이터가 없습니다.");
    } else if (auth !== 2) {
      setErrorText("관리자 권한이 아닙니다.");
    } else {
      axios
        .post(
          "백서버 URL",
          { deleteList: deleteList },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row font-bold text-3xl pl-5 pt-3 pb-2">
        주의!
      </div>
      <div className="pb-2 pl-2">
        체크하신 데이터를 정말 삭제하시겠습니까? 삭제를 원하실 경우 아래의
        버튼을 클릭하세요.
      </div>

      <div className="flex flex-row justify-end items-center h-[80px] pr-5">
        <div class=" text-[#ff0000] text-center text-[15px] mb-[10px] font-bold">
          {errorText}&nbsp;&nbsp;&nbsp;
        </div>
        <button
          className="border  w-[100px] h-[40px]  text-[16px] text-center text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg"
          onClick={() => {
            check();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default Delete;
