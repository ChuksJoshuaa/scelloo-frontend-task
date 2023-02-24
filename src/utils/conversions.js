export const UniqueID = () => Math.floor(Math.random() * 1000000);

export const sortData = [
  {
    id: UniqueID,
    name: "Default",
  },
  {
    id: UniqueID,
    name: "First Name",
  },
  {
    id: UniqueID,
    name: "Last Name",
  },
  {
    id: UniqueID,
    name: "Email",
  },
  {
    id: UniqueID,
    name: "Last Login",
  },
];

export const infoData = [
  {
    id: UniqueID,
    name: "All",
  },
  {
    id: UniqueID,
    name: "Active",
  },
  {
    id: UniqueID,
    name: "Inactive",
  },
];


export const editData = [
  {
    id: UniqueID,
    name: "Edit",
    color: "text-[#6E6893]",
  },
  {
    id: UniqueID,
    name: "View Profile",
    color: "text-[#6E6893]",
  },
  {
    id: UniqueID,
    name: "Activate User",
    color: "text-green-800",
  },
  {
    id: UniqueID,
    name: "Delete",
    color: "text-red-900",
  },
];
