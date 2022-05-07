import React from 'react'
import { useSelector} from "react-redux";
import MakeRow from './MakeRow.js'

function ShowAll() {


    const { users } = useSelector((state) => state.allUsers);
    return (
        <div className="container-fluid fixed ">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <table className="table">
                        <thead className="table-light">
                            <tr>

                                <th scope="col">Name  </th>

                                <th scope="col">Year/branch</th>
                                <th scope="col"> change ?</th>

                                <th scope="col">Alloted</th>
                                <th scope="col">Excepted</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                // setindex(index+1)

                                <MakeRow users={user}  key={index} />
                                // <button ref={Student} value={users.email} onClick={Emailsend} type="button" className="btn mx-2 btn-info">Send Request</button>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowAll