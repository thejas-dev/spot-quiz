


function LangComponent({
	lang,loadQuiz
}){

	return (
		<div 
		onClick={()=>{
			loadQuiz(lang.title)
		}}
		className="lang-box" >
			<img src={lang.image}
			alt="" className="image"
			/>
			<p>{lang.title}</p>
		</div>
	)
}

export default LangComponent;