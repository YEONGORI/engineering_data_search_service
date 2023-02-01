import { useRef, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import MyPassword from "./MyPassword";
import FindPassword from "./FindPassword";

function Modal({
  setTestMode,
  token,
  setToken,
  setAuth,
  logInModal,
  setLogInModal,
  passwordModal,
  setPasswordModal,
  myEmployNumber,
  setMyEmployNumber,
  setPageIndex,
  setMyUserName,
}) {
  const [modalContent, setModalContent] = useState(0);
  const ModalBG = useRef();
  return (
    <div className="z-30 w-full fixed text-5xl ">
      {logInModal ? (
        <div
          class="background"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setLogInModal(false);
            }
          }}
        >
          <div className="z-25 w-1/3 bg-white fixed left-1/3 top-1/4 p-2.5 text-lg ">
            {modalContent === 0 ? (
              <Login
                setTestMode={setTestMode}
                setToken={setToken}
                setModalContent={setModalContent}
                setAuth={setAuth}
                setMyEmployNumber={setMyEmployNumber}
                setLogInModal={setLogInModal}
                setMyUserName={setMyUserName}
              />
            ) : modalContent === 1 ? (
              <Register setModalContent={setModalContent} />
            ) : (
              <FindPassword setModalContent={setModalContent} />
            )}
          </div>
        </div>
      ) : null}
      {passwordModal ? (
        <div
          class="background"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setPasswordModal(false);
              setPageIndex(3);
            }
          }}
        >
          <div className="z-25 w-1/3 bg-white fixed left-1/3 top-1/4 p-2.5 text-lg ">
            <MyPassword
              myEmployNumber={myEmployNumber}
              setPasswordModal={setPasswordModal}
              token={token}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
