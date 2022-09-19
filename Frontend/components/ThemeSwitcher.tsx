import { useTheme } from "next-themes";

const INPUT_THEME_ID = "theme-switcher";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center mr-2">
      <label
        htmlFor={INPUT_THEME_ID}
        className="relative w-8 h-4 p-1 bg-black flex justify-between rounded-2xl scale-[1.5]"
      >
        <input
          type="checkbox"
          className="hidden peer"
          checked={isDark}
          id={INPUT_THEME_ID}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />

        <i className="fas fa-sun text-[9px] text-yellow-300" />
        <i className="fas fa-moon text-[9px] text-pink-300" />
        <span className="absolute w-3 h-3 bg-white rounded-full peer-checked:translate-x-[16px] top-[2px] left-[2px] transition-transform duration-200 ease-linear" />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
