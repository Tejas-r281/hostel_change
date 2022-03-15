import React from 'react'

function suggList({data}) {

  return (
    <div>
          <div>
              <span className="name">Raushan kumar</span> <span>15 march 2022</span>
          </div>
          <div>
              <p>
                 {data.comment}
              </p>
          </div>
          <div>

              <button class="like">
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              </button>
              <span>5</span>
              <button class="dislike">
                  <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
              </button>
              <span>6</span>
          </div>
    </div>
  )
}

export default suggList