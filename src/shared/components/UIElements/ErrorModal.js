import React from "react";

import Model from "./Model";
import Button from "../FormElements/Button";

const ErrorModal = props => {
    return(
        <Model
        onCancel={props.onClear}
        header="an Error Occurred!"
        show={!!props.error}
        footer={<Button onClick ={props.onClear}>Okay</Button>}
        >
            <p>{props.error}</p>
        </Model>
    );
};

export default ErrorModal;