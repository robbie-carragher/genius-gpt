// // 

// 'use client';

// import { BsMoonFill, BsSunFill } from 'react-icons/bs';
// import { useState } from 'react';

// const themes = {
//   winter: 'winter',
//   dracula: 'dracula',
//   night: 'night',
// };

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(themes.winter);

//   const toggleTheme = () => {
//     let newTheme;
//     if (theme === themes.winter) {
//       newTheme = themes.dracula;
//     } else if (theme === themes.dracula) {
//       newTheme = themes.night;
//     } else {
//       newTheme = themes.winter;
//     }
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setTheme(newTheme);
//   };

//   return (
//     <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
//       {theme === 'winter' ? (
//         <BsMoonFill className='h-4 w-4 ' />
//       ) : theme === 'dracula' ? (
//         <BsSunFill className='h-4 w-4' />
//       ) : (
//         <BsMoonFill className='h-4 w-4 ' />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;

'use client';

import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  winter: 'winter',
  night: 'night',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.winter);

  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.night : themes.winter;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
      {theme === 'winter' ? (
        <BsMoonFill className='h-4 w-4 ' />
      ) : (
        <BsSunFill className='h-4 w-4' />
      )}
    </button>
  );
};

export default ThemeToggle;
