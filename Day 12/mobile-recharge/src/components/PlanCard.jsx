const PlanCard = ({ plan }) => {
  return (
    <div className="bg-white/20 backdrop-blur p-5 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{plan.title}</h3>
      <p className="text-gray-200">{plan.validity}</p>
      <p className="text-2xl font-bold text-yellow-300">{plan.price}</p>
      <button className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white">
        Buy Now
      </button>
    </div>
  );
};

export default PlanCard;
