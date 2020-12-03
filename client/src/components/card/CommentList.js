import React, { useState } from 'react'
import moment from 'moment';
import { MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { useSelector } from 'react-redux';

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
        <div>
            <h6>💬{comment.User.firstName} {comment.User.lastName}: {comment.content} ({moment(comment.createdAt).fromNow()}) <button onClick={ () => removeComment(comment)}>🚮</button><button onClick={()=>toggleForComment(comment)}>𝌡</button></h6>
                                <MDBModal isOpen={modalForComment} toggle={toggleForComment}>
                                <MDBModalHeader toggle={()=>toggleForComment(comment)}>Privacy Measures</MDBModalHeader>
                                <MDBModalBody>
                                <form>
                                    <input id="edit" type="text" value={commentEdit} onChange={(e) => {setCommentEdit(e.target.value)}}/>

                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <button onClick={ () => editComment(comment)} form="edit">Save</button>
                                <button className='btn btn-primary' onClick={toggleForComment}>Close</button>
                            </MDBModalFooter>
                        </MDBModal>
        </div>
    )
}
