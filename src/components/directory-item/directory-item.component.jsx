import {
  BackgroudImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";
const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigatHeandler = () => {
    console.log("frononclik", route, imageUrl);
    navigate(route);
  };
  return (
    <DirectoryItemContainer onClick={onNavigatHeandler}>
      <BackgroudImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
