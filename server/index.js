const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyDHjs5gftIATU1jymJv_vm3JDNALHxGDYo');

async function askGPT(prompt){
	const model = genAI.getGenerativeModel({
		model:'gemini-pro'
	});
	const result = await model.generateContent(prompt);
	const res = await result.response;
	const resText = await res.text();
	const resJSON = await JSON.parse(resText);
	console.log(resText)
	return resJSON;
}

// askGPT('Generate five basic JavaScript quizzes. Each quiz should contain a question, multiple choice options, and the correct answer. The questions should cover fundamental concepts in JavaScript programming. Please format the quizzes in JSON as follows and dont provide any backticks: {"questions":[{"id":0,"question":"","options":[],	"answer":""},...]}');

app.post('/',async(req,res)=>{
	const {difficultyLevel,language} = req.body;
	const result = await askGPT(`Generate five ${difficultyLevel} ${language} quizzes. Each quiz should contain a question, multiple choice options, and the correct answer. The questions should cover fundamental concepts in JavaScript programming. Please format the quizzes in JSON as follows and dont provide any backticks as your output will be parsed using JSON.parse: {"questions":[{"id":0,"question":"","options":[],	"answer":""},...]}`)
	console.log(result)
	if(result){
		return res.json({status:true,result})
	}
	return res.json({status:false,msg:"Something went wrong!"});
})


app.get('/',(req,res)=>{
	res.send("Hello World")
});

const PORT = 3333

app.listen(PORT,()=>{
	console.log("Server started at port 3333")
})