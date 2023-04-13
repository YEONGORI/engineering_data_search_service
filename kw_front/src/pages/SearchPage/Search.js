import axios from "axios";

function Search({
  searchIndex,
  setSearchIndex,
  setOutput,
  output,
  setHighlightIndex,
}) {
  const onchangesearchindex = (e) => {
    setSearchIndex(e.target.value);
  };
  const handleSubmit = (e) => {
    //로컬서버에 검색 인덱스 전달하는 함수
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    console.log("searchindex", searchIndex);

    e.preventDefault();

    setHighlightIndex(searchIndex);

    axios
      .get("http://localhost:8080/cad/data", {
        params: { searchText: searchIndex },
      })
      .then((res) => {
        console.log(res);

        setOutput(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[10%] pt-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center w-[30%]"
      >
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="검색어를 입력하세요."
          value={searchIndex}
          onChange={onchangesearchindex}
        />
        <input
          value="입력"
          type="submit"
          className="p-2 text-[#6c59ce] border-2 border-[#6c59ce] hover:border-[#e4e1f1] rounded-[6px] hover:text-white cursor-pointer hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 "
        />
      </form>
    </div>
  );
}
export default Search;
