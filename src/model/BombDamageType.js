import BombType from "./BombType";

const BombDamageByType = (type) => {
  switch (type) {
    case BombType.BOMB_SMALL:
      return 10;
    case BombType.BOMB_MIDDLE:
      return 20;
    case BombType.BOMB_LARGE:
      return 30;
    default:
      return 0;
  }
}

export default BombDamageByType;
