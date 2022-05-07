import React from 'react'
import { useSelector } from "react-redux";
function SentEmail({ ekobject }) {


  const { users } = useSelector((state) => state.allUsers);
  let obj = users.find(o => o.email === ekobject.email);

  console.log(obj);
  let date = new Date(ekobject.date);
  // console.log(date);
  let date1 = new Date(date);

  // console.log(date1);

  // console.log(date1.toGMTString());

  return (
    <>
      <td className="name">{obj.name}</td>
      <td>  {date1.getDay().toString() + "/" + date1.getMonth().toString() + "/" + date1.getFullYear().toString() + " " + date1.toLocaleTimeString()}</td>
    </>
  )
}

export default SentEmail