import React , {useState , useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {GET_REQUESTS , APPROVE_REQUEST} from '../../../redux/actions/requestAction'
import {DELETE_DOCTOR} from '../../../redux/actions/doctorAction'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css"

const ManageRequest = () => {

  useEffect(()=>{
    AOS.init({
        duration : 2000
    });
})
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_REQUESTS())
      },[dispatch])
    
      const { requests } = useSelector(state => state.requests)

    return(
    <div>
        <div className="container" style={{marginTop:'70px'}}>
        <h1 style={{textAlign:"center"}} className="pagetitle" data-aos="fade-right">All Request</h1>
        <hr className="titlehr" size="20" data-aos="fade-right" />
        
        {requests?.length > 0 ?
        <table className="managerequesttable">
        <thead className="bg-info">
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Doctor specialization</th>
            <th>Approve</th>
            <th>Reject</th>
        </thead>
        <tbody>
        {requests && requests.map(doctor => (
              <tr key={doctor.Name}>
              <td data-label="doctor Name"><a href={`/request/${doctor._id}`}>{doctor.name}</a></td>
              <td data-label="request's created at">{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(doctor.createdAt))}</td>
            <td data-label="doctor specialization">{doctor.specialization}</td>
              <td data-label="Approve the requst">
              <form>
                <button className="btn btn-success text-white" onClick={() => dispatch(APPROVE_REQUEST(doctor._id))} ><i className="fas fa-thumbs-up"></i></button> 
              </form> 
              </td>
              <td data-label="Reject the request">
              <form>
                <button className="btn btn-danger text-white" onClick={() => dispatch(DELETE_DOCTOR(doctor._id))}><i className="fas fa-times-circle"></i></button>    
              </form>           
              </td>
              </tr>
           ))}
        </tbody> 
        </table>
        : <div style={{textAlign:'center'}}><h2>there's no request added yet</h2></div>}
        </div>
    </div>
    )
}

export default ManageRequest;