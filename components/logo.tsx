export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <img
        src="/logo2.png"
        alt="Horizonten gemenskap"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="text-white text-sm font-medium whitespace-nowrap">Horizonten gemenskap</span>
    </div>
  );
};
