import React, { useState, useEffect } from "react";
import MemberServices from "../services/MemberServices";

const Member = props => {
    const initialMemberState = {
        id: null,
        name: "",
        teamName: "",
        birthYear: "",
        injury: false
    }
    const [currentMember, setCurrentMember] = useState(initialMemberState)
    const [message, setMessage] = useState("")

    const getMember = id => {
        MemberServices.get(id)
            .then(res =>{
                setCurrentMember(res.data)
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    useEffect(()=>{
        getMember(props.match.params.id)
    }, [props.match.params.id])

    const handleInputChange = event =>{
        const { name, value }=event.target
        setCurrentMember({ ...currentMember, [name]: value})
    }

    const updateInury = status =>{
        const data = {
            id: currentMember.id,
            name: currentMember.name,
            teamName: currentMember.teamName,
            birthYear: currentMember.birthYear,
            injury: status
        }

        MemberServices.update(currentMember.id, data)
            .then(res=>{
                setCurrentMember({ ...currentMember, injury: status })
                console.log(res.data);
                setMessage("the status was updated successfully ")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const updateMember=()=>{
        MemberServices.update(currentMember.id, currentMember)
            .then(res=>{
                console.log(res.data);
                setMessage("member was updated successfully")
                props.history.push("/members")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const deleteMember =()=>{
        MemberServices.remove(currentMember.id)
            .then(res=> {
                console.log(res.data);
                props.history.push("/members")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    
    return(
        <div>
            {currentMember ? (
                <div className="edit-form">
                    <h4>Member</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                            type="text" 
                            className="form-control"
                            id="name"
                            name="name"
                            value={currentMember.name}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="teamName">Team Name</label>
                            <input 
                            type="text" 
                            className="form-control"
                            id="teamName"
                            name="teamName"
                            value={currentMember.teamName}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="birthYear">Birth Year</label>
                            <input 
                            type="text" 
                            className="form-control"
                            id="birthYear"
                            name="birthYear"
                            value={currentMember.birthYear}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentMember.injury ? "Ready" : "Injured"}
                        </div>
                    </form>

                    {currentMember.injury ? (
                        <button 
                        className="btn btn-warning btn-sm"
                        onClick={()=>updateInury(false)}
                        >
                            Got Injured
                        </button>
                    ) : (
                        <button 
                        className="btn btn-success btn-sm"
                        onClick={()=>updateInury(true)}
                        >
                            Now Ready
                        </button>
                    )}
                    <br />
                    <br />

                    <button 
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={updateMember}
                    >
                        Update
                    </button>

                    <button 
                    className="btn btn-danger btn-sm"
                    onClick={deleteMember}
                    >
                        Delete
                    </button>
                    <p>{message}</p>
                </div>
            ):(
                <div>
                    <br />
                    <p>Please click on a member</p>
                </div>
            )}
        </div>
    )
}

export default Member;