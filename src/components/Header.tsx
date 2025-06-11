import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"

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
        <select name="pageSelect" onChange={e => handleChange(e.target.value)} value={selectValue}>
          <option value="" disabled>ページを選択</option>
          <option value="/subspecies">亜関数</option>
          <option value="/oldSubspecies">亞関数</option>
          <option value="/buchholz">ブーフホルツのψ</option>
          <option value="/extendedWorm">拡張ベクレミシェフの虫</option>
          <option value="/gps">汎貫通数列</option>
        </select>
      </div>
    </header>
  );
};

export default CreateHeader