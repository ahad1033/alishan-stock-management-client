import { useThemeContext } from "../theme/ThemeProvider";

const CustomHeader = ({ title, subtitle, actions }) => {
  const { primaryColor } = useThemeContext();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          {title}
        </h1>
        <p className="text-muted-foreground mt-1 ps-1">{subtitle}</p>
      </div>
      {actions && actions}
    </div>
  );
};

export default CustomHeader;
