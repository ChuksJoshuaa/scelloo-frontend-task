export const UniqueID = () => Math.floor(Math.random() * 1000000);

export const PaymentStatusChangeColor = (status) => {
  let color = "status-red";

  if (status === "Paid") {
    color = "status-green";
  }

  if (status === "Unpaid") {
    color = "status-yellow";
  }

  return color;
};

export const UserStatusColor = (status) => {
  let color = "user-status-blue";

  if (status === "Inactive") {
    color = "user-status-purple";
  }

  return color;
};

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

