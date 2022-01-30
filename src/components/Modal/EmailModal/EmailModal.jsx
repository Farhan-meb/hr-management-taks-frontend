import "./EmailModal.scss";

const EmailModal = ({ setShowModal }) => {
    const handleCancel = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="modal-container">
            <div className="delete-container text-center">
                <span>Are you sure to delete this ?</span>
                <div className="btn-wrapper flex align-center gap-20 jc-center mt-20">
                    <button
                        className="cancel-btn btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="confirm-btn btn"
                        //onClick={() => handleDeleteCampaign(sdlSku)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
