import React from "react";

const Secretitem = (props) => {
    const {secret} = props;

    return(
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">abcd</h5>
                    </div>
                    <p className="card-text">{secret.description}</p>
                </div>
            </div>
        </div>
    
    )
}

export default Secretitem;
