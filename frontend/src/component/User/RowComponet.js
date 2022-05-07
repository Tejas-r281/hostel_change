import React from 'react'
import { Fragment,useRef,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

  import {sendEmails} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { USER_EMAIL_RESET } from "../../constants/userConstant.js";

function RowComponet({userss,index,setindex}) {
    // let index=1;
    // const [index,setIndex]=useState(0);
    // console.table(user);
    const dispatch = useDispatch();
    const alert = useAlert();
  const { user } = useSelector(
    (state) => state.user
  );

  let { sent, alreadysent,data
} = useSelector((state) => state.sendEmail);

  const { users } = useSelector((state) => state.allUsers);

    setindex(index+1);
    const Student=useRef(null);


    const Emailsend=()=>
    {

      const userindex=Student.current.attributes[1].nodeValue;
      const reciever = users[userindex];
      const sender= user;
      // console.log(reciever);
      // console.log(sender);
      if(reciever.change===false || sender.change===false||(reciever.hostel!==sender.nexthostel) || (sender.hostel!==reciever.nexthostel))
      {
        alert.error("This person is not valid match for you to send email");
        return;
      }

      dispatch(sendEmails(user.email,Student.current.value));
    }

    useEffect(()=>{

      if(index===1)
      {
        if (alreadysent) {
          alert.success(data.message);
          sent = false;
          dispatch({ type: USER_EMAIL_RESET });

        }
        if (sent) {
          alert.success("Successfully email sent");
          dispatch({ type: USER_EMAIL_RESET });
        }
      };
    }, [alreadysent, sent]);



  return (
    <Fragment>
      <tr>
        <th scope="row">{index+1}</th>

        <td>{userss.name}
          <button ref={Student} value={userss.email} index1={index} onClick={Emailsend} type="button" className="btn mx-2 btn-info">{sent?"Sent":"Send Request"}</button>
        </td>
        <td>
          <span className="studentYear">{userss.year}</span>/{userss.branch}
        </td>

        {userss.change === true ? (
          <td className="text-primary">YES</td>
        ) : (
          <td className="text-danger">NO</td>
        )}

        <td>{userss.hostel}</td>
        <td>{userss.nexthostel === 0 ? "Not applicable" : userss.nexthostel}</td>
      </tr>
    </Fragment>
  );
}

export default RowComponet