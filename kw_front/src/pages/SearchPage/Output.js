import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Output({ output, setOutput }) {
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "dwg-upload";

  const listitem = (filelist) => {
    const result = [];

    for (let i = 0; i < filelist.length; i++) {
      const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${filelist[i].mainCategory}${filelist[i].subCategory}/${filelist[i].title}`;
      const imgURL = filelist[i].s3Url;

      result.push(
        <a
          href={fileURL}
          className=" flex flex-col  w-[22.5%] items-center h-[300px] ml-[2%] mt-[2%]  flex-nowrap  focus:outline-none focus:ring-8 focus:ring-[#f1f6fe] rounded-[6px] border "
          download
        >
          <img
            className="h-[60%] border-b rounded-t-[6px]"
            src={
              imgURL
              /*filelist[i].fileimg*/
            }
          />
          <div className=" w-full  h-[10%] border-b text-[14px] break-all truncate hover:z-10 hover:overflow-y-auto hover:whitespace-normal hover:h-[40%] hover:border hover:border-black">
            제목: {filelist[i].title}
          </div>
          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  hover:z-10 hover:overflow-y-auto hover:whitespace-normal hover:h-[40%] hover:border hover:border-black">
            경로:{" "}
            {`${filelist[i].mainCategory}${filelist[i].subCategory}/${filelist[i].title}`}
          </div>

          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  hover:z-10 hover:overflow-y-auto hover:whitespace-normal hover:h-[40%] hover:border hover:border-black">
            작성자: {filelist[i].author}
          </div>
          <div className=" w-full h-[10%] border-b text-[14px] break-all truncate  hover:z-10 hover:overflow-y-auto hover:whitespace-normal hover:h-[40%] hover:border hover:border-black">
            수정날짜: {filelist[i].createdAt}
          </div>
        </a>
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
                new Date(a.createdAt).getTime() <
                new Date(b.createdAt).getTime()
                  ? -1
                  : 1;
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
                new Date(a.createdAt).getTime() >
                new Date(b.createdAt).getTime()
                  ? -1
                  : 1;
              });
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
