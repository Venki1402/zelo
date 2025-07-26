import { GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto border-t px-4">
      <div className="flex justify-between py-8">
        <p className="text-primary tracking-tight">
          Designed and Developed by{" "}
          <a
            href="https://redhawkdev.me"
            className="font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Venki
          </a>
        </p>
        <a
          href="https://github.com/Venki1402/kage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
