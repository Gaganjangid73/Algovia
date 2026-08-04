function primarybtn( {text, icon, className, onClick }){
    return(
        <button className={className} onClick={onClick}>{text} {icon}</button>
    )
}

export default primarybtn;