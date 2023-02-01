import DefualtLogo from "./DefualtLogo";
import Description from "./Description";
import DefulatLogin from "./DefualtLogin";
import MainLogo from "./MainLogo";
function DefaultPage({
  setLogInModal,
  setAuth,
  setMyBirthday,
  setMyEmail,
  setMyEmployNumber,
  setMyPhoneNumber,
  setPageIndex,
  setPasswordModal,
  setTestMode,
  setToken,
}) {
  setTestMode(false);
  setPageIndex(0);
  setAuth(0);
  setToken("");
  setMyEmployNumber("");
  setMyPhoneNumber("");
  setPasswordModal(false);
  setMyEmail("");
  setMyBirthday("");

  return (
    <div class="flex flex-col w-full space-y-4 my-[40px]">
      <MainLogo />
      <Description />
      <DefulatLogin setLogInModal={setLogInModal} />
      <DefualtLogo />
    </div>
  );
}

export default DefaultPage;
