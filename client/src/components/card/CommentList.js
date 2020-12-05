import React, { useState } from 'react'
import moment from 'moment';
import { MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import { useSelector } from 'react-redux';
import '../../styles/comments.css'

export default function CommentList(props) {
    const {comment} = props
    const user = useSelector(state => state.user)
    const [commentEdit, setCommentEdit] = useState(comment.content)
    const [modalForComment, setModalForComment] = useState(false);

    const toggleForComment = (comment) => {
        if(user.loginInfo.id === comment.UserId){
            setModalForComment(!modalForComment);
        }else{
            alert("It's not your comments")
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
           alert("It's not your comment")
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
           alert("this is not your comment")
        }
            
                

            
    }
    return (
        <MDBRow>
            <div className="md-12"><MDBIcon icon="user-circle" /> <span className="user-name">{comment.User.firstName} {comment.User.lastName}</span> . <span className="comment-time">{moment(comment.createdAt).fromNow()}</span> <br/>
            
            <span className="comment-content">{comment.content}</span>
            
            <br/>
            
            <button className="comments-icon icon" onClick={ () => removeComment(comment)}><MDBIcon icon="trash-alt red-text" /> Delete</button> 
            
            <button className="comments-icon indigo-text icon"  onClick={()=>toggleForComment(comment)}><MDBIcon icon="edit" />Edit</button><hr /></div> 
                                <MDBModal isOpen={modalForComment} toggle={toggleForComment}>
                                <MDBModalHeader toggle={()=>toggleForComment(comment)}>Privacy Measures</MDBModalHeader>
                                <MDBModalBody>
                                <form>
                                    <input id="edit" type="text" value={commentEdit} onChange={(e) => {setCommentEdit(e.target.value)}}/>

                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <button onClick={ () => editComment(comment)} form="edit">Save</button>
                                <button className='btn btn-primary' onClick={toggleClose}>Close</button>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBRow>
    )
}
