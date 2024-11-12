import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import TaskCard from './components/TaskCard'
import KanbanBoard from './components/KanbanBoard'


function App2() {

  return (
    <>
     {/* <Header></Header> */}
    {/* <div className='content flex'>
      <Sidebar></Sidebar>
      <Main>
      </Main>
      </div> */}
      {/* <TaskCard/> */}
      <KanbanBoard/>

    </>
  )
}

export default App2
