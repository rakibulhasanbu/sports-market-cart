import { ImStatsDots } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useAppSelector } from "../../redux/hook";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { UserRole } from "../../types/common";
import { GiHistogram } from "react-icons/gi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const adminSideLinks = (user?.role === UserRole.ADMIN) ? [
    {
      path: "/sellers-list",
      Icon: HiOutlineUserGroup,
      label: "Sellers List",
      relativePath: "",
    },
    {
      path: "/managers-list",
      Icon: HiOutlineUsers,
      label: "Managers List",
      relativePath: "",
    },
  ] : [];

  const managerSideLinks = (user?.role === UserRole.ADMIN || user?.role === UserRole.MANAGER) ? [
    {
      path: "/add-product",
      Icon: MdOutlineAddShoppingCart,
      label: "Add Product",
      relativePath: "edit-product",
    },
  ] : [];

  const sidebarLinks = [
    {
      item: (user?.role === UserRole.ADMIN) ? "System Users" : "",
      navs: [
        ...adminSideLinks
      ],
    },
    {
      item: "Products",
      navs: [
        {
          label: "Manage Products",
          Icon: TbBrandProducthunt,
          path: "/",
          relativePath: "",
        },
        ...managerSideLinks
      ],
    },
    {
      item: "Sales",
      navs: [
        {
          label: "User Sales History",
          path: `/user-sales-history/${user?.userId}`,
          relativePath: "",
          Icon: GiHistogram,
        },
        {
          label: "Sales History",
          path: "/sales-history",
          relativePath: "",
          Icon: ImStatsDots,
        },
      ],
    },
  ];

  return (
    <div className="lg:border-r border-[#DDDDDD] lg:pl-5 2xl:pl-7 space-y-2 2xl:space-y-5">
      {sidebarLinks.map((singleItem) => (
        <div key={singleItem?.item} className="">
          <p className="text-textDark pb-2 2xl:pb-3">{singleItem?.item}</p>
          <div className="space-y-0.5 2xl:space-y-1">
            {singleItem.navs.map((nav) => (
              <div key={nav.label}>
                <Link
                  to={nav.path}
                  className={`relative flex items-center gap-2 2xl:gap-3 pl-2 lg:pl-4 hover:bg-textDark hover:rounded-[10px]  hover:text-white hover:font-semibold group py-1.5 2xl:py-2 ${pathname === nav.path ||
                    pathname === nav.relativePath
                    ? "text-white font-semibold bg-textDark rounded-[10px]"
                    : "text-textSecondary"
                    }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full group-hover:bg-[#494949] p-1 ${pathname === nav.path ||
                      pathname === nav.relativePath
                      ? "bg-[#494949]"
                      : "bg-[#F5F5F6]"
                      }`}
                  >
                    <nav.Icon className="text-xl " />
                  </div>
                  <p className="">{nav.label}</p>
                  <div
                    className={`group-hover:bg-[#EC9414] absolute h-4 w-1 right-0 top-[35%] rounded-l ${pathname === nav.path ||
                      pathname === nav.relativePath
                      ? "bg-[#EC9414]"
                      : ""
                      }`}
                  ></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
