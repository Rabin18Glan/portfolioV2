import Image from "next/image";

interface CircularLogoProps {
  className?: string;
  logo: string;
}

export default function CircularLogo({ className = "", logo }: CircularLogoProps) {
  const isDevicon = logo.startsWith("devicon-") || logo.includes("devicon");

  return (
    <div
      className={`relative rounded-full flex items-center justify-center h-14 w-14 p-2 bg-white dark:bg-dark-card shadow-md transition-transform duration-200 hover:scale-110 ${className}`}
    >
      {isDevicon && <i className={`${logo} text-2xl leading-none`}></i>}
      {!isDevicon && (
        <Image
          className="object-contain w-full h-full drop-shadow-sm p-1"
          src={logo}
          alt="skill-logo"
          fill
          sizes="56px"
          unoptimized={false}
        />
      )}
    </div>
  );
}
