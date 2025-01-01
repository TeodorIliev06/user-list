import { useReducer } from "react";

const modalReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { type: action.modalType, payload: action.payload };
        case "CLOSE_MODAL":
            return null;
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
};

export const useModals = () => {
    const [modalState, dispatch] = useReducer(modalReducer, null);

    const openModal = (modalType, payload = null) => {
        dispatch({ type: "OPEN_MODAL", modalType, payload });
    };

    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" });
    };

    return { modalState, openModal, closeModal };
};
