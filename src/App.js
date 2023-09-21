import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  console.log('props', props);
  return (
    <header className="App-header">
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'./road/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  // const _mode = useState('WELCOME');  /* useState('WELCOME')이라는 _mode가있음 */
  // const mode = _mode[0];  /* _mode[0]은 'WELCOME'이라는 문자열 이걸 mode라고 정함 */
  // const setmode = _mode[1];   /* _mode[1]은 위에 함수안에 들어가는 문자열을 갖고있는 f()라는 함수 이걸 setmode라고함 */
  const [mode, setMode] = useState('WELCOME');  /* 위에 3줄을 1줄로 줄이면 이렇게됨 */
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }
  else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
