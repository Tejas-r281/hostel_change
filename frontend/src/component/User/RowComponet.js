import React from 'react'
import { Fragment } from 'react'

function RowComponet({user,index,setindex}) {
    // let index=1;
    // const [index,setIndex]=useState(0);
    // console.table(user);

    setindex(index+1);

  return (
    <Fragment>
      <tr>
        <th scope="row">{index+1}</th>

        <td>{user.name}</td>
        <td>
          {user.year}/{user.branch}
        </td>

        {user.change === true ? (
          <td className="text-primary">YES</td>
        ) : (
          <td className="text-danger">NO</td>
        )}

        <td>{user.hostel}</td>
        <td>{user.nexthostel === 0 ? "Not applicable" : user.nexthostel}</td>
      </tr>
    </Fragment>
  );
}

export default RowComponet