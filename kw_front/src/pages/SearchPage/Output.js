import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import cryptoJs from "crypto-js";
function Output({
  output,
  setOutput,
  highlightIndex,
  setDetailModal,
  setImage,
  setIndex,
  setTitle,
  setPath,
  setAuthor,
  setDate,
  setFileURL,
  deleteList,
  setDeleteList,
  setDeleteModal,
}) {
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "dwg-upload";

  //////////////////////////////////////////////////////////
  const highlightedText = (text, query) => {
    if (query !== "" && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, "gi"));

      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span class="font-bold text-violet-700 " key={index}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    }

    return text;
  };
  //////////////////////////////////////////////////////////

  const listitem = (filelist) => {
    const result = [];

    for (let i = 0; i < filelist.length; i++) {
      const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${filelist[i].mainCategory}${filelist[i].subCategory}/${filelist[i].title}`;
      ////////////////////////////////////////////////////////////////
      const decipher = cryptoJs.AES.decrypt(
        filelist[i].s3Url,
        cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_KEY),
        {
          iv: cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
          padding: cryptoJs.pad.Pkcs7,
          mode: cryptoJs.mode.CBC,
        }
      );
      const imgURL = decipher.toString(cryptoJs.enc.Utf8);
      ///////////////////////////////////////////////////////////////

      let indexlist = filelist[i].index.split("|");

      result.push(
        <div className=" flex flex-col  w-[22.5%] items-center h-[350px] ml-[2%] mt-[2%]  flex-nowrap  focus:outline-none focus:ring-8 focus:ring-[#f1f6fe] rounded-[6px] border">
          <input
            className="flex h-[10%] mr-[200px]"
            type="checkbox"
            onClick={(e) => {
              let delelte_element = {
                id: filelist[i].id,
                mainCategory: filelist[i].mainCategory,
                subCategory: filelist[i].subCategory,
                title: filelist[i].title,
                img: imgURL,
              };
              if (e.target.checked)
                setDeleteList((prev) => [...deleteList, delelte_element]);
              else if (!e.target.checked) {
                setDeleteList(
                  deleteList.filter((el) => el.id !== filelist[i].id)
                );
              }
            }}
          />
          <img
            className="h-[50%] border-b rounded-t-[6px]"
            src={
              imgURL
              /*filelist[i].fileimg*/
            }
          />

          <div className=" w-full  h-[10%] border-b text-[14px] break-all truncate ">
            제목: {highlightedText(filelist[i].title, highlightIndex)}
          </div>
          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  ">
            경로:{" "}
            {highlightedText(
              `${filelist[i].mainCategory}${filelist[i].subCategory}/${filelist[i].title}`,
              highlightIndex
            )}
          </div>
          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  ">
            작성자: {filelist[i].author}
          </div>
          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  ">
            작성날짜: {filelist[i].createdAt}
          </div>
          <div className=" w-full  h-[10%] border text-[14px] break-all truncate  ">
            인덱스: {highlightedText(indexlist.join(","), highlightIndex)}
          </div>
          <button
            className="flex justify-center w-full  h-[10%]  text-[14px] break-all truncate focus:ring-2 focus:ring-blue-700 hover:border-2 hover:border-blue-700 hover:text-blue-700"
            onClick={() => {
              setDetailModal(true);
              setImage(imgURL);
              setIndex(highlightedText(indexlist.join(","), highlightIndex));
              setTitle(highlightedText(filelist[i].title, highlightIndex));
              setPath(
                highlightedText(
                  `${filelist[i].mainCategory}${filelist[i].subCategory}/${filelist[i].title}`,
                  highlightIndex
                )
              );
              setAuthor(filelist[i].author);
              setDate(filelist[i].createdAt);
              setFileURL(fileURL);
            }}
          >
            자세히보기
          </button>
        </div>
      );
    }
    return result;
  };
  return (
    <div className="flex flex-row justify-center items-center w-full h-[60%] mt-5">
      <div className="flex flex-col justify-evenly items-center w-[8%] h-full border rounded-[6px] ">
        <div className="text-[20px] ">정렬기준</div>
        <div className="flex flex-row  ">
          <div className="">제목</div>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp />
          </button>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
        <div className="flex flex-row  ">
          <div className="">작성날짜</div>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              });
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp />
          </button>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              }).reverse();
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
        <div className="flex flex-row ">
          <div className="">경로</div>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                `${a.mainCategory}${a.subCategory}/${a.title}`.toLowerCase() <
                `${b.mainCategory}${b.subCategory}/${b.title}`.toLowerCase()
                  ? -1
                  : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp className="" />
          </button>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-4 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                `${a.mainCategory}${a.subCategory}/${a.title}`.toLowerCase() >
                `${b.mainCategory}${b.subCategory}/${b.title}`.toLowerCase()
                  ? -1
                  : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
        <div className="flex flex-row ">
          <button
            className="border w-[100px] h-[44px] focus:ring-2  focus:ring-blue-700 hover:border-2 hover:border-blue-700 hover:text-blue-700"
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="w-[2%]"></div>
      {output.length === 0 ? (
        <div className="flex flex-row justify-center items-center w-[60%] h-full border rounded-[6px] ">
          검색결과가 없습니다.
        </div>
      ) : (
        <div className="flex flex-row flex-wrap   items-center w-[60%] h-full border rounded-[6px] overflow-y-scroll ">
          {listitem(output)}
        </div>
      )}
    </div>
  );
}

export default Output;
