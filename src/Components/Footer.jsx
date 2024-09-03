
export const Footer = () => {

  return (
    <>
       
    <footer className="bg-zinc-900 text-white py-4 text-center ">
      <div className="container mx-auto px-4">
        <p className="text-sm md:text-base lg:text-lg">
          &copy; {new Date().getFullYear()} Cheatsheet. All rights reserved.
        </p>
      </div>
    </footer>
    
    </>
  );
};
