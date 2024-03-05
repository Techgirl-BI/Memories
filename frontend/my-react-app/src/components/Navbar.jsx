import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-800 shadow-lg">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex-shrink-0">
           <h1 className='text-white text-3xl mx-96'> Welcome to Memories App</h1>
          </div>
         
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
