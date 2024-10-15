import React from 'react'
import { Link } from 'react-router-dom';

export default function UserView({data,hendleDeleteUser,password}) {

  return (
    <div>
       <div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >       
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-dark">
              <div className="modal-header d-flex justify-content-between">   
              <div className='d-flex'> 
              {data.image? <img width={50} height={50} src={data.image} alt="chetan" />:<img width={50} src="https://static.vecteezy.com/system/resources/previews/045/711/185/non_2x/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg" alt="" />}
                  
                  <div className="modal-title ps-2 d-flex justify-content-center" id="">
                    <p className=' fs-5 fw-bold'>{data.name}</p>
                     {data.status?<p className=' text-success fw-bold p-2' style={{fontSize:'12px'}}>Active</p>:<p  className=' text-danger-emphasis fw-bold p-2'  style={{fontSize:'12px'}}>Deactive</p>}
                  </div>  
                </div>
                <div>
                    <Link
                    data-bs-toggle="modal" data-bs-target="#exampleModal2" 
                      className="text-right"
                    >
                    <span class="fa-stack ">
                        <i class="fa fa-square fa-stack-2x "></i>
                        <i class="fa fa-eye fa-stack-1x fa-inverse "></i>
                      </span>
                    </Link>
                    <Link 
                    // onClick={()=>{setView(item)}}
                     className="table-link text-info " data-bs-toggle="modal" data-bs-target="#exampleModal1" >
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x" />
                        <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                      </span>
                    </Link>
                    <Link
                     onClick={()=>{hendleDeleteUser(data._id)}}
                       data-bs-dismiss="modal"
                      class="table-link danger">
                      <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-trash-can fa-stack-1x fa-inverse"></i>
                      </span>
                    </Link>
                </div>
                
              </div>
              <div className="modal-body ">
                <div className=''>
                <p className=' d-flex justify-content-between'><strong>Email:</strong> {data.email}</p>
                <p className=' d-flex justify-content-between'><strong>Password:</strong> {password}</p>
            {/* <p><strong>Contact:</strong> {data.contact}</p> */}
            {/* <p className=' d-flex justify-conte nt-between'><strong>Password:</strong> </p> */}
            {data.updatedAt?
            <p className=' d-flex justify-content-between'><strong>Last Login Date:</strong>{data.updatedAt.slice(0,10) } {data.updatedAt.slice(11,19)}</p>:''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
