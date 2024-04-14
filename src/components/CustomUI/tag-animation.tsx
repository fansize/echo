type Props = {
  showAnimation: boolean;
};

export default function TagAnimate({ showAnimation }: Props) {
  return (
    <div
      className={`flex rounded-full h-10 items-center justify-center bg-white ${
        showAnimation ? "animate-progress-extend" : ""
      }`}
    ></div>
  );
}
