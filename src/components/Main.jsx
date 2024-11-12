import React from 'react'
import { MoreHorizontal, UserPlus } from 'react-feather'

const Main = () => {
  return (
    <div className='flex flex-col bg-slate-900 w-full'>
        <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
          <h2 className='text-lg'>My My Trello Board</h2>
          <div className='flex items-center justify-center'>
            <button className='bg-gray-200 h-8 px-2 py-1 mr-2  rounded flex justify-center'>
              <UserPlus size={16} className='mr-2'></UserPlus>
              Share</button>
            <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'><MoreHorizontal size={16}></MoreHorizontal></button>
          </div>
        </div>
        <div className="flex flex-col w-full flex-grow relative">

          <div className="absolute mb-1 pb-2 left-0 right-0 bottom-0 top-0 p-3 flex overfloow-x-sroll overflow-y-hidden">

          <div className="mr-3 w-60 h-fit rounded-md p-2 flex-shrink-0">
            <div className="list-body">
              <div className='flex justify-between p-1 bg-black'>
                <span>To do</span>
                <button><MoreHorizontal className='hover:bg-grey-500 p-1 rounded-sm' size={16}></MoreHorizontal></button>
              </div>

              <div className="item">
            <span>Project Description</span>
            <span></span>
          </div>
            </div>
          </div>

         


          
          
          

          </div>

        </div>

    </div>
  )
}

export default Main
