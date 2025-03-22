import { useError } from "../hooks/UseError";
import ErrorBoundary from "./ErrorBoundary";
import ErrorFallback from "./ErrorFallback";

const pokeball = import.meta.env.VITE_DREAM_WORLD_POKE_BALL_IMG;
const great_ball = import.meta.env.VITE_DREAM_WORLD_GREAT_BALL_IMG;
const ultra_ball = import.meta.env.VITE_DREAM_WORLD_ULTRA_BALL_IMG;
const quick_ball = import.meta.env.VITE_DREAM_WORLD_QUICK_BALL_IMG;
const net_ball = import.meta.env.VITE_DREAM_WORLD_NET_BALL_IMG;
const timer_ball = import.meta.env.VITE_DREAM_WORLD_TIMER_BALL_IMG;

/* eslint-disable indent */
export default function SizeIcon({ size, category }) {
  const { handleError } = useError();
  let iconClass, getIconUrl;
  try {
    iconClass =
      size === "small"
        ? "h-2 w-2 sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
        : size === "medium"
        ? "h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11"
        : "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14";

    getIconUrl = () => {
      if (category === "Weight") {
        switch (size) {
          case "small":
            return `${pokeball}`;
          case "medium":
            return `${great_ball}`;
          case "large":
            return `${ultra_ball}`;
          default:
            return "";
        }
      }

      if (category === "Height") {
        switch (size) {
          case "small":
            return `${quick_ball}`;
          case "medium":
            return `${net_ball}`;
          case "large":
            return `${timer_ball}`;
          default:
            return "";
        }
      }

      return "";
    };
  } catch (error) {
    handleError(new Error("Failed to load Filter."));
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <img
        src={getIconUrl()}
        alt={`${size} ${category} icon`}
        className={
          "object-contain transition-transform hover:scale-110" + iconClass
        }
      />
    </ErrorBoundary>
  );
}
