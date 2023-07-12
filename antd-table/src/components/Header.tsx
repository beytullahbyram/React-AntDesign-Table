import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="headerLink">
        <Link className="headerlinks-item" to={"/"}>
          Home
        </Link>
        <Link className="headerlinks-item" to={"/TableOne"}>
          Table One
        </Link>
        <Link className="headerlinks-item" to={"/TableTwo"}>
          Table Two
        </Link>
        <Link className="headerlinks-item" to={"/TableCRUD"}>
          Table CRUD
        </Link>
        <Link className="headerlinks-item" to={"/Form"}>
          Form
        </Link>
      </header>
    </>
  );
};
