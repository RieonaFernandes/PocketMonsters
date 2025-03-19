/* eslint-disable indent */
export default function SizeIcon({ size, category }) {
  const iconClass =
    size === "small"
      ? "h-2 w-2 sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
      : size === "medium"
      ? "h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11"
      : "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14";

  const getIconUrl = () => {
    if (category === "Weight") {
      switch (size) {
        case "small":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/poke-ball.png?raw=true";
        case "medium":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/great-ball.png?raw=true";
        case "large":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/ultra-ball.png?raw=true";
        default:
          return "";
      }
    }

    if (category === "Height") {
      switch (size) {
        case "small":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/quick-ball.png?raw=true";
        case "medium":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/timer-ball.png?raw=true";
        case "large":
          return "https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/net-ball.png?raw=true";
        default:
          return "";
      }
    }

    return "";
  };

  return (
    <img
      src={getIconUrl()}
      alt={`${size} ${category} icon`}
      className={
        "object-contain transition-transform hover:scale-110" + iconClass
      }
    />
  );
}
