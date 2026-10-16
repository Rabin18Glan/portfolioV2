interface FontStyleOptions {
  title: string;
  fontSize?: string;
}

function separateLetters(str: string) {
  if (str.length < 2) {
    return [str, "", ""];
  }
  const first = str.charAt(0);
  const middle = str.slice(1, -1);
  const last = str.charAt(str.length - 1);
  return [first, middle, last];
}

function Stroked({ title, fontSize }: FontStyleOptions) {
  return (
    <span
      style={{
        fontSize: fontSize,
        WebkitTextStroke: "1px var(--primary-600)",
      }}
      className="font-bold text-transparent"
    >
      {title}
    </span>
  );
}

function Title({ title, fontSize = "50px" }: FontStyleOptions) {
  const [first, middle, last] = separateLetters(title);
  const firstFontSize = fontSize ? fontSize : "40px";

  return (
    <span>
      <span
        style={{
          fontSize: firstFontSize,
          fontWeight: "bold",
        }}
        className="text-primary-600"
      >
        {first}
      </span>
      <Stroked fontSize={fontSize} title={middle} />
      <span
        style={{
          fontSize: fontSize,
          fontWeight: "bold",
        }}
        className="text-primary-600"
      >
        {last}
      </span>
    </span>
  );
}

export default Title;
