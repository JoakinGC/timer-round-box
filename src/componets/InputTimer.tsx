

const InputTimer = ({setPropsTimer,propsTimer}:{setPropsTimer:any,propsTimer:any}) =>{

    
    return(
        <>
            <input 
                type="number" 
                placeholder="Seconds"
                min="0"
                max="60"
                onChange={(e) => setPropsTimer({...propsTimer,seconds:parseInt(e.target.value)})}
            />
            <input 
                type="number"
                placeholder="Minutes"
                min="0"
                max="60"
                onChange={(e) => setPropsTimer({...propsTimer,minutes:(parseInt(e.target.value))})}
            />
            <input 
                type="number" 
                placeholder="Hours"
                onChange={(e) => setPropsTimer({...propsTimer,hours:(parseInt(e.target.value))})}
            />
        </>
    )
}

export default InputTimer;