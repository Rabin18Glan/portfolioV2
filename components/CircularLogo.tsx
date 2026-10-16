import Image from "next/image";

interface CircularLogoProps {
  className?: string;
  logo: string;
}

export default function CircularLogo({ className = "", logo }: CircularLogoProps) {
  const isDevicon = logo.startsWith("devicon-") || logo.includes("devicon");
  const logoName = logo
    .replace(/^devicon-/, "")
    .replace(/-(plain|original|wordmark)/g, "")
    .replace(/.*\/|\.[^.]+$/g, "") || "tech";

  return (
    <div
      className={`relative rounded-full flex items-center justify-center h-14 w-14 p-2 bg-white dark:bg-dark-card shadow-md transition-transform duration-200 hover:scale-110 ${className}`}
    >
      {isDevicon && <i className={`${logo} text-2xl leading-none`} title={`${logoName} icon`}></i>}
      {!isDevicon && (
        <Image
          className="object-contain w-full h-full drop-shadow-sm p-1"
          src={logo}
          alt={`${logoName} logo - skill of Rabin Glan`}
          fill
          sizes="56px"
          unoptimized={false}
        />
      )}
    </div>
  );
}
