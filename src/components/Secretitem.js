import React from "react";

const Secretitem = (props) => {
    const {secret, index} = props;

    return(
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">Secret {index+1}</h5>
                    </div>
                    <p className="card-text">{secret.description}</p>
                </div>
            </div>
        </div>
    
    )
}

export default Secretitem;
