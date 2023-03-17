import deleteitem from "../../../../assets/delete.svg";
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { deleteTemplate } from "../../../../redux/actions/GroupAction";

function TemplateShowComp(props){

    const dispatch = useDispatch();
    const [check , setCheck] = useState(0);
    const fd = new FormData();
    const navigate = useNavigate();    

function handleBack(){
    document.getElementById('askmenudiv3').style.display='none';
}
function handleConfirm(){
    var id = localStorage.getItem("templateId");
    fd.append("id" , id);
    dispatch(deleteTemplate(fd , setCheck , navigate));
    document.getElementById('askmenudiv3').style.display='none';
    document.getElementById(id).style.display='none';
}

function handleDelete(e){
 document.getElementById('askmenudiv3').style.display='block';
    setCheck(0);
    console.log(e.currentTarget.id)
    localStorage.setItem("templateId" , e.currentTarget.id);
    }
return(
<>
{/* <div id='fixer2'> */}
<div id='askmenudiv3'>
        <div id='logoutdiv'>
            <p >Do you really want to delete this template?</p>
            <button id='formbtn12' onClick={handleConfirm}>Yes</button>
            <p id='nobtn' onClick={handleBack}>No</p>
        </div>
    </div> 
    {/* </div> */}
<div id='center'>
<div className='template' id={props.id}>{props.name}<br></br>
<img src={deleteitem} id={props.id} onClick={handleDelete}></img>
</div>
</div>
</>
)
}
export default TemplateShowComp;