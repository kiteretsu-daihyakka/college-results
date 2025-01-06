// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
import Link from '@mui/material/Link';

// import ListItemButton from '@mui/material/ListItemButton';
// import Collapse from '@mui/material/Collapse';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import {
//   Link as RouterLink,
//   Route,
//   Routes,
//   MemoryRouter,
//   useLocation,
// } from 'react-router-dom';

// const breadcrumbNameMap = {
//     '/':'Home',
//     '/subjects': 'Subjects',
//     '/results': 'Results',
//     '/student/semester/:semester': 'Students',
// };

// // function ListItemLink(props) {
// //   const { to, open, ...other } = props;
// //   const primary = breadcrumbNameMap[to];

// //   return (
// //     <li>
// //       <ListItemButton component={RouterLink} to={to} {...other}>
// //         <ListItemText primary={primary} />
// //         {icon}
// //       </ListItemButton>
// //     </li>
// //   );
// // }

// // ListItemLink.propTypes = {
// //   open: PropTypes.bool,
// //   to: PropTypes.string.isRequired,
// // };

// function LinkRouter(props) {
//   return <Link {...props} component={RouterLink} />;
// }

// export default function BreadcrumbsSeperator() {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <Breadcrumbs aria-label="breadcrumb">
//       <LinkRouter underline="hover" color="inherit" to="/">
//         Home
//       </LinkRouter>
//       {pathnames.map((value, index) => {
//         const last = index === pathnames.length - 1;
//         const to = `/${pathnames.slice(0, index + 1).join('/')}`;

//         return last ? (
//           <Typography color="text.primary" key={to}>
//             {breadcrumbNameMap[to]}
//           </Typography>
//         ) : (
//           <LinkRouter underline="hover" color="inherit" to={to} key={to}>
//             {breadcrumbNameMap[to]}
//           </LinkRouter>
//         );
//       })}
//     </Breadcrumbs>
//   );
// }

// // export default function RouterBreadcrumbs() {
// //   const [open, setOpen] = React.useState(true);

// //   const handleClick = () => {
// //     setOpen((prevOpen) => !prevOpen);
// //   };

// //   return (
// //     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
// //         {/* <Routes>
// //           <Route path="*" element={<Page />} />
// //         </Routes> */}
// //     </MemoryRouter>
// //   );
// // }


// import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbsSeperator (props) {
    // const location = useLocation();
    // const pathnames = location.pathname.split("/").filter((x) => x);
    // let breadcrumbPath = "";

    return (
        // <div className="breadcrumbs">
        //     <Link to="/">Home</Link>
        //     {pathnames.map((name, index) => {
        //         breadcrumbPath += `/${name}`;
        //         const isLast = index === pathnames.length - 1;
        //         console.log(pathnames, breadcrumbPath, isLast);

        //         return isLast ? (
        //             <span key={breadcrumbPath}> &gt; {name}</span>
        //         ) : (
        //             <span key={breadcrumbPath}>
        //                 {" "}
        //                 &gt; <Link to={breadcrumbPath}>{name}</Link>
        //             </span>
        //         );
        //     })}
        // </div>
        <div className="m-3">
            <nav style={{"--bs-breadcrumb-divider": "'>'"}}  aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a className='astyle' href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{props.path}</li>
                </ol>
            </nav>
        </div>
    );
};
