import React from 'react'

function Filterbox({value}) {
    var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById("myInput");
    filter = value.toUpperCase();
    li = document.getElementsByClassName("studentYear");
    // li = ul.getElementsByTagName("li");
    console.log(li);
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

  return (
    <div>Filterbox</div>
  )
}

export default Filterbox