


function Button({
	diff,difficultyLevel,
	setDifficultyLevel
}){

	return(
		<button 
		onClick={()=>{
			setDifficultyLevel(diff)
		}}
		className={`diff-btn`} style={{
			backgroundColor:diff === difficultyLevel ? 
			'blue' : 
			'rgba(0,0,0,0.3)'
		}} >
			{diff}
		</button>
	)
}

export default Button;