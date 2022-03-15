import React from 'react';
import "./Suggestion.css"
import SuggList from './suggList';
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import {
  addcomment,
  getallcomment
} from "../../actions/suggestionAction";
import { useAlert } from "react-alert";

function Suggestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [commentText, setCommentText] = useState("")

  const { data } = useSelector((state) => state.allcomment);
  const data1= data.data;
  const data2= data1.data;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(commentText);
    try
    {
      dispatch(addcomment(commentText));
      setCommentText("");
      navigate("/students");

    }
    catch
    {
      alert.error("Error");
    }
  }
  useEffect(() => {
    // console.log("useEffect");
    try
    {
      dispatch(getallcomment());
    }
    catch(err)
    {
      console.log(err);
    }

  }, [dispatch]);
  return (
    <div className="container-fluid fixed">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">
          <div className="suggestion" >
            <div>
              <form id="myForm" onSubmit={handleSubmit} >


                <textarea
                  name="commentTextArea"
                  type="text"
                  rows="5"
                  className="form_control"
                  cols="100"
                  id="CommentsOrAdditionalInformation"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                >
                </textarea>
                <input type="submit" value="Submit" className="btn_submit" alt="submit Checkout" />

              </form>
            </div>
            <hr/>
            <h4 className="form_header">All comments goes here</h4>
            <div className="comment_section">
                  {
                    data2.map((item, index) => {
                      return <SuggList key={index} data={item}/>
                    })

                  }

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestion