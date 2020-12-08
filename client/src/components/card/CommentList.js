import React, { useState } from 'react'
import moment from 'moment';
import { MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow, MDBPageItem, MDBPagination, MDBPageNav  } from 'mdbreact';
import { useSelector } from 'react-redux';
import '../../styles/comments.css'
import userPic from '../../images/user.jpg'

export default function CommentList(props) {
    const {comment} = props
    const user = useSelector(state => state.user)
    const [commentEdit, setCommentEdit] = useState(comment.content)
    const [modalForComment, setModalForComment] = useState(false);

    const toggleForComment = (comment) => {
        if(user.loginInfo.id === comment.UserId){
            setModalForComment(!modalForComment);
        }else{
            alert("It's not your comment.")
        }

    }
    const toggleClose = () =>{
        setModalForComment(false)
    }
    const editComment = (comment) =>{
        if(user.loginInfo.id === comment.UserId){
            fetch(`/api/v1/comments/${comment.id}`,{
                method: "PATCH",
                body:JSON.stringify({
                    content: commentEdit
                }),
                headers: {
                    'Content-type': 'application/json'
                    }
            })
            .then(res=>res.json())
            .then(res=>{
                props.loadComments()
                setModalForComment(false)
            })
        }else{
           alert("It's not your comment.")
        }
    }

    const removeComment = (comment) =>{
        if(user.loginInfo.id === comment.UserId){
            fetch(`/api/v1/comments/${comment.id}`,{
                method: "DELETE",
            })
            .then(res=>res.json())
            .then(res=>{
                props.loadComments()
            })
        }else{
           alert("It's not your comment.")
        }
            
                

            
    }
    return (
        <MDBContainer>

        <div className="d-md-flex mt-4 image-plus-name">
          <img className="card-img-64 d-flex  mb-3" src={userPic} alt="" />
          <div body className="text-md-left ml-md-3 ml-2">

          <h5 className="font-weight-bold mt-0 full-name-comments">
          {comment.User.firstName} {comment.User.lastName}<MDBIcon icon="reply" className="pull-right ml-2" />
            </h5>
            {comment.content}

            <div className="delete-edit"><span className="comment-time">{moment(comment.createdAt).fromNow()}</span> . 
            
            <button className="comments-icon icon" onClick={ () => removeComment(comment)}><MDBIcon icon="trash-alt red-text" /> delete</button>  
            
            <button className="comments-icon icon"  onClick={()=>toggleForComment(comment)}><MDBIcon icon="edit indigo-text" /> edit</button></div>
            <MDBModal isOpen={modalForComment} toggle={toggleForComment}>

                                <MDBModalHeader toggle={()=>toggleForComment(comment)}>Edit your comment</MDBModalHeader>
                                <MDBModalBody>
                                <form className="form-modal-comments">
                                <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
                </span>
            </div>
            <textarea className="form-control" id="edit" rows="5" value={commentEdit} onChange={(e) => {setCommentEdit(e.target.value)}}></textarea>
        </div>

                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <button className='btn btn-primary' onClick={toggleClose}>Close</button>
                                <button className="btn btn-success"  onClick={ () => editComment(comment)} form="edit">Save changes</button>
                            </MDBModalFooter>
                        </MDBModal>

                          </div>

                    </div>
                <hr />
        
        </MDBContainer>
    )
}
