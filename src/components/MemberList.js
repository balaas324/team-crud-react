import React, { useState, useEffect, useMemo, useRef } from "react"
import MemberService from "../services/MemberServices"
import { useTable } from "react-table"

const MemberList =(props)=>{
    const [members, setMembers] = useState([])
    const [searchName, setSearchName] = useState("")
    const membersRef = useRef();

    membersRef.current = members

    useEffect(()=>{
        retrieveMembers()
    }, [])

    const onChangeSearchName = (e) =>{
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const retrieveMembers =()=>{
        MemberService.getAll()
            .then((res)=>{
                setMembers(res.data)
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const refreshList =()=>{
        retrieveMembers()
    }

    const findByTitle =()=>{
        MemberService.findByTitle(searchName)
            .then((res)=>{
                setMembers(res.data)
                setSearchName("")
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const openMember = (rowIndex)=>{
        const id = membersRef.current[rowIndex].id;

        props.history.push("/member/" + id)
    }

    const deleteMember =(rowIndex)=>{
        const id = membersRef.current[rowIndex].id;

        MemberService.remove(id)
            .then((res)=>{
                props.history.push("/members")

                let newMembers = [...membersRef.current]
                newMembers.splice(rowIndex, 1)

                setMembers(newMembers)
                console.log(res.data);
                refreshList();
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const columns = useMemo(
        ()=>[
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Team Name",
                accessor: "teamName"
            },
            {
                Header: "Birth Year",
                accessor: "birthYear"
            },
            {
                Header: "Injury",
                accessor: "injury",
                Cell: (props)=>{
                    return props.value ? "Ready" : "Injured"
                }
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props)=>{
                    const rowIdx = props.row.id
                    return (
                        <div>
                            <span onClick={()=>openMember(rowIdx)}>
                                <i className="far fa-edit action mr-2"></i>
                            </span>
                            <span onClick={()=>deleteMember(rowIdx)}>
                                <i className="fas fa-trash action"></i>
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data: members
    })
    
    return (
        <div className="list row"> 
        <h4>All members</h4>
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control"
                    placeholder="search by name"
                    value={searchName}
                    onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>  
            <div className="col-md-12 list">
                <table 
                className="table table-striped table-bordered"
                {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i)=>{
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell)=>{
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default MemberList