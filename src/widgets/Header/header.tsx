import { Col } from "antd";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Col span={24} style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <NavLink to={"/"}>Главная</NavLink>
      <NavLink to={"/applications"}>Заявки</NavLink>
    </Col>
  );
};

export default Header;
