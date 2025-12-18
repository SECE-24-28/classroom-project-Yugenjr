const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-black px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide">RechargeX</h1>
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-yellow-300 transition">Prepaid</li>
        <li className="cursor-pointer hover:text-yellow-300 transition">Postpaid</li>
        <li className="cursor-pointer hover:text-yellow-300 transition">Offers</li>
        <li className="cursor-pointer hover:text-yellow-300 transition">Help</li>
      </ul>
    </nav>
  );
};

export default Navbar;
