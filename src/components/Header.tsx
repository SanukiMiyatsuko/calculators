import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"
import { routes } from "../pages/routes";

const CreateHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const selectValue = currentPath === "/" ? "" : currentPath;

  const handleChange = (e: string) => {
    if (e)
      navigate(e);
  };

  return (
    <header>
      <div className="home-link">
        <Link to="/" className="home-button">Calculators</Link>
      </div>
      <div className="select">
        <select
          name="pageSelect"
          onChange={e => handleChange(e.target.value)}
          value={selectValue}
        >
          <option value="" disabled>ページを選択</option>
          {routes.map((route, i) => (
            <option
              key={i}
              value={route.path}
            >
              {route.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default CreateHeader