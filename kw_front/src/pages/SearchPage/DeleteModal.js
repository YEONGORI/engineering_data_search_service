import { useRef, useState } from "react";
import Delete from "./Delete";
function DeleteModal({ deleteModal, setDeleteModal, auth, deleteList }) {
  const ModalBG = useRef();
  return (
    <div className="z-30 w-full fixed text-5xl ">
      {deleteModal ? (
        <div
          class="background"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setDeleteModal(false);
            }
          }}
        >
          <div className="z-25 w-1/3 h-[200px] bg-white fixed left-1/3 top-1/3 p-2.5 text-lg">
            <Delete auth={auth} deleteList={deleteList} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DeleteModal;
