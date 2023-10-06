import React from "react";
import Modal from "react-modal";
import style from "./CustomModal.module.css"

const CustomModal = ({ isOpen, title,messages, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.customModal}
      overlayClassName={style.customModalOverlay}
      ariaHideApp={false} // Esto evita un error de accesibilidad
    >
      <div className={style.modalContent}>
        <h2>{title}</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <button onClick={onRequestClose} className={style.modalCloseButton}>Cerrar</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
