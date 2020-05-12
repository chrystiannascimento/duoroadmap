import React, {Fragment, useState, Children} from "react"

const EditTheme = ({idmodal, icone,  headerText, buttonAction, children, actionButton, actionText}) => {

    //edit theme name function
  
    return <Fragment>
        <button 
            type="button" 
            data-toggle="modal" 
            data-target={`#id${idmodal}`}
            onClick={buttonAction}
            >
               {icone}
            </button>
  
        <div class="modal" id={`id${idmodal}`}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{headerText}</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        {children}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning btn-lg btn-block"  onClick={actionButton} data-dismiss="modal">{actionText}</button>        
                    </div>
                </div>
            </div>
        </div>

    </Fragment>;
}

export default EditTheme;