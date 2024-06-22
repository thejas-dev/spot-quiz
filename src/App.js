import logo from './logo.svg';
import './App.css';
import Button 
from './components/Button';
import LangComponent
from './components/LangComponent';
import QuizComponent
from './components/QuizComponent';
import {useState}
from 'react'

function App() {
  const [difficultyLevel,
    setDifficultyLevel] = 
  useState('Basic');
  const [loading,setLoading] =
  useState(false);
  const [allQuiz,setAllQuiz] = 
  useState([]);

  const diffLevel = 
  ['Basic','Intermediate','Advanced'];

  const languages = [
  {
    'title':"HTML",
    'image':"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/2048px-HTML5_Badge.svg.png"
  },
  {
    'title':"CSS",
    'image':"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png"
  },
  {
    'title':"Javascript",
    'image':"https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png"
  },
  {
    'title':"React",
    'image':"https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png"
  },
  {
    'title':"Nextjs",
    'image':"https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png"
  },
  ]

  const loadQuiz = async(language) => {
    setLoading(true);
    const data = {
      difficultyLevel,
      language
    }
    const options = {
      method:'POST',
      headers:{
        'Content-Type':
        'application/json'
      },
      body:JSON.stringify(data)
    }
    fetch("http://localhost:3333",
      options)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      setAllQuiz(res.result.questions)
      setLoading(false);
    })
  }


  return (
    <main style={{
      height:"100vh",
      width:"100%",
      backgroundColor:"#1f1f1f"
    }}>
    {
      loading &&
      <div style={{
        position:"fixed",
        top:0,
        left:0,
        height:"100vh",
        width:'100%',
        zIndex:50,
        backgroundColor:'rgba(0,0,0,0.7)',
        display:"grid",
        placeItems:"center"
      }} >
        <div className="loader">
        </div>
      </div>
    }
    {
      allQuiz.length > 0 ?
      <QuizComponent allQuiz={allQuiz}
      />
      :
      <>
        <h1 className="title" >
          On-Spot Quiz
        </h1>
        <p className="description" >
          Select the difficulty level and the programming language to start
        </p>
        <div className="diff-level-container">
          {
            diffLevel.map((diff,i)=>(
              <Button diff={diff}
              key={i} setDifficultyLevel={setDifficultyLevel}
              difficultyLevel={difficultyLevel}
              />
            ))
          }
        </div>

        <div className="lang-container">
          {
            languages.map((lang,j)=>(
              <LangComponent lang={lang} 
              key={j} 
              loadQuiz={loadQuiz} 
              />
            ))
          }
        </div>
      </>
    }

    

      
    </main>
  );
}

export default App;
