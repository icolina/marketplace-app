import { Link } from 'react-router-dom';

const ButtonLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
