
import {useState,
useEffect} from 'react';

function QuizComponent({
	allQuiz
}){
	const [currQuiz,setCurrQuiz]
	= useState({});
	const [quizIdx,setQuizIdx]
	= useState(0);
	const [answers,setAnswers]
	= useState({});
	const [completed,setCompleted]
	= useState(false);
	const [correctAns,setCorrectAns]
	= useState([]);

	useEffect(()=>{
		setCurrQuiz(
			allQuiz[quizIdx]
		)
	},[quizIdx]);

	console.log(currQuiz,answers,correctAns);

	function checkCorrect(){
		const crt = correctAns.filter((ans)=>ans === true)
		return crt.length
	}

	const reloadPage = () => {
		window.location.reload()
	}

	return(
		<main>
			{
				completed &&
				<div style={{
					height:"100vh",
					width:"100%",
					position:"fixed",
					top:0,
					left:0,
					zIndex:50,
					backgroundColor:"rgba(0,0,0,0.8)",
					display:"grid",
					placeItems:"center"
				}}>
					<div style={{
						display:'flex',
						alignItems:"center",
						flexDirection:"column",
						color:"white",
						padding:0,
						gap:'10px'
					}}>
						<h1 style={{margin:0}} >Quiz Completed</h1>
						<h3>Your marks are {checkCorrect()}/5</h3>
						<button onClick={()=>{
							reloadPage()
						}} 
						style={{
							padding:"10px 30px",
							fontSize:"13px",
							cursor:'pointer'
						}} >Restart</button>
					</div>

				</div>
			}
			<h1 className="question">
			{quizIdx + 1})
			{' ' + currQuiz?.question}
			</h1>
			<div className="opt-container">
				{
					currQuiz &&
					currQuiz?.options?.map((opt,j)=>(
						<div onClick={()=>{
							if(quizIdx < 4){
								setQuizIdx(quizIdx + 1);
								const tempAns = {
									...answers
								}
								tempAns[quizIdx] = opt;
								setAnswers(tempAns);
								const isTrue = opt === currQuiz.answer;
								setCorrectAns([...correctAns,isTrue]);
							}else{
								const tempAns = {
									...answers
								}
								tempAns[quizIdx] = opt;
								setAnswers(tempAns);
								setCompleted(true);
								const isTrue = opt === currQuiz.answer;
								setCorrectAns([...correctAns,isTrue]);
							}
						}} 
						className="option">
							<div className="round-button"/>
							<p>{opt}</p>
						</div>
					))
				}
			</div>
		</main>
	)
}

export default QuizComponent;