const generaMessage = (text)=>{
    return {
        text,
        createdAt: new Date().getTime()
    }
}

module.exports ={
    generaMessage
}