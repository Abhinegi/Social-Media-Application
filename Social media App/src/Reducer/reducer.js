 const Reducer=(state = { 
    isPostAdded:false,
    profile:{}
}, action)=>{

    if(action.type==="SETPOSTADDED")
    {
        return {
            ...state,
            isPostAdded:true
        }
    }

    if(action.type==='RESETPOSTADDED')
    {
        return {
            ...state,
            isPostAdded:false
        }
    }

    if(action.type=="Profile")
    {
        return {
            ...state,
            profile:{...action.payload},
        }
    }

    return state;

}

export default Reducer;