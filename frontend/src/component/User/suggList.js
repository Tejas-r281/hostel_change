import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { like, dislike, commentDetails } from "../../actions/suggestionAction";
import { useDispatch, useSelector } from "react-redux";

function SuggList({ data1 }) {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.commentDetail);

  const details = useRef(null);
  const [likes,setlikes]=useState(data1.totallike);
    const [dislikes,setdislikes]=useState(data1.totaldislike);
  const likeButton = async(e) => {
    e.stopPropagation();
    // console.log(details.current.value);
    await dispatch(like(details.current.value));
    // dispatch(commentDetails(details.current.value));
    await dispatch(commentDetails(details.current.value)).then(()=>{
      setdislikes(data.dislike);
      setlikes(data.like);
    }).catch((err)=>{
      console.log(err);
    })


  };
  const dislikeButton = (e) => {
    e.stopPropagation();

    // console.log(details.current.value);
      dispatch(dislike(details.current.value));
      dispatch(commentDetails(details.current.value));

    setdislikes(data.dislike);
      setlikes(data.like);
  };
    useEffect(() => {

    }, [dispatch]);

  return (
    <div>
      <div>
        <span className="name">Raushan kumar</span> <span>15 march 2022</span>
      </div>
      <div>
        <p>{data1.comment}</p>
      </div>
      <div>
        <button
          ref={details}
          onClick={likeButton}
          value={data1._id}
          class="like"
        >
          <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
        </button>
        <span>{likes}</span>
        <button
          ref={details}
          onClick={dislikeButton}
          value={data1._id}
          class="dislike"
        >
          <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
        </button>
        <span>{dislikes}</span>
      </div>
    </div>
  );
}

export default SuggList;
