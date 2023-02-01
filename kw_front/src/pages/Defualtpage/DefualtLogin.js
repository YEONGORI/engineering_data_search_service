function DefulatLogin({ setLogInModal }) {
  return (
    <div>
      <div class="flex flex-row justify-center ">
        <button
          onClick={() => {
            setLogInModal(true);
          }}
          class="border w-[200px] h-[100px] text-white bg-[#6c59ce] hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 rounded shadow"
        >
          <div class="text-center text-[40px] font-bold">로그인</div>
        </button>
      </div>
    </div>
  );
}

export default DefulatLogin;

//text-center text-[55px] font-bold
