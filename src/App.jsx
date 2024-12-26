import { useState } from 'react'
import './App.css'
import VideoUpload from './components/VideoUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col items-center space-y-5 justify-center py-9">
      <h1 className="text-3xl font-bold text-black-900 dark:text-gray-100 ">
        Welcome to Video Streaming Application
        </h1>
        <VideoUpload/>
    </div>
    </>
  )
}

export default App
