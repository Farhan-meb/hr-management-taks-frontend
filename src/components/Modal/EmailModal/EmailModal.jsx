import CancelIcon from "../_icons/CancelIcon";
import Loader from "../../Loader/Loader";

import "./EmailModal.scss";

const EmailModal = ({
    setShowModal,
    setEmailSubject,
    setEmailBody,
    handleSendEmail,
    loader,
}) => {
    const handleCancel = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="modal-container">
            <div className="email-container">
                <div className="modal-header">
                    <button className="cancel-btn" onClick={handleCancel}>
                        <CancelIcon />
                    </button>
                </div>
                <div className="modal-body">
                    <form
                        className="send-email-form"
                        onSubmit={handleSendEmail}
                    >
                        <div className="form-control">
                            <div className="form-field-subject">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Subject"
                                    onChange={(e) =>
                                        setEmailSubject(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="form-field-body">
                                <textarea
                                    className="input"
                                    type="text"
                                    placeholder="Write your email..."
                                    onChange={(e) =>
                                        setEmailBody(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-action">
                            <button
                                type="submit"
                                className={loader ? "btn-loader" : "form-btn"}
                            >
                                {loader ? (
                                    <Loader width={2} height={2} />
                                ) : (
                                    "Send"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
