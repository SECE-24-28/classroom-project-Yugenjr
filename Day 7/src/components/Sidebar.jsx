const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 bg-white/30 backdrop-blur-xl shadow-xl h-screen p-6 border-r border-white/40">
      <ul className="space-y-6 text-lg font-semibold text-white">
        <li className="hover:text-red-300 cursor-pointer">My Recharges</li>
        <li className="hover:text-red-300 cursor-pointer">Payment Methods</li>
        <li className="hover:text-red-300 cursor-pointer">OTT Bundles</li>
        <li className="hover:text-red-300 cursor-pointer">Customer Support</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
